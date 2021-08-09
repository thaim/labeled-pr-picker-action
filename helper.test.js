const sut = require('./helper.js');

describe('match_branch', () => {
  it('match simple map', async () => {
    const prdata = {'labels': ['hotfix']};
    const labels = ['hotfix:production'];
    const actual = await sut.match_branch(prdata, labels);

    expect(actual.length).toEqual(1);
    expect(actual).toEqual(expect.arrayContaining(['production']));
  });

  it('match single branch from multiple map', async () => {
    const prdata = {'labels': ['release']};
    const labels = ['hotfix:production','release:staging'];
    const actual = await sut.match_branch(prdata, labels);

    expect(actual.length).toEqual(1);
    expect(actual).toEqual(expect.arrayContaining(['staging']));
  });

  it('match nothing from mismatched label', async () => {
    const prdata = {'labels': ['release']};
    const labels = ['hotfix:production','doc:staging'];
    const actual = await sut.match_branch(prdata, labels);

    expect(actual.length).toEqual(0);
  });

  it('match nothing from empty attached label', async () => {
    const prdata = {};
    const labels = ['hotfix:production','doc:staging'];
    const actual = await sut.match_branch(prdata, labels);

    expect(actual.length).toEqual(0);
  });

  it('match multiple branches from single attached label', async () => {
    const prdata = {'labels': ['hotfix']};
    const labels = ['hotfix:production','hotfix:staging'];
    const actual = await sut.match_branch(prdata, labels);

    expect(actual.length).toEqual(2);
    expect(actual).toEqual(expect.arrayContaining(['production', 'staging']));
  });

  it('match multiple branches from multiple attached label', async () => {
    const prdata = {'labels': ['hotfix', 'release']};
    const labels = ['hotfix:production', 'release:production', 'release:staging'];
    const actual = await sut.match_branch(prdata, labels);

    expect(actual.length).toEqual(2);
    expect(actual).toEqual(expect.arrayContaining(['production', 'staging']));
  });
});

describe('parse_labels', () => {
  it('return single label with array', async () => {
    const prdata = {'labels': ['hotfix']};
    const actual = await sut.parse_labels(prdata);

    expect(actual.length).toEqual(1);
    expect(actual).toEqual(expect.arrayContaining(['hotfix']));
  });

  it('return empty array from no label data', async () => {
    const prdata = {};
    const actual = await sut.parse_labels(prdata);

    expect(actual.length).toEqual(0);
  });

  it('return multiple labels', async () => {
    const prdata = {'labels': ['docs', 'hotfix']};
    const actual = await sut.parse_labels(prdata);

    expect(actual.length).toEqual(2);
    expect(actual).toEqual(expect.arrayContaining(['docs', 'hotfix']));
  });
});

describe('label_to_branch', () => {
  it('match to single map', async () => {
    const attached_labels = ['hotfix']
    const labelmap = ['hotfix:production', 'bugfix:production']
    const actual = await sut.label_to_branch(attached_labels, labelmap);

    const actual_array = Array.from(actual)
    expect(actual_array.length).toEqual(1);
    expect(actual_array).toEqual(expect.arrayContaining(['production']));
  });
});
