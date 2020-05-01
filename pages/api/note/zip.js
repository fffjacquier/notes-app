export default (req, res) => {
  const archiver = require('archiver')
  // const fs = require('fs')
  // const path = require('path')

  const ZLIB_COMPRESSION = 9
  // const zipPath = path.resolve(__dirname, 'output.zip')

  // read notes json file
  // TODO the notes need to be imported here directly, not received in the body of the request (and /api/note/zip to be called with GET http verb)
  const notes = JSON.parse(req.body).notes

  // create archive and zip all
  res.setHeader('Content-Type', 'application/zip')
  res.setHeader('Content-disposition', 'attachment; filename=notes.zip')
  res.status(200) // 200 means everithing went fine... but most of the process is wroten below (and may crash for some reason)

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
  zip.pipe(res) // It seams to be here we tell archiver to "write" in the res object (witch is a stream)

  // add files and folder
  notes.forEach((note) => {
    zip.append(note.content, { name: note.folder + '/' + note.id + '.txt' })
  })
  zip.finalize()

  // no download :(

  //res.pipe()
  // .send(output)
  // res.end() // DO NOT END THE res STREAM BY YOURSELF. archive WILL TAKE CARE OF IT WHEN HE WILL BE READY
}
