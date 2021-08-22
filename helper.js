async function match_branch(prdata, labels) {
  const attached_labels = await parse_labels(prdata);
  const branches = await label_to_branch(attached_labels, labels);

  return Array.from(branches);
}

async function parse_labels(prdata) {
  return prdata.labels.map((obj) => obj.name) || [];
}

async function label_to_branch(attached_labels, labelmaps) {
  const branches = new Set();

  const labelmap_format = new Map();
  labelmaps.forEach(labelmap => {
    const keyval = labelmap.split(':');
    if (keyval.length != 2) {
      console.warn('ignored unexpected label-map format: ' + labelmap);
      return;
    }

    if (labelmap_format.has(keyval[0])) {
      labelmap_format.get(keyval[0]).push(keyval[1]);
    } else {
      labelmap_format.set(keyval[0], [keyval[1]]);
    }
  });

  attached_labels.forEach(label => {
    const branch_list = labelmap_format.get(label);
    if (branch_list === undefined) {
      return;
    }

    branch_list.forEach(b => {
      branches.add(b);
    });
  });

  return branches;
}


module.exports = {
  parse_labels,
  match_branch,
  label_to_branch
}
