
const Note = ({ note }) => {
  return (
    <section>
      <textarea
        key={note.id}
        defaultValue={note.content}
        style={{ width: '100%', height: '100%' }}
      >
      </textarea>
    </section>
  );
}

export default Note;
