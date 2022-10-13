const express = require('express');

const app = express();

app.use(express.json());

const pets = [];

app.get('/pets/:id', (request, response) => {
  const { body, query, params } = request;
  console.log('body: ', body);
  console.log('query: ', query);
  console.log('params: ', params);

  return response.json(pets);
});

app.listen(3333, () => {
  console.log('Server started in port 3333');
});
