export default (req, res) => {
  const archiver = require('archiver')
  const fs = require('fs')
  const path = require('path')

  const ZLIB_COMPRESSION = 9
  const zipPath = path.resolve(__dirname, 'output.zip')

  // read notes json file
  const notes = JSON.parse(req.body).notes

  // create archive and zip all
  res.setHeader('Content-Type', 'application/zip')
  res.setHeader('Content-disposition', 'attachment; filename=notes.zip')
  res.status(200)

  // const output = fs.createWriteStream(path.join(__dirname, 'notes.zip'))
  // Using output gives Error [ERR_STREAM_CANNOT_PIPE]: Cannot pipe, not readable
  /*
  output.on('close', () =>
    console.log('Done!', archive.pointer() + ' total bytes')
  )
  */
  const zip = archiver('zip', {
    zlib: { level: ZLIB_COMPRESSION },
  })

  zip.on('error', (err) => {
    console.log('archive error', err)
    throw err
  })
  zip.pipe(res)

  // add files and folder
  notes.forEach((note) => {
    zip.append(note.content, { name: note.folder + '/' + note.id + '.txt' })
  })
  zip.finalize()

  // no download :(

  //res.pipe()
  // .send(output)
  res.end()
}
