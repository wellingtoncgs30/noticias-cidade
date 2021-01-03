import "bootstrap/dist/css/bootstrap.min.css"
import '../styles/globals.css'

if(typeof window !== "undefined") {
  require("jquery")
  require("popper.js")
  require("bootstrap")
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
