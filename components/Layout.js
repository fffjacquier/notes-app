import Head from 'next/head'
import Link from 'next/link'
import theme from '../styles/theme'

const Layout = ({ children, home }) => {
  async function getZip() {
    // get all notes as json
    const res = await fetch('/api/notes')
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        fetch('/api/note/zip', {
          method: 'POST',
          body: JSON.stringify(data),
        })
          .then((resp) => console.log('zip resp:', resp))
          .catch((err) => console.error(err))
      })
      .catch((err) => console.error(err))
  }

  return (
    <div>
      <Head>
        <title>Notes App</title>
      </Head>
      <header className="header">
        <h1>Notes</h1>
        <button onClick={getZip}>Export as zip</button>
        <Link href="/">
          <a>All</a>
        </Link>
        <Link href="/addnote">
          <a>New</a>
        </Link>
      </header>
      <style jsx>{`
        .header {
          display: grid;
          grid-gap: 10px;
          grid-auto-flow: column;
          grid-template-columns: 1fr;
          justify-content: center;
          align-items: center;
          background: ${theme.colors.black};
          color: ${theme.colors.offWhite};
        }
        .header a {
          color: var(--yellow);
          padding: 10px;
        }
        h1 {
          line-height: 2;
          margin-bottom: 0;
        }
      `}</style>

      <main>{children}</main>
    </div>
  )
}
export default Layout
