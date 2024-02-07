const express = require('express');
const mockUser = require('./mockUser');
const app = express();

const loggingMiddleWare = (req, res, next) => {
	console.log(`${req.method} -- ${req.url}`);
	next();
};
app.use(express.json());
// app.use(loggingMiddleWare);

const PORT = 3000;

app.get('/', (req, res) => {
	res.send('hello world');
});

app.get('/api/users', (req, res) => {
	const { filter, value } = req.query;

	if (filter && value)
		return res.send(
			mockUser.filter((user) => user[filter].includes(value)),
		);
	return res.send(mockUser);
});

app.post('/api/users', (req, res) => {
	let { body } = req;
	let newUser = { id: mockUser[mockUser.length - 1].id + 1, ...body };
	mockUser.push(newUser);
	console.log(newUser);
	return res.status(201).send(newUser);
});

app.get('/api/users/:id', (req, res) => {
	let parsedId = parseInt(req.params.id);
	if (isNaN(parsedId)) {
		return res.status(400).send({ msg: 'error' });
	}

	const findUser = mockUser.find((user) => user.id === parsedId);
	if (!findUser) return res.sendStatus(404);
	if (findUser) {
		res.send(findUser);
	}
});

app.put('/api/users/:id', (req, res) => {
	const {
		body,
		params: { id },
	} = req;

	const parsedID = parseInt(id);
	if (isNaN(parsedID)) return res.sendStatus(400);

	const findUserIdx = mockUser.findIndex((user) => {
		return user.id === parsedID;
	});

	if (findUserIdx === -1) return res.sendStatus(404);

	mockUser[findUserIdx] = {
		id: parsedID,
		...body,
	};

	return res.sendStatus(200);
});

app.patch('/api/users/:id', (req, res) => {
	const {
		body,
		params: { id },
	} = req;

	const parsedID = parseInt(id);
	if (isNaN(parsedID)) return res.sendStatus(400);

	const findUserIdx = mockUser.findIndex((user) => {
		return user.id === parsedID;
	});

	if (findUserIdx === -1) return res.sendStatus(404);

	mockUser[findUserIdx] = { ...mockUser[findUserIdx], ...body };

	return res.sendStatus(200);
});

app.delete('/api/users/:id', (req, res) => {
	const { id } = req.params;

	const parsedID = parseInt(id);

	if (isNaN(parsedID)) return res.sendStatus(400);

	const findUserIdx = mockUser.findIndex((user) => {
		return user.id === parsedID;
	});

	if (findUserIdx === -1) return res.sendStatus(404);

	mockUser.splice(findUserIdx, 1);

	return res.sendStatus(200);
});

app.listen(PORT, () => {
	console.log('\x1b[32;1mSuccessfully server started\x1b[0m');
	// console.log('\x1b[32;1;43mSuccessfully server started\x1b[0m');
	console.log(
		`\x1b[32;1m\u2192\x1b[0m Local: \x1b[34;1mhttp://localhost:${PORT}/\x1b[0m`,
	);
});
