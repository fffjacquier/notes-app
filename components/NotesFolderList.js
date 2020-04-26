import { useState } from 'react';

const NotesFolderList = ({ notes, setCurrentNoteId, selectedFolder, folders }) => {
  return (
    <section style={{background: '#f9faf9'}}>
      {notes.filter(note => note.folder == folders[selectedFolder]).map((note, idx) => (
        <div
          style={{ borderBottom: '1px solid grey'}}
          onClick={(e) => {
            e.preventDefault()
            setCurrentNoteId(note.id)
          }}
          key={idx}>
          <p>{note.content}</p>
          <time>{note.createdAt}</time>
        </div>
      ))}
    </section>
  );
}

export default NotesFolderList;
