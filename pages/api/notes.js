const fs = require('fs')
const path = require('path')
const JSON_WHITESPACE = 2

// how does this really work?
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}

export default (req, res) => {
  try {
    // what is the easy way to get the public folder by default?
    const file = path.join(process.cwd(), __dirname, 'public', 'notes.js')
    const notesString = fs.readFileSync(file)
    res.status(200).end(notesString)
    res.end()
  } catch (e) {
    console.log(e);
    res.status(200).end([])
  }
}


