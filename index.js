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
    const resp = await octokit.request(`GET /repos/${context.payload.repository.full_name}/commits/${context.sha}/pulls`, {
      owner: context.payload.repository.full_name.split('/')[0],
      repo: context.payload.repository.full_name.split('/')[1],
      commit_sha: context.sha,
      mediaType: {
        previews: [
          'groot'
        ]
      }
    });
    console.debug('GitHub API PR response: ' + JSON.stringify(resp));
    if (resp.status != 200) {
      console.error(`error response from GitHub API: ${resp.status}`);
      process.exit(1);
    }
    const pulls = resp.data[0]

    const branches = await helper.match_branch(pulls, labelmaps);

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
