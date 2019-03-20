function render(element, htmlObject, handler, model) {
  function f(c) {
    render(element, htmlObject, handler, c)
  }
  let e = document.querySelector(element)
  e.innerHTML = ''
  e.appendChild(htmlObject(model)(f, handler, model))
}

function orStr(e) {
  if (typeof e === 'string' || e instanceof String) {
    return () => document.createTextNode(e)
  } else {
    return function(r, h, model) {
      console.log("applying", Array.prototype.slice.call(arguments, 0))
      return e(r, h, model)
    }
  }
}

function elem(e) {
  return function() {
    var attrs = Array.prototype.slice.call(arguments, 0);
    return function() {
      var body = Array.prototype.slice.call(arguments, 0);

      return function(renderFactory, handler, model) {
        console.log(body, attrs, model)
        let element = document.createElement(e)
        console.log("about to apply handler")
        console.log(handler('Event', model))
        console.log("applied handler")

        body.forEach(el => {
          console.log("El", el)
          let e = orStr(el)(renderFactory, handler, model)
          console.log("Adding", e)
          element.appendChild(e)
        })

        attrs.forEach(a => {
          element = a(renderFactory, element, model, handler)
        })
        console.log("Returning", element)
        return element
      }

    }
  }
}

function attr(e) {
  return function(v) {
    return function(r, o, model, h) {
      console.log("o =", o)
      o.setAttribute(e, v)
      return o
    }
  }
}

const div   = elem('div')
const a     = elem('a')
const i     = elem('i')
const b     = elem('b')
const p     = elem('p')
const span  = elem('span')
const btn   = elem('button')

const classList = attr('class')
const idList = attr('id')

function onClick(event) {
  return function(renderFactory, element, model, handler) {
    element.addEventListener("click", () => {
      let newmodel = handler(event, model)
      if (newmodel !== model)
        renderFactory(newmodel)
    })
    return element
  }
}
