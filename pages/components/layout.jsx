import Footer from './footer'
import Navbar from './navbar'
import Head from 'next/head'

export default function Layout({ children,user }) {
    return (
      <>
       <Head>
            
            <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css" />
            
            
            
            <script src="/global_assets/js/main/jquery.min.js"></script>
            <script src="/global_assets/js/main/bootstrap.bundle.min.js"></script>
            <script src="/global_assets/js/plugins/ui/fab.min.js"></script>
            <script src="/assets/js/app.js"></script>
            
        </Head>

        <Navbar/>
        <main>{children}</main>
        <Footer/>
      </>
    )
  }