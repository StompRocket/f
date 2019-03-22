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
    ( f.btn 
      ( f.onClick('AddProduct') )
      ( "Add Product" )
    , f.div
      ()
      ( model.products.map( (p, i) => product(p, i)) ) )

let update = (e, m, body) => {
  if (e == 'AddProduct') {
    m.products.push(
      {
        name: "Product " + ++m.number,
        description: "Product Description"
      }
    )
  } else if (e == 'RemoveProduct') {
    m.products.splice(body, 1)
  }
  return m
}

f.render("#app", view, update, {
  number: 0,
  products: []
})
