const cors = require('cors')
const {dbConnect, sequelize} = require('./db/db')
const express = require('express')
const cookieParser = require('cookie-parser');

const authRouter = require('./routers/auth.router')
const subjectRouter = require('./routers/subject.router');
const questionRouter = require('./routers/question.router');
const answerRouter = require('./routers/answer.router');
const resultRouter = require('./routers/result.router');
const testSessionRouter = require('./routers/session.router');
const errorMiddleware = require('./middlewares/error.middleware');
const authMiddleware = require('./middlewares/auth.middleware');
const roleMiddleware = require('./middlewares/role.middleware');
require('dotenv').config()



const port = process.env.PORT || 8000
const app = express()

app.use(cookieParser())

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use("/auth", authRouter)
app.use("/subjects", authMiddleware,roleMiddleware("TEACHER"), subjectRouter);
app.use("/questions", authMiddleware, roleMiddleware("TEACHER"), questionRouter);
app.use("/answers", authMiddleware, answerRouter);
app.use("/results", authMiddleware, resultRouter);
app.use("/sessions", authMiddleware, testSessionRouter);
app.use(errorMiddleware)

const start = async () => {
    try {

        await dbConnect()
        app.listen(port, () => {
            console.log("Server working on a port", port)

        })
    } catch (error) {

        console.log(error);

    }
}

start()