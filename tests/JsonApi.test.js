const JsonApi = require('../src/JsonApi.js');
const articles = require('./../tests/examples/articles.json');
const authors = require('./../tests/examples/authors.json');
const recursive = require('./../tests/examples/recursive-articles.json');

describe('JsonApi', () => {

  function assertHasProperties(obj, props){
    props.forEach(function(prop){
      expect(obj.hasOwnProperty(prop)).toBeTruthy();
    })
  }

  it('returns a flatten response', () => {
    let jsonapi = new JsonApi(articles);
    let flatten = jsonapi.flatten();

    assertHasProperties(flatten[0], ['_id', '_type', 'title', 'author', 'comments']);
    assertHasProperties(flatten[0].author, ['_id', '_type', 'first-name', 'last-name', 'twitter']);
    assertHasProperties(flatten[0].comments[0], ['_id', '_type', 'body', 'author']);
    assertHasProperties(flatten[0].comments[1], ['_id', '_type', 'body', 'author']);
    assertHasProperties(flatten[0].comments[1].author, ['_id', '_type', 'first-name', 'last-name', 'twitter']);
  })

  it('returns a flatten response with no included attributes', () => {
    delete articles.included;
    expect(articles.hasOwnProperty('included')).toBeFalsy();

    let jsonapi = new JsonApi(articles);
    let flatten = jsonapi.flatten();

    assertHasProperties(flatten[0], ['_id', '_type', 'title', 'author', 'comments']);
    assertHasProperties(flatten[0].author, ['_id', '_type'])
  })

  it('prevents recursion', () => {
    let jsonapi = new JsonApi(recursive);
    let flatten = jsonapi.flatten();

    assertHasProperties(flatten, ['_id', '_type', 'title', 'author']);
    assertHasProperties(flatten.author, ['_id', '_type', 'first-name', 'last-name', 'twitter', 'articles']);
    assertHasProperties(flatten.author.articles[0], ['_id', '_type', 'title', 'author'])
    assertHasProperties(flatten.author.articles[0].author, ['_id', '_type'])
  })

})
