function unique(a, b) {
  return typeof a !== typeof b
      || a instanceof Text
      && a !== b
      || a.type !== b.type
}

export function diff(real, a, b, i = 0) {
  if (!b) {
    real.appendChild(a)
  } else if (!a) {
    real.removeChild(real.childNodes[i])
  } else if (unique(b, a)) {
    real.replaceChild(a, real.childNodes[i])
  } else if (a.tagName) {
    const al = a.childNodes.length
    const bl = b.childNodes.length

    for (let j = 0; j < bl || j < al; ++j) {
      diff(real.childNodes[i], a.childNodes[j], b.childNodes[j], j)
    }
  }
}
