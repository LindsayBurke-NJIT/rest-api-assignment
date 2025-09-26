const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
const { v4: uuidv4 } = require('uuid');
const userList = [];

app.post('/users', (req, res) => {
    const {name, email} = req.body;
    if (!name || !email){
        res.status(400).json({error: 'Name and email are required.'});
    }
    else{
        const id = uuidv4();
        const user = {id, name, email};
        userList.push(user);
        res.status(201).json(user);
    }
})
// If necessary to add imports, please do so in the section above

app.get('/users/:id', (req, res) => {
    const userID = req.params.id;
    const currUser = userList.find(u => u.id === userID)
    if (!currUser){
        res.status(404).json({error: ''});
    }
    else{
        res.status(200).json(currUser);
    }
});

app.put('/users/:id', (req, res) => {
    const user = userList.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'Could not find specified user.' });
    }
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }
    user.name = name;
    user.email = email;
    res.status(200).json(user);
});

app.delete('/users/:id', (req, res) => {
    const index = userList.findIndex(u => u.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({error: 'Could not find specified user.'});
    }
    userList.splice(index, 1);
    res.status(204).send();
});
// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing