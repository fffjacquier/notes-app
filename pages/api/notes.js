const fs = require('fs')
const path = require('path')

export default (req, res) => {
  try {
    const file = path.join(process.cwd(), __dirname, 'public', 'notes.json')
    const notesString = fs.readFileSync(file)
    res.status(200).send(notesString)
    res.end()
  } catch (e) {
    console.log(e);
    res.status(200).send([])
  }
}


