window.formic = (formEl) -> new FormicForm(formEl)

class FormicForm
  constructor: (@formEl) ->

  serialize: ->
    obj = {}
    for el in @formEl.find('input[name], select[name]')
      el = $(el)
      @_merge(el.attr('name'), el.val(), obj)
    obj

  populate: (attributes) ->
    for key, value of attributes
      key = @_underscoresToDashes(key)
      @formEl.find("*[name=#{key}]").val(value)

  _merge: (name, value, obj) ->
    name = @_dashesToUnderscores(name)
    keys = name.split(':')
    @_buildNestedObject(keys, obj, value)

  _buildNestedObject: (keys, object, value) ->
    if keys.length is 1
      object[keys[0]] = value
    else
      key = keys.shift()
      object[key] or= {}
      @_buildNestedObject(keys, object[key], value)

  _dashesToUnderscores: (string) ->
    string.replace(/-/g, '_')

  _underscoresToDashes: (string) ->
    string.replace(/_/g, '-')
