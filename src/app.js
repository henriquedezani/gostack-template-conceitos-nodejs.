const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const  {title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { url, title, techs } = request.body;
  const { id } = request.params;

  const index = repositories.findIndex(r => r.id === id);

  if(index < 0)
    return response.status(400).send();

  const repository = repositories[index];
  repository.url = url;
  repository.title = title;
  repository.techs = techs;

  repositories[index] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {

  const id = request.params.id;

  const index = repositories.findIndex(r => r.id === id);

  if(index >= 0) {
    repositories.splice(index, 1);
    return response.status(204).send();
  }

  return response.status(400).send();
});

app.post("/repositories/:id/like", (request, response) => {
  
  const id = request.params.id;

  var index = repositories.findIndex(r => r.id == id);

  if(index >= 0)
  {
    repositories[index].likes++;
    return response.json(repositories[index]);
  }

  return response.status(400).send();
  
});

module.exports = app;
