import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { formatRelative } from "date-fns";
import { fr } from 'date-fns/locale'

const CurrentFolder = ({ notes, setNote, setCurrentNoteId, currentNoteId }) => {
  const router = useRouter()
  let currentFolder = router.query.currentFolder

  useEffect(() => {
    if (currentFolder) {
      const note = notes.filter(note => {
        return note.folder == router.query.currentFolder;
      })[0];
      if (note) {
        setCurrentNoteId(note.id)
        setNote(note);
      }
    }
  }, [router.query.currentFolder])

  return (
    <section>
      {notes.filter(note => note.folder == currentFolder).map((note, idx) => {
        const wordsArr = note.content.split(' ')
        const title = wordsArr.slice(0,4).join(' ');
        const formatRelativeLocale = {
          lastWeek: "eeee 'dernier'",
          yesterday: "'hier'",
          today: "p",
          tomorrow: "'demain'",
          nextWeek: "eeee",
          other: 'P'
        }
        const locale = {
          ...fr,
          formatRelative: token => formatRelativeLocale[token]
        }
        return (
          <div
            className={currentNoteId == note.id ? 'short selected' : 'short'}
            onClick={(e) => {
              e.preventDefault()
              setNote(note)
              setCurrentNoteId(note.id)
            }}
            key={idx}>
            <p>{title}{wordsArr.length > 4 ? '...' : ''}</p>
            <time>{formatRelative(new Date(note.updatedAt || note.createdAt), new Date(), { locale })}</time>
          </div>
        )
      })}
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
        time {
          font-size: 1.2rem;
        }
        `}
      </style>
    </section>
  );
}

export default CurrentFolder;
