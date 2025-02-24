import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import db from './config/Database.js';
import SequelizeStore from 'connect-session-sequelize';
import UserRoute from './routes/UserRoute.js';
import SurahRoute from './routes/SurahRoute.js'; 
import AuthRoute from './routes/AuthRoute.js';
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});

// (async() => {
//     await db.sync();
//     console.log("Database is connected");
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: 'auto' }
}));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(express.json());

app.get('/', (re, res) => {
    return res.json("Hello World");
})

app.use(UserRoute);
app.use(SurahRoute);
app.use(AuthRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log("Server is running on port 5000");
});
