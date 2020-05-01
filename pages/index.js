import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import FoldersList from '../components/FoldersList'
import CurrentFolder from '../components/CurrentFolder'
import Note from '../components/Note'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState([])
  const [hasError, setError] = useState(false)
  const [folders, setFolders] = useState([])
  const [currentNoteId, setCurrentNoteId] = useState(1)
  const [note, setNote] = useState({})
  const [message, setMessage] = useState('')
  const router = useRouter()

  async function fetchData() {
    setMessage('Getting notes...')
    const res = await fetch('/api/notes')
      .then((resp) => resp.json())
      .then((data) => {
        setLoading(false)

        let dataNotes = data.notes

        // extract folders from notes
        // TODO: extract them automatically when saving
        //       and add a "folder" entry in the json file
        if (!dataNotes) {
          dataNotes = []
        }
        setFolders(
          dataNotes.reduce((acc, note) => {
            if (acc.indexOf(note.folder) === -1) {
              acc.push(note.folder)
            }
            return acc
          }, [])
        )

        setNotes(dataNotes)
        setMessage('')

        let note = dataNotes.filter((note) => {
          return note.id == currentNoteId
        })[0]
        // console.log(note)
        if (note) {
          setNote(note)
          setCurrentNoteId(note.id)
          router.push({ pathname: '/', query: { currentFolder: note.folder } })
        }
      })
      .catch((err) => {
        console.error(err)
        setError(true)
      })
  }

  async function saveAll(notes) {
    setMessage('Saving...')
    let data = JSON.stringify(notes)

    const res = await fetch('/api/note/save', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('DATA', data)
        setMessage('Saved!')
        setNotes(notes.notes)
        let timeout = setTimeout(() => {
          setMessage('')
          clearTimeout(timeout)
        }, 2000)
      })
      .catch((err) => console.error('Error', err))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="main">
      <div className="wrapper">
        {hasError && <p>An error occurred!</p>}

        <FoldersList
          folders={folders}
          notes={notes}
          setCurrentNoteId={setCurrentNoteId}
          setNote={setNote}
        />

        <CurrentFolder
          notes={notes}
          currentNoteId={currentNoteId}
          setNote={setNote}
          setCurrentNoteId={setCurrentNoteId}
        />

        <Note saveAll={saveAll} notes={notes} note={note} />
      </div>

      <div className="message">{message}</div>

      <style>{`
        .main {
          display: grid;
          grid-template-rows: 1fr auto;
        }
        .main .wrapper {
          display: grid;
          grid-template-columns: 150px 150px 1fr;
        }
        .message {
          background: black;
          color: #ff9000;
        }
      `}</style>
    </div>
  )
}
