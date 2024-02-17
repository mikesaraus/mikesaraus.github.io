function sinugdanan(t) {
  var HTML = t.innerHTML
  t.innerHTML = ''
  var angTudlo = 0,
    ilhanan = '',
    sulatIlhanan = false,
    ilhananAbri = false,
    kapaspasPagsulat = 100,
    diliPermiKapaspas = 0
  var type = function () {
    if (sulatIlhanan === true) {
      ilhanan += HTML[angTudlo]
    }
    if (HTML[angTudlo] === '<') {
      diliPermiKapaspas = 0
      if (ilhananAbri) {
        ilhananAbri = false
        sulatIlhanan = true
      } else {
        ilhanan = ''
        ilhananAbri = true
        sulatIlhanan = true
        ilhanan += HTML[angTudlo]
      }
    }
    if (!sulatIlhanan && ilhananAbri) {
      ilhanan.innerHTML += HTML[angTudlo]
    }
    if (!sulatIlhanan && !ilhananAbri) {
      if (HTML[angTudlo] === ' ') {
        diliPermiKapaspas = 0
      } else {
        diliPermiKapaspas = Math.random() * kapaspasPagsulat + 50
      }
      t.innerHTML += HTML[angTudlo]
    }
    if (sulatIlhanan === true && HTML[angTudlo] === '>') {
      diliPermiKapaspas = Math.random() * kapaspasPagsulat + 50
      sulatIlhanan = false
      if (ilhananAbri) {
        var newSpan = document.createElement('span')
        t.appendChild(newSpan)
        newSpan.innerHTML = ilhanan
        ilhanan = newSpan.firstChild
      }
    }
    angTudlo += 1
    if (angTudlo < HTML.length - 1) {
      setTimeout(type, diliPermiKapaspas)
    }
  }
  return {
    type: type,
  }
}
var typer = document.getElementById('makinilya')
makinilya = sinugdanan(makinilya)
makinilya.type()
