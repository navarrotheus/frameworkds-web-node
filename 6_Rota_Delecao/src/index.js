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

app.put('/pets/:id', (request, response) => {
  const { body, params } = request;
  const id = Number(params.id);
  const { nome, sexo, dataNascimento, tipo } = body;

  const petIndex = pets.findIndex(pet => pet.id === id);

  if (petIndex === -1) {
    return response.status(404).json({ error: 'Pet not found!' });
  }

  const petThatAlreadyExists = pets.find(pet => pet.nome === nome);

  if (petThatAlreadyExists && petThatAlreadyExists.id !== id) {
    return response.status(400).json({ error: 'Pet already exists.' });
  }

  pets[petIndex] = {
    id,
    nome,
    sexo,
    dataNascimento,
    tipo,
  };

  return response.json(pets[petIndex]);
});

app.delete('/pets/:id', (request, response) => {
  const id = Number(request.params.id);

  const petIndex = pets.findIndex(pet => pet.id === id);

  if (petIndex === -1) {
    return response.status(404).json({ error: 'Pet not found!' });
  }

  pets.splice(petIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () => {
  console.log('Server started in port 3333');
});
