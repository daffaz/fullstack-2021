const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3001;

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
];

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
  return maxId + 1;
};

app.get('/', (_, res) => {
  res.send('<h1>Hello world</h1>');
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const note = req.body;
  console.log(note);

  if (!note.content) {
    return res.status(400).json({
      message: 'content missing :(',
    });
  }

  const newNote = {
    id: generateId(),
    content: note.content,
    date: new Date(),
    important: note.important || false,
  };

  notes.push(newNote);
  res.json(newNote);
});

app.get('/api/notes/:id', (req, res) => {
  const id = +req.params.id;
  const noteToReturn = notes.find((note) => note.id === id);

  if (noteToReturn) {
    res.json(noteToReturn);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);

  res.status(204).end();
});

// Listen
app.listen(PORT, () => {
  console.log(`Running in port ${PORT}`);
});
