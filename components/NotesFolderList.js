import { useState } from 'react';

const NotesFolderList = ({ notes, setNote, currentNoteId, setCurrentNoteId, selectedFolder, folders }) => {
  let selectedNote = 1;
  return (
    <section>
      {notes.filter(note => note.folder == folders[selectedFolder]).map((note, idx) => (
        <div
          className={currentNoteId == note.id ? 'short selected' : 'short'}
          onClick={(e) => {
            e.preventDefault()
            setCurrentNoteId(note.id)
            setNote(note)
          }}
          key={idx}>
          <p>{note.content}</p>
          <time>{note.createdAt}</time>
        </div>
      ))}
      <style jsx>
        {`
        .short {
          cursor: pointer;
          border-bottom: 1px solid grey;
        }
        .selected {
          background-color: paleturquoise;
        }
        section {
          background: '#f9faf9';
        }
        `}
      </style>
    </section>
  );
}

export default NotesFolderList;
