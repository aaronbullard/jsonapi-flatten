const ResourceObject = require('../src/ResourceObject.js');
const Included = require('../src/Included.js');
const articles = require('./../tests/examples/articles.json');

describe('ResourceObject', () => {

  function assertHasProperties(obj, props){
    props.forEach(function(prop){
      expect(obj.hasOwnProperty(prop)).toBeTruthy();
    })
  }

  it('returns a flatten object', () => {
    let resource = new ResourceObject(articles.data[0]);
    let included = new Included(articles.included);

    let flatten = resource.flatten(included);

    assertHasProperties(flatten, ['_id', '_type', 'title', 'author', 'comments']);
    assertHasProperties(flatten.author, ['_id', '_type', 'first-name', 'last-name', 'twitter']);
    assertHasProperties(flatten.comments[0], ['_id', '_type', 'body', 'author']);
    assertHasProperties(flatten.comments[1], ['_id', '_type', 'body', 'author']);
    assertHasProperties(flatten.comments[1].author, ['_id', '_type', 'first-name', 'last-name', 'twitter']);
  })

})
