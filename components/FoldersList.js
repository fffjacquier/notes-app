import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const CurrentFolder = ({ folders, setNote, notes }) => {
  const router = useRouter()
  const [currentFolder, setCurrentFolder] = useState(router.query.currentFolder)

  function handleClick(e, folder) {
    e.preventDefault()
  }

  return (
    <section>
      <div>
        {folders.map((folder, index) => (
          <p
            className={folder === router.query.currentFolder ? 'selected' : ''}
            onClick={(e) => handleClick(e, folder)}
            key={index}
          >
            <Link
              href={{
                pathname: '/',
                query: { currentFolder: folder },
              }}
            >
              <a>{folder}</a>
            </Link>
            <span>{notes.filter((note) => note.folder == folder).length}</span>
          </p>
        ))}
      </div>
      <div className="action">
        <button>➕New folder</button>
      </div>
      <style jsx>
        {`
          section {
            display: grid;
            grid-template-rows: 1fr 20px;
            border-right: 1px solid #dedfde;
          }
          .action {
            justify-self: center;
          }
          p {
            cursor: pointer;
            padding: 10px;
            display: grid;
            grid-gap: 10px;
            grid-auto-flow: column;
            grid-template-columns: 1fr;
            align-items: center;
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

export default CurrentFolder
