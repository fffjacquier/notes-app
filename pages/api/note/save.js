const fs = require('fs')
const path = require('path')

export default async (req, res) => {
  const file = path.join(process.cwd(), __dirname, 'notes', 'notes.json')

  await fs.writeFile(file, JSON.stringify(req.body, null, 2), err => {
    if (err) {
      res.status(200).send({ result: 0, error: err })
      res.end()
      return;
    }
    res.status(200).send({ result: 1 })
    res.end()
  })

}


