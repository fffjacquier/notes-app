const fs = require('fs')
const path = require('path')

export default async (req, res) => {
  const file = path.join(process.cwd(), __dirname, 'public', 'notes.js')
  console.log(req.body);

  await fs.writeFile(file, req.body, err => {
    if (err) {
      console.log(err)
      res.status(200).send({result: 0})
      return;
    }
    res.status(200).send({ result: 1})
  })

}


