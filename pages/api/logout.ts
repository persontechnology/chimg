import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  function logoutRoute(req, res, session) {
    req.session.destroy();
    res.redirect('/')
  },
  {
    cookieName: process.env.COOKIE_NAME,
    password: process.env.COOKIE_PASSWORD
  },
);