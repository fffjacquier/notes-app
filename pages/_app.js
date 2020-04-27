import Document from 'next/document'
import styles from '../styles/global.css'

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
    return <Component {...pageProps} />
  }
}
