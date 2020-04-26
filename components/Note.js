import React, { Component } from 'react';

const Note = ({ note }) => {
  return (
    <section>
      <div key={note.id}>{note.content}</div>
    </section>
  );
}

export default Note;
