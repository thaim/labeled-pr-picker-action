const core = require('@actions/core')

module.exports.match_branch = async function (prdata, labels) {
  console.info('prdata: ' + JSON.stringify(${prdata}));
  console.info(`labels: ${labels}`);

  return ['production'];
}
