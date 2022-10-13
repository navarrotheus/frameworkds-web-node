const express = require('express');

const app = express();

app.use(express.json());

const seminarios = [];

let idCount = 0;

app.get('/seminarios', (request, response) => {
  const { titulo, aluno, data } = request.query;

  let filteredSeminarios = seminarios;

  if (titulo) {
    filteredSeminarios = filteredSeminarios.filter(seminario => seminario.titulo === titulo);
  }

  if (aluno) {
    filteredSeminarios = filteredSeminarios.filter(seminario => seminario.aluno === aluno);
  }

  if (data) {
    filteredSeminarios = filteredSeminarios.filter(seminario => seminario.data === data);
  }

  return response.json(seminarios);
});

app.post('/seminarios', (request, response) => {
  const { titulo, descricao, aluno, data  } = request.body;

  const seminarioAlreadyExists = seminarios.some(seminario => seminario.titulo === titulo);

  if (seminarioAlreadyExists) {
    return response.status(400).json({ error: 'Seminario already exists!' });
  }

  const seminarioAtSameDate = seminarios.some(seminario => seminario.data === data);

  if (seminarioAtSameDate) {
    return response.status(400).json({ error: 'Busy day!' });
  }

  idCount += 1;
  
  const seminario = {
    id: idCount,
    titulo,
    descricao,
    aluno,
    data,
  };

  seminarios.push(seminario);

  return response.status(201).json(seminario);
});

app.put('/seminarios/:id', (request, response) => {
  const { body, params } = request;
  const id = Number(params.id);
  const { titulo, descricao, aluno, data } = body;

  const seminarioIndex = seminarios.findIndex(seminario => seminario.id === id);

  if (seminarioIndex === -1) {
    return response.status(404).json({ error: 'Seminario not found!' });
  }

  const seminarioWithSameTitulo = seminarios.find(seminario => seminario.titulo === titulo);

  if (seminarioWithSameTitulo && seminarioWithSameTitulo.id !== id) {
    return response.status(400).json({ error: 'Seminario already exists!' });
  }

  const seminarioWithSameDate = seminarios.find(seminario => seminario.data === data);

  if (seminarioWithSameDate && seminarioWithSameTitulo.id !== id) {
    return response.status(400).json({ error: 'Busy day!' });
  }

  seminarios[seminarioIndex] = {
    id,
    titulo,
    descricao,
    aluno,
    data,
  };

  return response.json(seminarios[seminarioIndex]);
});

app.delete('/seminarios/:id', (request, response) => {
  const id = Number(request.params.id);

  const seminarioIndex = seminarios.findIndex(seminario => seminario.id === id);

  if (seminarioIndex === -1) {
    return response.status(404).json({ error: 'Seminario not found!' });
  }

  seminarios.splice(seminarioIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () => {
  console.log('Server started in port 3333');
});
