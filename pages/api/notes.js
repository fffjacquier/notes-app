const fs = require('fs')
const path = require('path')

export default (req, res) => {
  try {
    const file = path.join(process.cwd(), __dirname, 'notes', 'notes.json')
    const notesString = fs.readFileSync(file)
    res.status(200).send(notesString)
    res.end()
  } catch (e) {
    res.status(200).send([])
  }
}


