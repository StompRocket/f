import * as f from "./f"

let product = (p, i) =>
  f.div
    ( f.classList("product") )
    ( f.b () (p.name)
    , f.p () (p.description)
    , f.btn
      ( f.onClick('RemoveProduct', i) )
      ( "Remove" ) )

let view = model =>
  f.div
    ()
    ( f.input
      ( f.type('text')
      , f.value(model.inputValue)
      , f.onInput('InputChanged') )
      ()
    , f.b () (model.inputValue)
    , f.btn 
      ( f.onClick('AddProduct') )
      ( "Add Product" )
    , f.div
      ()
      ( model.products.map( (p, i) => product(p, i)) ) )

let update = (e, m, body) => {
  console.log('body', body, 'e', e)
  if (e == 'AddProduct') {
    m.products.push(
      {
        name: "Product " + ++m.number,
        description: "Product Description"
      }
    )
  } else if (e == 'RemoveProduct') {
    m.products.splice(body, 1)
  } else if (e == 'InputChanged') {
    console.log('Updated Nice', body)
    m.inputValue = body
  }
  return m
}

f.render("#app", view, update, {
  number: 0,
  products: [],
  inputValue: 'Type Something'
})
