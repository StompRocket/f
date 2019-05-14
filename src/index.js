import * as f from "./f"

let view = model =>
  f.div ()
  ( f.input
    ( f.type('text')
    , f.value(model.inputValue)
    , f.onInput('InputChanged')
    )
    ( "Nice" )
  , f.h1 ()
    (model.inputValue)
  )

let update = (e, m, body) => {
  // console.log('body', body, 'e', e)
  if (e == 'InputChanged') {
    console.log('Updated Nice', body)
    m.inputValue = body
  }
  return m
}

f.render("#app", view, update, {
  inputValue: 'Type Something'
})
