const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get("/tasks", (req, res) => {
    const db = router.db;
    const { createdAt, completedAt, searchTerm, nameFilter, statusFilter } = req.query;

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

    if (searchTerm) {
        const lowerCaseTerm = searchTerm.toLowerCase();

        tasks = tasks.filter((task) => {
            const matchesName = task.name.toLowerCase().includes(lowerCaseTerm);
            const matchesTitle = task.title.toLowerCase().includes(lowerCaseTerm);
            const matchesDescription = task.description.toLowerCase().includes(lowerCaseTerm);
            const matchesStatus = task.status.toLowerCase().includes(lowerCaseTerm);

            return matchesName || matchesTitle || matchesDescription || matchesStatus;
        });
    }

    if (nameFilter) {
        const nameVal = nameFilter.toLowerCase();
        tasks = tasks.filter((task) =>
            task.name.toLowerCase().includes(nameVal)
        );
    }

    if (statusFilter) {
        const statusVal = statusFilter.toLowerCase();
        tasks = tasks.filter((task) =>
            task.status.toLowerCase().includes(statusVal)
        );
    }

    res.jsonp(tasks.value());
});

server.use(router);

server.listen(3000, () => {
    console.log("JSON Server is running on http://localhost:3000");
});