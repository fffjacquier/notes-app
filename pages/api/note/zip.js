export default (req, res) => {
  const archiver = require('archiver')
  const fs = require('fs')
  const path = require('path')

  const deleteFolderRecursive = function (targetPath) {
    if (fs.existsSync(targetPath)) {
      fs.readdirSync(targetPath).forEach((file, index) => {
        const curPath = path.join(targetPath, file)
        if (fs.lstatSync(curPath).isDirectory()) {
          // recurse
          deleteFolderRecursive(curPath)
        } else {
          // delete file
          fs.unlinkSync(curPath)
        }
      })
      fs.rmdirSync(path)
    }
  }

  const ZLIB_COMPRESSION = 9
  const zipPath = path.join(__dirname, '/notes.zip')

  // read notes json file
  const notes = JSON.parse(req.body).notes

  // for each folder create a directory
  const folders = notes.reduce((acc, note) => {
    if (acc.indexOf(note.folder) === -1) {
      acc.push(note.folder)
    }
    return acc
  }, [])
  console.log(folders)

  const cb = () => {
    folders.forEach((folder) => {
      fs.mkdir(
        path.join(__dirname, 'zip', folder),
        { recursive: true },
        (err) => {
          if (err) {
            console.error('1', err)
            throw 'Error!!' + err
          }
          createAndZip()
        }
      )
    })
  }

  cb()

  // create archive and zip all
  const createAndZip = () => {
    notes.forEach((note) => {
      fs.writeFileSync(
        path.join(__dirname, 'zip', note.folder, note.id + '.txt'),
        JSON.stringify(note.content)
      )
    })

    const output = fs.createWriteStream(zipPath)
    const archive = archiver('zip', {
      zlib: { level: ZLIB_COMPRESSION },
    })

    archive.on('error', (err) => {
      throw err
    })

    output.on('close', () => {
      console.log(`Total bytes: ${archive.pointer()}`)
      console.log('archiving done!')
    })

    archive.pipe(output)

    // add files and folder
    archive.directory('/zip')

    archive.finalize()

    // code to download zip file
    /*res.setHeader('Content-Type', 'application/octet-stream')
    res.setHeader('Content-Disposition', `attachment; filename=${zipPath}`)
    res.setHeader('Content-Length', output.length)
    res.send(output)
    deleteFolderRecursive(path.join(__dirname, 'zip'))*/
    res.end()
  }
}
