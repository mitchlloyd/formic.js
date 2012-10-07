(function() {
  var FormicForm;

  window.formic = function(formEl) {
    return new FormicForm(formEl);
  };

  FormicForm = (function() {

    function FormicForm(formEl) {
      if (formEl instanceof jQuery) {
        this.formEl = formEl[0];
      } else {
        this.formEl = formEl;
      }
    }

    FormicForm.prototype.serialize = function() {
      var el, obj, _i, _len, _ref;
      obj = {};
      _ref = this._getFormElements(this.formEl);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        this._merge(el.name, el.value, obj);
      }
      return obj;
    };

    FormicForm.prototype.populate = function(attributes) {
      var key, value, _ref, _results;
      _ref = this._buildNames(attributes);
      _results = [];
      for (key in _ref) {
        value = _ref[key];
        _results.push(this._getFirstElementByName(key).value = value);
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

    FormicForm.prototype._buildNames = function(attributes) {
      var key, names, value;
      names = {};
      for (key in attributes) {
        value = attributes[key];
        this._buildNestedNames(key, value, names);
      }
      return names;
    };

    FormicForm.prototype._buildNestedNames = function(key, value, names) {
      var localKey, localValue, _results;
      if (typeof value === 'object') {
        console.log('hello');
        _results = [];
        for (localKey in value) {
          localValue = value[localKey];
          _results.push(this._buildNestedNames("" + key + ":" + localKey, localValue, names));
        }
        return _results;
      } else {
        key = this._underscoresToDashes(key);
        return names[key] = value;
      }
    };

    FormicForm.prototype._dashesToUnderscores = function(string) {
      return string.replace(/-/g, '_');
    };

    FormicForm.prototype._underscoresToDashes = function(string) {
      return string.replace(/_/g, '-');
    };

    FormicForm.prototype._getFormElements = function(el) {
      var elements, field, tagName, _i, _j, _len, _len2, _ref, _ref2;
      elements = [];
      _ref = ['input', 'select'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tagName = _ref[_i];
        _ref2 = el.getElementsByTagName(tagName);
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          field = _ref2[_j];
          elements.push(field);
        }
      }
      return elements;
    };

    FormicForm.prototype._getFirstElementByName = function(name) {
      var el, elements, _i, _len;
      elements = this._getFormElements(this.formEl);
      for (_i = 0, _len = elements.length; _i < _len; _i++) {
        el = elements[_i];
        if (el.name === name) return el;
      }
    };

    return FormicForm;

  })();

}).call(this);
