import Head from 'next/head'
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import FoldersList from '../components/FoldersList'
import NotesFolderList from '../components/NotesFolderList'
import Note from '../components/Note'

export default function Home() {
  // this doesn't like better than using setState to me!
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState([])
  const [hasError, setError] = useState(false)
  const [folders, setFolders] = useState([])
  const [selectedFolder, setSelectedFolder] = useState(0)
  const [currentNoteId, setCurrentNoteId] = useState(1)

  async function fetchData() {
    const res = await fetch('/api/notes')
      .then(resp => resp.json())
      .then(data => {
        setLoading(false)
        let notes = data.notes;
        setFolders(notes.reduce((acc, note) => {
          if (acc.indexOf(note.folder) === -1) {
            acc.push(note.folder)
          }
          return acc
        }, []))
        setNotes(notes)
        setCurrentNoteId(notes[0].id)
      })
      .catch(err => {
        console.error(res.status, res.statusText);
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
          setSelectedFolder={setSelectedFolder}
          folders={folders}
          selectedFolder={selectedFolder} />

        <NotesFolderList
          selectedFolder={selectedFolder}
          notes={notes}
          folders={folders}
          setCurrentNoteId={setCurrentNoteId} />

        <Note note={notes.filter(note => note.folder == folders[selectedFolder] && note.id == currentNoteId)} />

      </Layout>
      <style>{`
        .layout {
          display: grid;
          grid-template-columns: 100px 100px 1fr;
        }
        section {
          height: calc(100vh - 64px);
          padding: 1rem;
        }
      `}</style>
    </div>
  )
}
