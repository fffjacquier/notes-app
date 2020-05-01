export default (req, res) => {
  const archiver = require('archiver')

  const ZLIB_COMPRESSION = 9
  console.log(ZLIB_COMPRESSION)

  // read notes json file
  const notes = require('../../../../notes/notes.json') //JSON.parse(req.body).notes
  console.log(notes) // never fired!

  // create archive and zip all
  res.setHeader('Content-Type', 'application/zip')
  res.setHeader('Content-disposition', 'attachment; filename=notes.zip')

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
}
