export default (req, res) => {
  const archiver = require('archiver')
  const fs = require('fs')

  const ZLIB_COMPRESSION = 9

  // read notes json file
  const notes = require('../../../notes/notes.json')

  // create archive and zip all
  res.setHeader('Content-Type', 'application/octet-stream')
  res.setHeader('Content-disposition', 'attachment; filename=notes.zip')

  const zip = archiver('zip', {
    zlib: { level: ZLIB_COMPRESSION },
  })

  zip.on('error', (err) => {
    console.error('archive error', err)
    throw err
  })

  zip.pipe(res)

  // add files and folder
  notes.notes.forEach((note) => {
    zip.append(note.content, { name: note.folder + '/' + note.id + '.txt' })
  })

  zip.finalize()
}
