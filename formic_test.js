
  chai.should();

  describe('formic', function() {
    it('creates an object from a form', function() {
      var formEl, obj;
      formEl = $("<form>\n  <input name='attribute-name' value='hi'></input>\n</form>");
      obj = formic(formEl).serialize();
      return obj.attribute_name.should.equal('hi');
    });
    it('handles nested attributes', function() {
      var formEl, obj;
      formEl = $("<form>\n  <input name='attrs:nested-attr-one' value='hi'></input>\n  <input name='attrs:nested-attr-two' value='ho'></input>\n</form>");
      obj = formic(formEl).serialize();
      obj.attrs.nested_attr_one.should.equal('hi');
      return obj.attrs.nested_attr_two.should.equal('ho');
    });
    return it("sets the values of form elements", function() {
      var formEl;
      formEl = $("<form>\n  <input name='attribute-name'></input>\n</form>");
      formic(formEl).populate({
        attribute_name: 'hi'
      });
      return formEl.find('input')[0].value.should.equal('hi');
    });
  });
