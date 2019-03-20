let view = model =>
  div
    ( classList('some_class') )
    ( b ()
      ( model.boldText )
    , btn
      (  onClick('Clicked') )
      ( model.btnText )
    , i ()
      ( model.clicked + " times" ) )

let update = (e, model) => {
  if (e === 'Clicked') {
    model.boldText = "Clonk"
    model.clicked++
  }
  return model
}

render("#app", view, update, {
  boldText: "Bold!",
  btnText: "Click me",
  clicked: 0
})
