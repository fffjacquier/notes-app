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
          style={selectedFolder === index ? {backgroundColor: 'orange'} : {}}>
          {folder}
        </p>
        )
      )}
    </section>
)
}

export default FoldersList;
