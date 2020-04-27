import useForm from '../hooks/useForm'

const Note = ({ note }) => {
  const { values, handleChange, handleSubmit } = useForm(save);

  async function save() {
    console.log(values)
    const res = await fetch('/api/note/save', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(values)
      })
      .then(resp => resp.json())
      .then(data => console.log("DATA", data))
      .catch(err => console.error(err))
  }

  return (
    <section>
      {note && (<form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}>
        <textarea
          key={note.id}
          name="content"
          defaultValue={note.content}
          onChange={handleChange}
          style={{ width: '100%', height: 'calc(100vh - 120px)' }}
        >
        </textarea>
        <button type="submit">Save</button>
      </form>)}
    </section>
  );
}

export default Note;
