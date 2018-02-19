const {Included, ResourceObject} = require('../src/JsonApi.js');
const articles = require('./../tests/examples/articles.json');

describe('Included', () => {

  function assertHasProperties(obj, props){
    props.forEach(function(prop){
      expect(obj.hasOwnProperty(prop)).toBeTruthy();
    })
  }

  it('finds a ResourceObject', () => {
    let included = new Included(articles.included);

    expect(
      included.findResourceObject("comments", "12")
    ).toBeDefined();
  })

  it("returns null if it can't find the ResourceObject", () => {
    let included = new Included(articles.included);

    expect(
      included.findResourceObject("comments", "42")
    ).toEqual(null);
  })

  it("returns a ResourceObject to a parent only once - prevents infinite loops", () => {
    let included = new Included(articles.included);
    let parent = new ResourceObject(articles.data[0]);

    expect(
      included.findResourceObject("comments", "12", parent)
    ).not.toBe(null);

    expect(
      included.findResourceObject("comments", "12", parent)
    ).toBe(null);
  })

})
