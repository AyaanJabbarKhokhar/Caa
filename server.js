const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.json());

app.post('/submit', (req, res) => {
  const { domain } = req.body;
  if (domain) {
    const logEntry = `[${new Date().toISOString()}] ${domain}\n`;
    fs.appendFileSync('submissions.log', logEntry);
    res.send('Domain received and logged.');
  } else {
    res.status(400).send('Invalid request');
  }
});

app.get('/view', (req, res) => {
  const logPath = path.join(__dirname, 'submissions.log');
  if (fs.existsSync(logPath)) {
    res.send('<pre>' + fs.readFileSync(logPath, 'utf-8') + '</pre>');
  } else {
    res.send('No submissions yet.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
