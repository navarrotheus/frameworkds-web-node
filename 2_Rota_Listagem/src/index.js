const express = require('express');

const app = express();

const pets = [
  {
    nome: 'Rick',
    sexo: 'Macho',
    dataNascimento: '2020-01-01',
    tipo: 'Cachorro',
  },
  {
    nome: 'Zoe',
    sexo: 'Fêmea',
    dataNascimento: '2021-01-01',
    tipo: 'Gato',
  },
];

app.get('/pets', (request, response) => {
  return response.json(pets);
});

app.listen(3333, () => {
  console.log('Server started in port 3333');
});
