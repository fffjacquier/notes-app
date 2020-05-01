import React, { Component, useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import useForm from '../hooks/useForm'

const AddNote = () => {
  const { values, handleChange, handleSubmit } = useForm(addNote)
  const [loading, setLoading] = useState(false)

  async function addNote() {
    const { notes } = require('../notes/notes.json')
    // console.log(values)
    const { folder, content } = values
    const id = notes.length + 1
    const created = new Date().toISOString()

    let newNotes = {
      notes: [
        ...notes,
        {
          id,
          content,
          folder,
          createdAt: created,
          updatedAt: created,
        },
      ],
    }
    console.log(newNotes)

    let data = JSON.stringify(newNotes)

    const res = await fetch('/api/note/save', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: data,
    })
      .then((resp) => resp.json())
      .then((res) => {
        Router.push({
          pathname: '/',
          query: { currentFolder: folder },
        })
      })
      .catch((err) => console.error('Error', err))
  }

  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <h2>Add new note</h2>
        <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor="folder">
            Folder name
            <input
              type="text"
              id="folder"
              name="folder"
              placeholder="folder"
              required
              defaultValue={values.folder}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="content">
            Note
            <textarea
              rows="8"
              required
              id="content"
              name="content"
              onChange={handleChange}
              defaultValue={values.content}
            />
          </label>
        </fieldset>
        <button type="sybmit">Add</button>
      </form>
      <style jsx>{`
        .main {
          display: grid;
          grid-template-columns: 1fr;
        }
        label {
          display: block;
          margin-bottom: 1rem;
        }
        form {
          box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
          background: rgba(0, 0, 0, 0.02);
          padding: 10px;
          font-size: 1.5rem;
          line-height: 1.5;
          font-weight: 600;
        }
        input,
        textarea,
        select {
          width: 100%;
          padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid black;
        }
        input:focus,
        textarea:focus,
        select:focus {
          outline: 0;
          border-color: red;
        }
        button,
        input[type='submit'] {
          width: auto;
          background: red;
          color: white;
          border: 0;
          font-size: 2rem;
          font-weight: 600;
          padding: 0.5rem 1.2rem;
        }
        fieldset {
          border: 0;
          padding: 0;
        }
        fieldset[disabled] {
          opacity: 0.5;
        }
        fieldset::before {
          height: 10px;
          content: '';
          display: block;
          background-image: linear-gradient(
            to right,
            #ff3019 0%,
            #e2b04a 50%,
            #ff3019 100%
          );
        }
        fieldset[aria-busy='true']::before {
          background-size: 50% auto;
          animation: ${loading} 0.5s linear infinite;
        }
        }
      `}</style>
    </div>
  )
}

export default AddNote
