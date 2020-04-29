import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useForm from '../hooks/useForm'

const Note = ({ notes, setNotes, note }) => {
  const router = useRouter()
  const { values, handleChange, handleSubmit } = useForm(save);

  async function save() {
    const { id, content } = values;
    const index = notes.findIndex((note) => note.id == id)

    let newNotes = {
      "notes": [
        ...notes.slice(0, index),
        {
          ...note,
          content,
          updatedAt: new Date().toISOString()
        },
        ...notes.slice(index + 1)
      ]
    };

    let data = JSON.stringify(newNotes)

    const res = await fetch('/api/note/save', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: data
      })
      .then(resp => resp.json())
      .then(data => {
        console.log("DATA", data)
        setNotes(newNotes.notes)
      })
      .catch(err => console.error("Error", err))
  }

  return (
    <section>
      {note && (
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}>
        <button type="submit" className="save">Save</button>
        <textarea
          key={note.id}
          name="content"
          defaultValue={note.content}
          onChange={e => handleChange(e, note.id)}
          style={{ width: '100%', height: 'calc(100vh - 120px)' }}
        >
        </textarea>
      </form>)}
      <style jsx>{`
        form {
          padding: 10px;
        }
        textarea {
          border: 0;
          resize: none;
          background: none;
          font-size: 1.5rem;
          line-Height: 2rem;
        }
        textarea:focus {
          outline: none;
        }
      `}</style>
    </section>
  );
}

export default Note;
