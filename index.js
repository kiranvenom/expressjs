const express = require('express');
const app = express();

const userRoute = require('./src/routes/user');

// const loggingMiddleWare = (req, res, next) => {
// 	console.log(`${req.method} -- ${req.url}`);
// 	next();
// };
app.use(express.json());
// app.use(loggingMiddleWare);
app.use(userRoute);

const PORT = 3000;

app.get('/', (req, res) => {
	res.send('hello world');
});

app.listen(PORT, () => {
	console.log('\x1b[32;1mSuccessfully server started\x1b[0m');
	console.log(
		`\x1b[32;1m\u2192\x1b[0m Local: \x1b[34;1mhttp://localhost:${PORT}/\x1b[0m`,
	);
});
