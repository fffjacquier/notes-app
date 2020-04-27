import Head from 'next/head'
import Link from 'next/link'
import theme from '../styles/theme'

const Layout = ({ children, home }) => {
  return (
    <div>
      <Head>
        <title>Notes App</title>
      </Head>
      <header className="header">
        <h1>Notes</h1>
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
          grid-template-columns: 1fr 50px 50px;
          justify-content: center;
          align-items: center;
          background: ${theme.colors.black};
          color: ${theme.colors.offWhite}
        }
        .header a {
          color: var(--yellow);
        }
        h1 {
          line-height: 2;
          margin-bottom: 0;
        }
      `}</style>

      <main>{children}</main>
      <style>{`
        main {
          display: grid;
          grid-template-columns: 100px 100px 1fr;
        }
      `}</style>

    </div>
  )
}
export default Layout
