const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

const routes = require('./src/routes/index');

app.use(express.json());
app.use(cookieParser());
app.use(
	session({
		secret: 'abc',
		saveUninitialized: false,
		resave: false,
		cookie: {
			maxAge: 60000 * 60,
		},
	}),
);
app.use(routes);

const PORT = 3000;

app.get('/', (req, res) => {
	// console.log(req.session.id);
	req.session.visited = true;
	res.cookie('cookieData', 'awesome', { maxAge: 10000 });
	res.send('Home Page');
});

app.listen(PORT, () => {
	console.log('\x1b[32;1mSuccessfully server started\x1b[0m');
	console.log(
		`\x1b[32;1m\u2192\x1b[0m Local: \x1b[34;1mhttp://localhost:${PORT}/\x1b[0m`,
	);
});
