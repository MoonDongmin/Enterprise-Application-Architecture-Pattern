import express, {Express} from "express";
import {configDotenv}     from "dotenv";
import cookieParser       from "cookie-parser";

const app: Express = express();
configDotenv();
const port: string | undefined = process.env.PORT;

app.use(cookieParser()); // 이 미들웨어가 있어야 쿠키를 사용할 수 있음
app.use(express.json()); // 이 미들웨어가 있어야 JSON 형식으로 데이터를 파싱함
app.use(express.urlencoded()); // 이 미들웨어가 있어야 URL 인코딩된 폼 데이터를 파싱하여 req.body로 사용할 수 있게 함

// localhost 접속
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// 로그인 페이지 이동
app.get("/login", (req, res) => {
    res.send(`
    <form action="/login" method="post">
      <label for="id">ID:</label>
      <input type="text" id="id" name="id" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      <br>
      <button type="submit">Sign Up</button>
    </form>`);
});

app.post("/login", (req, res) => {
    const {
        id,
        password,
    } = req.body;

    res.cookie("id", id);
    res.cookie("password", password, {maxAge: 1000});
    res.send("로그인 성공");
});

app.get("/check", (req, res) => {
    const id = req.cookies.id;

    res.send(`${id}님 환영합니다.`);
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});


