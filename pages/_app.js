import '@/styles/globals.css'
import {Footer, Header, Layout, Nav} from "@/components";
import { wrapper } from '@/modules/store'
const App = ({ Component, pageProps }) => {
  return <>
   <Header/>
  <Nav/>
  <Component {...pageProps} />
  <Layout/>
  <Footer/>
  </>
}

export default wrapper.withRedux(App)