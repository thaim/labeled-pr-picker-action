const core = require('@actions/core')

async function match_branch(prdata, labels) {
  attached_labels = await parse_labels(prdata);
  branches = label_to_branch(attached_labels, labels);

  return branches;
}

async function parse_labels(prdata) {
  console.info('prdata: ' + JSON.stringify(prdata));
  return ["hotfix"]
}

async function label_to_branch(attached_labels, labels) {
  console.info('labels: ' + JSON.stringify(labels));
  return ["production"];
}


module.exports = {
  parse_labels,
  match_branch,
  label_to_branch
}
