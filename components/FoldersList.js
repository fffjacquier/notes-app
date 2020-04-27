const FoldersList = ({ setSelectedFolder, folders, selectedFolder, setNote, notes, setCurrentNoteId }) => {

  return (
    <section>
      {folders.map((folder, index) => (
        <p
          key={index}
          onClick={e => {
            e.preventDefault();
            selectedFolder = index;
            setSelectedFolder(selectedFolder);
            let notesFolder = notes.filter(note => note.folder == folders[selectedFolder])
            setNote(notesFolder[0] || {})
            setCurrentNoteId(notesFolder[0].id)
          }}
          className={selectedFolder === index ? 'selected' : ''}
        >
          {folder}
        </p>
        )
      )}
      <style jsx>
        {`
        p {
          cursor: pointer;
        }
        p.selected {
          background-color: orange;
        }
        section {
          background: '#efefef';
        }
        `}
      </style>
    </section>
  )
}

export default FoldersList;
