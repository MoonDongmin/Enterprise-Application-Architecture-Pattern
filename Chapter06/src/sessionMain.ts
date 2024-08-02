import express, {Express}       from "express";
import {config as configDotenv} from "dotenv";
import cookieParser             from "cookie-parser";
import session                  from "express-session";

const app: Express = express();
configDotenv();
const port: string | undefined = process.env.PORT || "3000";

app.use(cookieParser()); // 이 미들웨어가 있어야 쿠키를 사용할 수 있음
app.use(express.json()); // 이 미들웨어가 있어야 JSON 형식으로 데이터를 파싱함
app.use(express.urlencoded({extended: true})); // 이 미들웨어가 있어야 URL 인코딩된 폼 데이터를 파싱하여 req.body로 사용할 수 있게 함

app.use(session({
    secret: "test", // 시크릿키
    resave: false,
    saveUninitialized: true,
    name: "info",
    cookie: {
        secure: false,
    },
}));

// localhost 접속
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// 로그인 페이지 이동
app.get("/login", (req, res) => {
    res.send(`
    <form action="/login" method="post">
      <label for="username">ID:</label>
      <input type="text" id="username" name="username" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      <br>
      <button type="submit">Sign Up</button>
    </form>`);
});

app.post("/login", (req, res) => {
    const {
        username,
        password,
    } = req.body;

    // 세션에 사용자 정보 저장
    req.session.userId = username;
    req.session.password = password;

    res.send(`회원가입이 완료되었습니다!
     ${JSON.stringify(req.session)}`);
});

app.get("/check", (req, res) => {
    const userId = req.session.userId;

    res.send(`${userId}님 환영합니다.`);
});


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
