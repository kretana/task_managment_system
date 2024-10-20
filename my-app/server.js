const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get("/tasks", (req, res) => {
    const db = router.db;
    const {  createdAt, completedAt } = req.query;

    let tasks = db.get("tasks");

    if (createdAt) {
        tasks = tasks.filter((task) => {
            const createdDate = new Date(task.createdAt);
            return createdDate >= new Date(createdAt);
        });
    }

    if (completedAt) {
        tasks = tasks.filter((task) => {
            const completedDate = new Date(task.completedAt);
            return completedDate <= new Date(completedAt);
        });
    }

    res.jsonp(tasks.value());
});

server.use(router);

server.listen(3000, () => {
    console.log("JSON Server is running on http://localhost:3000");
});