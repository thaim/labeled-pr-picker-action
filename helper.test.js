const sut = require('./helper.js');

describe('match_branch', () => {
  it('match simple map', async () => {
    const prdata = {};
    const labels = {'hotfix': 'production'};
    const actual = await sut.match_branch(prdata, labels);

    expect(actual.length).toEqual(1);
    expect(actual).toEqual(expect.arrayContaining(['production']));
  });

  it('match single branch from multiple map', async () => {
    const prdata = {};
    const labels = {'hotfix': 'production', 'release': 'staging'};
    const actual = await sut.match_branch(prdata, labels);

    expect(actual.length).toEqual(1);
    expect(actual).toEqual(expect.arrayContaining(['production']));
  });
});

describe('parse_labels', () => {
  it('', async () => {
    
  });
});

describe('label_to_branch', () => {
  it('match to single map', async () => {
    const attached_labels = ['hotfix']
    const labelmap = 'hotfix:production\nbugfix:productione\n'
    const actual = await sut.label_to_branch(attached_labels, labelmap);

    expect(actual.length).toEqual(1);
    expect(actual).toEqual(expect.arrayContaining(['production']));
  });
});
