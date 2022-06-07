import figlet from 'figlet'
import standard from 'figlet/importable-fonts/Standard.js'

figlet.parseFont('Standard', standard)

figlet.text(
  'CODE NIU',
  {
    font: 'Standard',
  },
  function (err, data) {
    console.log(data)
  }
)
