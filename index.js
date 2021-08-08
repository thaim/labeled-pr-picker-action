const core = require('@actions/core');


// most @actions toolkit packages have async methods
async function run() {
  try {
    const labels = core.getMultilineInput('labelmap').join(',');
    core.info(`Labels: ${labels}`);

    core.info((new Date()).toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
