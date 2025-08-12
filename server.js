const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const dataPath = path.join(__dirname, 'data', 'tournaments.json');

app.use(express.json());
app.use(express.static('public'));

// Helper to read data
const readData = () => {
  try {
    const json = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(json);
  } catch (err) {
    return [];
  }
};

// Helper to write data
const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET all tournaments
app.get('/api/tournaments', (req, res) => {
  const tournaments = readData();
  res.json(tournaments);
});

// POST new tournament
app.post('/api/tournaments', (req, res) => {
  const tournaments = readData();
  const newTournament = {
    id: Date.now().toString(),
    ...req.body,
  };
  tournaments.push(newTournament);
  writeData(tournaments);
  res.status(201).json(newTournament);
});

// PUT update tournament
app.put('/api/tournaments/:id', (req, res) => {
  let tournaments = readData();
  const index = tournaments.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  tournaments[index] = { ...tournaments[index], ...req.body };
  writeData(tournaments);
  res.json(tournaments[index]);
});

// DELETE a tournament
app.delete('/api/tournaments/:id', (req, res) => {
  let tournaments = readData();
  tournaments = tournaments.filter(t => t.id !== req.params.id);
  writeData(tournaments);
  res.json({ message: 'Deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.post('/api/tournaments', (req, res) => {
  const tournaments = readData();
  const newTournament = {
    id: Date.now().toString(),
    ...req.body,
  };
  tournaments.push(newTournament);
  writeData(tournaments);
  res.status(201).json(newTournament);
});

app.put('/api/tournaments/:id', (req, res) => {
  const tournaments = readData();
  const index = tournaments.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Tournament not found' });
  }

  tournaments[index] = { id: req.params.id, ...req.body };
  writeData(tournaments);
  res.json(tournaments[index]);
});
