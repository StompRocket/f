# Guide


This page aims to provide a high-level guide to using f.js, and an introduction
to functional programming concepts and how they can be applied to web design.

There are two core principles that dictate how everything in f.js works.

1. Everything is a function
2. Changes to the model can only occur because of events.

Already it is obvious that f.js does not work like most frontend frameworks do.
React, Vue, etc. all try to create a way for the view to update based on changes
to the data (or model). This is so difficult to achieve cleanly and quickly
because of the imperative nature of the code these frameworks expect you to write.
There is no one known source of changes to the model, and because of this, complex
methods of handling these changes must be designed. In f.js, since the origin of
all changes to the model is known, the runtime required is minimal, and more
importantly, developers can easily track down bugs.

## Hello, World!

Now that some of the benefits of f.js have been covered, what does an f.js app
actually look like? Here is a hello world example in f.js:

```js
import * as f from '@stomprocket/f'

let view = model =>
  f.b
    ( )
    ( model.message )

let update = (e, model, body) => model

f.render("#app", view, update, {
  message: "Hello, World!"
})
```

Already this looks pretty different from most frameworks. Let's go through it 
part by part.

### The View

On line 3 a function view is declared, which takes a model as its only argument,
and calls and returns a function `f.b`. The syntax is a bit different from what many
JavaScript developers might be used to. Why are there two sets of arguments?
Where is the logic? It may be more understandable to express this in the regular,
old JavaScript way, using plain old `function`s.

```js
function view(model) {
  return f.b()(model.message)
}
```

The `b` function is the same as an HTML `<b>` tag in f.js. It takes two sets of
arguments, the first one being it's attributes, and the second, it's body. This
is an abstraction over what the `b` function actually does, take some arguments
as it's attributes, and return another function that will take arguments for its
body. You'll notice this pattern used everywhere in f.js. In fact, `b` itself
is defined as
```js
const b = elem('b')
```
Which means the same code could be written as `elem('b')()(model.message)`.
You don't need to understand the intricacies of *why* f.js is designed like this
just yet, that will be covered a bit later.


### Update

The `update` function is defined as taking three arguments, `(e, model, body)` and
returning the model. This function is responsible for handling all events. Since
our app so far doesn't have any events, it simply returns the model unmodified.


### Render

The `render` function takes a view, an updater function, and a starting model, and
renders them to a certain element, in this case `#app`. This function is pretty
self explanatory, it just renders the view to the element it is told to. It
doesn't handle any events or anything itself, it just tells the view what to do
when it has an event to emit. 


## Components

Everything in f.js is a function, including components. There are two types
of componenets. Simple styled components (ones that only contain certain
attributes), or complex ones, that can handle rendering elaborate data.

The first of these is extremely simple due to the functional design of f.js:
```js
let container = f.div ( f.classList("container") )
```
Such styled components can be used just like normal f.js dom functions, with
the exception that the attributes are ommited.
```js
let view = model =>
  container
    ( f.b ()
      ( "Nice" ) )
```
Complex components are useful for rendering commonly repeated components. For
example, the fotllowing `product` component will render a simple div containing
the products name and description.
```js
let product = p =>
  f.div
    ( f.classList("product") )
    ( f.b () (p.name)
    , f.p () (p.description) )
```
Notice the argument `p` used. This allows a seperate, scoped model to be passed
to the function. In this example, an array of products is rendered using this
custom component:
```js
let view = model =>
  f.div
    ()
    (model.products.map(p => product(p)))

let update = (e, m, b) => m

f.render("#app", view, update, {
  products: [
    {
      name: "Foo",
      description: "Foo Description"
    },
    {
      name: "Bar",
      description: "Bar Description"
    }
  ]
})
```
