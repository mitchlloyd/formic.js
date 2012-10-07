
  chai.should();

  describe('formic', function() {
    it('creates an object from a form', function() {
      var formEl, obj;
      formEl = $("<form>\n  <input name='attribute-name' value='hi'></input>\n</form>");
      obj = formic(formEl).serialize();
      return obj.attribute_name.should.equal('hi');
    });
    it('serailizes nested attributes', function() {
      var formEl, obj;
      formEl = $("<form>\n  <input name='attrs:nested-attr-one' value='hi'></input>\n  <input name='attrs:nested-attr-two' value='ho'></input>\n</form>");
      obj = formic(formEl).serialize();
      obj.attrs.nested_attr_one.should.equal('hi');
      return obj.attrs.nested_attr_two.should.equal('ho');
    });
    it("populates the values of form elements", function() {
      var formEl;
      formEl = $("<form>\n  <input name='attribute-name'></input>\n</form>");
      formic(formEl).populate({
        attribute_name: 'hi'
      });
      return formEl.find('input')[0].value.should.equal('hi');
    });
    return it("populates the values of form elements for nested attributes", function() {
      var formEl;
      formEl = $("<form>\n  <input name='parent:attr-one'></input>\n  <input name='parent:attr-two'></input>\n</form>");
      formic(formEl).populate({
        parent: {
          attr_one: 'hi',
          attr_two: 'ho'
        }
      });
      formEl.find('input')[0].value.should.equal('hi');
      return formEl.find('input')[1].value.should.equal('ho');
    });
  });
