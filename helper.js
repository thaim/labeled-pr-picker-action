const core = require('@actions/core')

module.exports.match_branch = async function (prdata, labels) {
  core.info(prdata);
  core.info(labels);

  return ['production'];
}
