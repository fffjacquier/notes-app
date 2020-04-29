import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import FoldersList from '../components/FoldersList'
import CurrentFolder from '../components/CurrentFolder'
import Note from '../components/Note'

export default function Home() {
  // this doesn't look better than using setState so far!
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState([])
  const [hasError, setError] = useState(false)
  const [folders, setFolders] = useState([])
  const [currentNoteId, setCurrentNoteId] = useState(1)
  const [note, setNote] = useState({})
  const router = useRouter()

  async function fetchData() {
    const res = await fetch('/api/notes')
      .then(resp => resp.json())
      .then(data => {
        setLoading(false)

        let dataNotes = data.notes;

        // extract folders from notes
        // TODO: extract them automatically when saving
        //       and add a "folder" entry in the json file
        setFolders(dataNotes.reduce((acc, note) => {
          if (acc.indexOf(note.folder) === -1) {
            acc.push(note.folder)
          }
          return acc
        }, []))

        setNotes(dataNotes)

        let note = dataNotes.filter(note => {
          return note.id == currentNoteId;
        })[0];
        if (note) {
          setNote(note);
          router.push({ pathname: '/', query : { currentFolder: note.folder } })
        }

      })
      .catch(err => {
        console.error(err);
        setError(true)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="container">
      <Layout className="layout">

        {hasError && <p>An error occurred!</p>}

        <FoldersList
          folders={folders}
          notes={notes}
          setCurrentNoteId={setCurrentNoteId}
          setNote={setNote} />

        <CurrentFolder
          notes={notes}
          currentNoteId={currentNoteId}
          setNote={setNote}
          setCurrentNoteId={setCurrentNoteId} />

        <Note
          setNotes={setNotes}
          notes={notes}
          note={note} />

      </Layout>
      <style>{`
        .layout {
          display: grid;
          grid-template-columns: 100px 150px 1fr;
        }
        section {
          height: calc(100vh - 64px);
          padding: 1rem;
        }
      `}</style>
    </div>
  )
}
