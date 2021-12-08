const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3031;

app.use(express.json());

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.post('*', morgan('":method :url HTTP/:http-version" :status [:date[iso]]'));

app.get('/info', (_, res) => {
  res.send(
    `<p>
      Phonebook has info for ${persons.length}
     </p>
    <p>
      ${new Date()}
    </p>`
  );
});

app.get('/api/persons', (_, res) => {
  res.json(persons);
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!(body.name && body.number)) {
    return res.status(400).json({
      status: 'error',
      message: "name or number can't be blank",
    });
  }

  const checkDuplicatePerson = persons.find(
    (person) => person.name === body.name
  );
  if (checkDuplicatePerson) {
    return res.status(400).json({
      status: 'error',
      message: `'${body.name}' already exists in phonebook`,
    });
  }
  const newPerson = {
    id: persons.length + 1,
    name: body.name,
    number: body.number,
  };

  persons.push(newPerson);
  res.status(201).json({
    ...newPerson,
    status: 'success',
    message: `${newPerson.name} data created`,
  });
});

app.get('/api/persons/:id', (req, res) => {
  const id = +req.params.id;
  const personFound = persons.find((person) => person.id === id);

  if (personFound) {
    res.json(personFound);
  } else {
    res.status(404).json({
      status: 'error',
      message: `person with id ${id} not found`,
    });
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = +req.params.id;
  const newPersons = persons.filter((person) => person.id !== id);
  persons = newPersons;

  res.json({
    status: 'success',
    message: `successfully deleted person with id ${id}`,
  });
});

app.listen(PORT, () => {
  console.log(`Running in port ${PORT}`);
});
