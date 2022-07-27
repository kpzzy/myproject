const express = require("express");
const connect = require("./schemas/index")
const app = express();
const port = 3000;

connect();

const guitarRouter = require("./routes/guitar");
const commentsRouter = require("./routes/comments");

const requestMiddleware = (req, res, next) => {
    console.log("Request URL", req.originalUrl, " - ", new Date());
    next();
};

app.use(express.json());
app.use(requestMiddleware)

// 포스트창을 그거 guitar.js 여기의 기본값으로 설정함
app.use("/posts", [guitarRouter]);
app.use("/comments", [commentsRouter]);

// 메인화면
app.get('/', (req, res) => {
    res.send("hello world")
});

app.listen(port, () => {
    console.log(port, "포트가 켜짐")
});