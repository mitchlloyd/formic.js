chai.should()

describe 'formic', ->
  it 'creates an object from a form', ->
    formEl = $("""
      <form>
        <input name='attribute-name' value='hi'></input>
      </form>
    """)

    obj = formic(formEl).serialize()
    obj.attribute_name.should.equal('hi')

  it 'serailizes nested attributes', ->
    formEl = $("""
      <form>
        <input name='attrs:nested-attr-one' value='hi'></input>
        <input name='attrs:nested-attr-two' value='ho'></input>
      </form>
    """)

    obj = formic(formEl).serialize()
    obj.attrs.nested_attr_one.should.equal('hi')
    obj.attrs.nested_attr_two.should.equal('ho')

  it "populates the values of form elements", ->
    formEl = $("""
      <form>
        <input name='attribute-name'></input>
      </form>
    """)

    formic(formEl).populate(attribute_name: 'hi')
    formEl.find('input')[0].value.should.equal('hi')

  it "populates the values of form elements for nested attributes", ->
    formEl = $("""
      <form>
        <input name='parent:attr-one'></input>
        <input name='parent:attr-two'></input>
      </form>
    """)

    formic(formEl).populate({parent:
      attr_one: 'hi'
      attr_two: 'ho'
    })
    formEl.find('input')[0].value.should.equal('hi')
    formEl.find('input')[1].value.should.equal('ho')

