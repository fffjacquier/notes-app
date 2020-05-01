import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { format, formatISO, parseISO } from 'date-fns'
import useForm from '../hooks/useForm'

const Note = ({ notes, saveAll, setNotes, note }) => {
  const router = useRouter()
  const { values, handleChange, handleSubmit } = useForm(save)
  const thedate = note.updatedAt || note.createdAt
  let fmtDate
  if (thedate) {
    fmtDate = format(parseISO(thedate), 'MMMM d, yyyy h:mm')
  }

  let typingTimer
  const doneTypingInterval = 2000

  async function save() {
    const { id, content } = values
    const index = notes.findIndex((note) => note.id == id)

    let newNotes = {
      notes: [
        ...notes.slice(0, index),
        {
          ...note,
          content,
          updatedAt: new Date().toISOString(),
        },
        ...notes.slice(index + 1),
      ],
    }

    saveAll(newNotes)
  }

  const onkeydown = () => {
    clearTimeout(typingTimer)
  }

  const onkeyup = () => {
    clearTimeout(typingTimer)
    typingTimer = setTimeout(() => {
      save()
    }, doneTypingInterval)
  }

  useEffect(() => {
    const txtarea = document.querySelector('textarea')
    txtarea.addEventListener('keyup', onkeyup)
    txtarea.addEventListener('keydown', onkeydown)
    return () => {
      txtarea.removeEventListener('keyup', onkeyup)
      txtarea.removeEventListener('keydown', onkeydown)
    }
  })

  return (
    <section style={{ display: notes.length ? 'block' : 'none' }}>
      {note && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          {fmtDate && <p className="date">{fmtDate}</p>}
          <textarea
            key={note.id}
            name="content"
            defaultValue={note.content}
            onChange={(e) => handleChange(e, note.id)}
            style={{ width: '100%', height: 'calc(100vh - 120px)' }}
          ></textarea>
        </form>
      )}
      <style jsx>{`
        form {
          padding: 10px;
        }
        textarea {
          border: 0;
          resize: none;
          background: none;
          font-size: 1.5rem;
          line-height: 2rem;
        }
        textarea:focus {
          outline: none;
        }
        .date {
          text-align: center;
          color: grey;
          text-shadow: none;
          font-size: 1.2rem;
        }
      `}</style>
    </section>
  )
}

export default Note
