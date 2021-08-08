const helper = require('./helper.js');

const core = require('@actions/core');
const github = require('@actions/github');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const context = github.context;
    const octokit = github.getOctokit(core.getInput('token'));

    const labels = core.getMultilineInput('label-map');
    const pr = await octokit.rest.pulls.get({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: context.payload.pull_request.number
    });

    const branches = helper.match_branch(pr, labels);

    console.info(branches);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
