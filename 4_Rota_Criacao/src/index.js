const express = require('express');

const app = express();

app.use(express.json());

const pets = [];

let idCount = 0;

app.get('/pets', (request, response) => {
  return response.json(pets);
});

app.post('/pets', (request, response) => {
  const { nome, sexo, dataNascimento, tipo  } = request.body;

  const petAlreadyExists = pets.some(pet => pet.nome === nome);

  if (petAlreadyExists) {
    return response.status(400).json({ error: 'Pet already exists!' });
  }

  idCount += 1;
  
  const pet = {
    id: idCount,
    nome,
    sexo,
    dataNascimento,
    tipo,
  };

  pets.push(pet);

  return response.status(201).json(pet);
});

app.listen(3333, () => {
  console.log('Server started in port 3333');
});
