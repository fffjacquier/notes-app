import React, { Component } from 'react'
import useForm from '../hooks/useForm'

const AddNote = () => {
  const { values, handleChange, handleSubmit } = useForm(log);

  async function log() {
    console.log(values);
    //const note = await fetch('/api/create')
   // noteJson = await note.json()
   // console.log(noteJson);

  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}>
        <h2>Add new note</h2>
        <fieldset>
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
              defaultValue={values.content} />
          </label>
        </fieldset>
        <button type="sybmit">Add</button>
      </form>
      <style>
        {`
          label {
            display: block;
            margin-bottom: 1rem;
          }
          input,
          textarea,
          select {
            width: 100%;
            padding: 0.5rem;
            font-size: 1rem;
            border: 1px solid black;
            &:focus {
              outline: 0;
              border-color: ${props => props.theme.red};
            }
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
        `}
      </style>
    </div>
  )
  }


export default AddNote
