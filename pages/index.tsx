import Layout from './components/layout'
import Head from 'next/head'
//start login
import { withSessionSsr } from "../lib/withSession";
export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
    return {
      props: {
        user: req.session.user,
      },
    };
  },
);
//end login

export default function Admin({user}){
    return (
      <Layout user={user}>
        <Head>
        <title>Principal</title>
        </Head>
        <div className="page-content">
          <div className="content-wrapper">
            <div className="content-inner">
              <div className="content d-flex justify-content-center align-items-center">
                <div className="flex-fill">
                  <div className="text-center mb-4">
                    <img src="/car.png" className="img-fluid mb-4" height={230} alt="" />
                    <p className="display-3 font-weight-semibold line-height-1 mb-2">
                      Bienvenido
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </Layout>
    )
}