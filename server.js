const express = require('express');
const os = require('os');
const path = require('path');

const app = express();
const port = 3001;

// Serve static files
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Endpoint to get the PC's username
app.get('/username', (req, res) => {
    res.json({ username: os.userInfo().username });
});

app.use('/image', express.static('image'));

// Endpoint to fetch mock package images
app.get('/package-status', (req, res) => {
    const status = req.query.status;
    let imagePath = 'image/default.png'; // Default image

    if (status === 'arrived') {
        imagePath = 'image/arrived.png';
    } else if (status === 'notArrived') {
        imagePath = 'image/notarrived.png';
    }

    res.json({ image: imagePath });
});

// Endpoint to fetch mock undone tasks
app.get('/undone-tasks', (req, res) => {
    res.json([
        { id: 1, task: 'Wash the dishes', importance: '0/10' },
        { id: 2, task: 'Do the homework', importance: '1/10' },
        { id: 3, task: 'Eat dinner', importance: '-10/10' }
    ]);
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'));
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
