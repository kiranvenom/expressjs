const Router = require('express');
const mockUser = require('../mockUser');

const router = Router();

router.get('/api/users', (req, res) => {
	const { filter, value } = req.query;

	if (filter && value)
		return res.send(
			mockUser.filter((user) => user[filter].includes(value)),
		);
	return res.send(mockUser);
});

router.get('/api/users/:id', (req, res) => {
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

router.post('/api/users', (req, res) => {
	let { body } = req;
	let newUser = { id: mockUser[mockUser.length - 1].id + 1, ...body };
	mockUser.push(newUser);
	console.log(newUser);
	return res.status(201).send(newUser);
});

router.put('/api/users/:id', (req, res) => {
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

router.patch('/api/users/:id', (req, res) => {
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

router.delete('/api/users/:id', (req, res) => {
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

module.exports = router;
