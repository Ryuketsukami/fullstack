import express from 'express';
import usersRoute from './routes/usersRoute';
import postsRoute from './routes/postsRoute';
import cors from 'cors';

const app = express();

require("dotenv/config");
require("google-auth-library");

app.use(express.json());

app.use(cors({
  origin: process.env.REACT_FRONT_URL // react app
}));

const port = 10000; // server


app.use("/users", usersRoute);
app.use("/posts", postsRoute);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

