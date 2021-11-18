import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  function userRoute(req, res) {
    res.send({ user: req.session.user });
  },
  {
    cookieName: process.env.COOKIE_NAME,
    password: process.env.COOKIE_PASSWORD
  },
);