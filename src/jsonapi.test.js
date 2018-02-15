const JsonAPI = require('./jsonapi.js');
const articles = require('./../tests/examples/articles.json');

describe('JsonAPI', () => {

    it('test it creates an object with attributes', () => {
        let object = {
            type: "articles",
            id: "1",
            attributes: {
                title: "JSON API paints my bikeshed!",
                body: "The shortest article. Ever.",
                created: "2015-05-22T14:56:29.000Z",
                updated: "2015-05-22T14:56:28.000Z"
            }
        }
        object = JsonAPI.flattenAttributes(object);

        ['id', 'title', 'body', 'created', 'updated'].forEach((prop) => {
            expect(object.hasOwnProperty(prop)).toBeTruthy();
        })
        expect(object.hasOwnProperty('type')).toBeFalsy();
    })

    it('can find an included entity', () => {
        let included = JsonAPI.findIncluded(articles.included, "comments", "12");

        expect(included.type).toEqual("comments");
        expect(included.id).toEqual("12");
    })

    it('can append included attributes to relationships', () => {
        // get a relationship object
        let relationships = articles.data[0].relationships;
        let includes = articles.included;

        hydrated_relationships = JsonAPI.appendAttributesToRelationships(relationships, includes);

        expect(hydrated_relationships.author.data.hasOwnProperty('attributes')).toBeTruthy();
        expect(hydrated_relationships.comments.data[0].hasOwnProperty('attributes')).toBeTruthy();
        expect(hydrated_relationships.comments.data[1].hasOwnProperty('attributes')).toBeTruthy();
    })

    it('can normalize an entity with includes', () => {
      let entity = articles.data[0];
      let includes = articles.included;
      let normalized = JsonAPI.normalize(entity, includes);

      ['id', 'title', 'author', 'comments'].forEach((prop) => {
          expect(normalized.hasOwnProperty(prop)).toBeTruthy();
      })
      expect(normalized.comments.length).toEqual(2);
    })
})
