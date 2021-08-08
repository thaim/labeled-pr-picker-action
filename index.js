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

    const labels = core.getMultilineInput('label-map');
    console.log(`label-map: ${label-map}`);
    const pr = await octokit.request(`GET /repos/${context.payload.head_commit.url}/pulls`, {
      owner: context.payload.repository.html_url.split('/')[0],
      repo: context.payload.repository.html_url.split('/')[1],
      commit_sha: context.sha,
      mediaType: {
        previews: [
          'groot'
        ]
      }
    })

    const branches = helper.match_branch(pr, labels);

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
