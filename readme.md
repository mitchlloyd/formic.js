# Formic.js

Formic provides a simple way to serialize and populate forms that happens
to work well with Backbone apps. However, Formic only has one dependency:
JavaScript.

## Usage

Formic has two methods that you should know about:

1. serialize()

  ```
  formic(formEl).serialize()
  ```

  This returns an object of values based on the form element.

2. populate(attributes)

  ```
  formic(formEl).populate({first_name: 'Bruce'})
  ```

  This sets the value of a form element with name="first_name" to Bruce.


## Todos

* Better documentation
* Handel more form elements (currently just input and select)
* Change element name sytnax to be more obvious
