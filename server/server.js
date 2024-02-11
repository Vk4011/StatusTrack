const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json()); 

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('\n\t MongoDB connected...!'))
    .catch(err => console.error('MongoDB connection error:', err));

const server = http.createServer(app);
const io = socketIo(server);

const scriptSchema = new mongoose.Schema({
    content: String
});

const Script = mongoose.model('Script', scriptSchema);

io.on('connection', socket => {
    console.log('A user connected');

    socket.on('fetchScript', async () => {
        try {
            const script = await Script.findOne();
            socket.emit('scriptContent', script ? script.content : '');
        } catch (err) {
            console.error('Error fetching script:', err);
        }
    });

    socket.on('updateScript', async content => {
        try {
            let script = await Script.findOne();
            if (!script) {
                script = new Script({ content });
            } else {
                script.content = content;
            }
            await script.save();
            socket.broadcast.emit('scriptContent', content);
        } catch (err) {
            console.error('Error updating script:', err);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// API endpoint to save script content to MongoDB
app.post('/saveScript', async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).send('Content is required');
        }
        let script = await Script.findOne();
        if (!script) {
            script = new Script({ content });
        } else {
            script.content = content;
        }
        await script.save();
        res.status(200).send('Script saved successfully');
    } catch (error) {
        console.error('Error saving script:', error);
        res.status(500).send('An error occurred while saving the script.');
    }
});

// API endpoint to retrieve script content from MongoDB
app.get('/getScript', async (req, res) => {
    try {
        const script = await Script.findOne();
        res.status(200).send(script ? script.content : '');
    } catch (error) {
        console.error('Error fetching script:', error);
        res.status(500).send('An error occurred while fetching the script.');
    }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`\n\t Server running on port ${PORT}`));


