import ResourceObjectIdentifier from '../src/ResourceObjectIdentifier.js'

describe('ResourceObjectIdentifier', () => {

  it('gets type and id', () => {
    let resource = new ResourceObjectIdentifier({type: "comments", id: "12"});

    expect(resource.getType()).toEqual("comments")
    expect(resource.getId()).toEqual("12")
  })

})
