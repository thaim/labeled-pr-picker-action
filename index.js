const helper = require('./helper.js');

const core = require('@actions/core');
const github = require('@actions/github');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const context = github.context;
    const octokit = github.getOctokit(core.getInput('token'));

    console.log(context);
    if (context.payload.commits.length == 1) {
      console.info('ignore push without merge PR');
      process.exit(0);
    }

    const labelmaps = core.getMultilineInput('label-map');
    console.log(`label-map: ${labelmaps}`);
    console.log(`request URL: /repos/${context.payload.repository.full_name}/commits/${context.sha}/pulls`)
    const resp = JSON.parse(await octokit.request(`GET /repos/${context.payload.repository.full_name}/commits/${context.sha}/pulls`, {
      owner: context.payload.repository.full_name.split('/')[0],
      repo: context.payload.repository.full_name.split('/')[1],
      commit_sha: context.sha,
      mediaType: {
        previews: [
          'groot'
        ]
      }
    }));
    console.log('GitHub API PR response: ' + resp);
    if (resp.status != 200) {
      console.error('error response from GitHub API: ' + JSON.stringify(resp));
      process.exit(1);
    }

    const branches = await helper.match_branch(resp.data[0], labelmaps);

    console.info(branches);
    branches.forEach(branch => {
      // const newPR = await octokit.pullRequests.create({
      //   owner: context.repo.owner,
      //   repo: context.repo.repo,
      //   base: branch,
      //   head: cherrypick,
      //   title: context.payload.pull_request.title,
      //   body: '',
      // });
      console.log(`create PR for ${branch}`);
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
