const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');

server.use(middlewares);
server.use(bodyParser.json());

server.get('/api/login', (req, res) => {
    const { username, password } = req.body;
    const users = router.db.get('users').value();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        return res.status(200).json({
            user: {
                id: user.id,
                name: user.username,
                role: user.role
            },
            token: 'mock-token-' + user.id
        });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running');
});
