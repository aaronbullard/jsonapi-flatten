const Included = require('../src/Included.js');
const articles = require('./../tests/examples/articles.json');

describe('Included', () => {

  it('finds a ResourceObject', () => {
    let included = new Included(articles.included);

    expect(
      included.findResourceObject("comments", "12")
    ).toBeDefined();
  })

})
