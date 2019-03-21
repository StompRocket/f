import {div, b, btn, i, render, classList, onClick} from './f'

let view = model =>
  div
    ( classList('some_class') )
    ( b ()
      ( model.boldText )
    , btn
      ( onClick('Clicked') )
      ( model.btnText )
    , i ()
      ( model.clicked + " time" + (model.clicked === 1 ? "" : "s") )
    )

let update = (e, model) => {
  if (e === 'Clicked') {
    model.boldText = "Clicked"
    model.clicked++
  }
  return model
}

render("#app", view, update, {
  boldText: "Bold Text",
  btnText: "Click me",
  clicked: 0
})
