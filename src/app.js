import express from "express";

const app = express();
// Middleware: toda requisição será convertida para o formato json
app.use(express.json());

const users = [
	{
		id: 1,
		nome: "João da Silva",
	},
	{
		id: 2,
		nome: "Maria Alice",
	},
];

function findIndexOfUserBy(id) {
    return users.findIndex(user => user.id === id);
}

app.get("/", (req, res) => {
	res.status(200).send("Curso de Node.js");
});

app.get("/users", (req, res) => {
	res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
    let indexOf = findIndexOfUserBy(Number(req.params.id));
    if (indexOf >= 0) {
        res.status(200).json(users[indexOf]);
    } else {
        res.status(404).send("Usuário não encontrado!");
    }
});

app.post("/users", (req, res) => {
	// Adiciona o usuário no array
	users.push(req.body);
	// Devolver a resposta para o cliente
	res.status(201).send("Usuário inserido com sucesso!");
});

app.put("/users/:id", (req, res) => {
	let id = Number(req.params.id);

	let indexOf = users.findIndex((user) => user.id === id);
	if (indexOf >= 0) {
		users[indexOf] = req.body;
		res.status(200).send("Usuário atualizado com sucesso!");
	} else {
		res.send(404).send("Usuário não encontrado!");
	}
});

app.delete("/users/:id", (req, res) => {
    let indexOf = findIndexOfUserBy(Number(req.params.id));
    users.splice(indexOf, 1);
    res.status(204).end();
});

export default app;
