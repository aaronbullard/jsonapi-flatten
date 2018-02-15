const ResourceObject = require('../src/ResourceObject.js');
const Included = require('../src/Included.js');
const articles = require('./../tests/examples/articles.json');

describe('Included', () => {

  it('finds a ResourceObject', () => {
    let resource = new ResourceObject(articles.data[0]);
    let included = new Included(articles.included);

    expect(included.findResourceObject("comments", "12")).toBeDefined();
  })

})
