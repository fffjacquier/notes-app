const FoldersList = ({ setSelectedFolder, folders, selectedFolder }) => {

  return (
    <section style={{background: '#efefef'}}>
      {folders.map((folder, index) => (
        <p
          key={index}
          onClick={e => {
            e.preventDefault()
            console.log(folder)
            setSelectedFolder(folder)
          }}
          style={selectedFolder === folder ? {backgroundColor: 'orange'} : {}}>
          {folder}
        </p>
        )
      )}
    </section>
)
}

export default FoldersList;
