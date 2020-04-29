import Document from 'next/document'
import styles from '../styles/global.css'
import Layout from '../components/Layout'

export default class App extends Document {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    // exposes query to the user
    pageProps.query = ctx.query
    return { pageProps }
  }
  render() {
    const { Component, pageProps } = this.props
    return <Layout className="layout">
      <Component {...pageProps} />
      <style jsx>{`
        .layout {
          display: grid;
          grid-template-columns: 100px 150px 1fr;
        }
        section {
          height: calc(100vh - 64px);
          padding: 1rem;
        }
      `}</style>
    </Layout>
  }
}
