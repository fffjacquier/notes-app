import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from "react";

const CurrentFolder = ({ folders, setNote, notes }) => {
  // TODO use currentFolder as query param
  const router = useRouter();
  const [currentFolder, setCurrentFolder] = useState(router.query.currentFolder)

  function handleClick(e, folder) {
    e.preventDefault();
    router.push({ pathname: '/', query : { currentFolder: folder } })
  }

  return (
    <section>
      {folders.map((folder, index) => (
        <p
          className={folder === router.query.currentFolder ? 'selected' : ''}
          key={index}
        >
          <Link
            href={{
              pathname: '/',
              query: { currentFolder: folder },
            }}
          >
            <a onClick={e => handleClick(e, folder)}>{folder}</a>
          </Link>
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

export default CurrentFolder;
