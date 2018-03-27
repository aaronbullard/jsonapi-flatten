import Response from '../src/Response.js'
import articles from './examples/articles.json'
import authors from './examples/authors.json'
import recursive from './examples/recursive-articles.json'
import products from './examples/products.json'

describe('Response', () => {

  function assertHasProperties(obj, props){
    props.forEach(function(prop){
      expect(obj.hasOwnProperty(prop)).toBeTruthy();
    })
  }

  it('returns a flatten response', () => {
    let jsonapi = new Response(articles);
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

    let jsonapi = new Response(articles);
    let flatten = jsonapi.flatten();

    assertHasProperties(flatten[0], ['_id', '_type', 'title', 'author', 'comments']);
    assertHasProperties(flatten[0].author, ['_id', '_type'])
  })

  it('prevents recursion', () => {
    let jsonapi = new Response(recursive);
    let flatten = jsonapi.flatten();

    assertHasProperties(flatten, ['_id', '_type', 'title', 'author']);
    assertHasProperties(flatten.author, ['_id', '_type', 'first-name', 'last-name', 'twitter', 'articles']);
    assertHasProperties(flatten.author.articles[0], ['_id', '_type', 'title', 'author'])
    assertHasProperties(flatten.author.articles[0].author, ['_id', '_type'])
  })

  it('handles a null relationship', () => {
    let jsonapi = new Response(products);
    let flatten = jsonapi.flatten();

    expect(flatten[2].category).toEqual(null);
  })

})
