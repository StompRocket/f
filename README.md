# f.js - a functional frontend framework

f.js aims to remove all the oo bloat and provide a simple abstraction
over DOM manipulation that allows clean, functional, and scalable
code to be used with ease.

## docs

Documentation for f.js is available at [stomprocket.github.io/f](https://stomprocket.github.io/f).

## parts of a f.js application

An f.js app consists of a model, a view, and an updater or controller.
The view is a representation of the DOM tree that will be built by f.js,
the model is a JavaScript object that contains the state of the app, and
the updater or controller (the names are fairly interchangeable) contains
the logic for how to modify the state (model) based on events. Events can
be dispatched from DOM elements when certain things occur (like a button
being pressed), or from async function (which JS is quite good at).

## hello world

```js
// Use es2015 imports via. webpack
import * as f from '@stomprocket/f'

// This function takes the model and renders some html
let view = model =>
  // the div function creates a <div /> tag
  f.div
    // first argument set contains any attributes
    ()
    // second contains body
    (model.helloWorld)

// Just return the model unmodified on update
let update = (event, model) => model

// render on the #app element
f.render("#app", view, update, {
  helloWorld: "Hello, WOrld!"
})
```

