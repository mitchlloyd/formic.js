(function() {
  var FormicForm;

  window.formic = function(formEl) {
    return new FormicForm(formEl);
  };

  FormicForm = (function() {

    function FormicForm(formEl) {
      this.formEl = formEl;
    }

    FormicForm.prototype.serialize = function() {
      var el, obj, _i, _len, _ref;
      obj = {};
      _ref = this.formEl.find('input[name], select[name]');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        el = $(el);
        this._merge(el.attr('name'), el.val(), obj);
      }
      return obj;
    };

    FormicForm.prototype.populate = function(attributes) {
      var key, value, _results;
      _results = [];
      for (key in attributes) {
        value = attributes[key];
        key = this._underscoresToDashes(key);
        _results.push(this.formEl.find("*[name=" + key + "]").val(value));
      }
      return _results;
    };

    FormicForm.prototype._merge = function(name, value, obj) {
      var keys;
      name = this._dashesToUnderscores(name);
      keys = name.split(':');
      return this._buildNestedObject(keys, obj, value);
    };

    FormicForm.prototype._buildNestedObject = function(keys, object, value) {
      var key;
      if (keys.length === 1) {
        return object[keys[0]] = value;
      } else {
        key = keys.shift();
        object[key] || (object[key] = {});
        return this._buildNestedObject(keys, object[key], value);
      }
    };

    FormicForm.prototype._dashesToUnderscores = function(string) {
      return string.replace(/-/g, '_');
    };

    FormicForm.prototype._underscoresToDashes = function(string) {
      return string.replace(/_/g, '-');
    };

    return FormicForm;

  })();

}).call(this);
