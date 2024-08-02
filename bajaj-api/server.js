const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Enable CORS
app.use(express.json());

const userId = "john_doe_17091999";
const email = "john@xyz.com";
const rollNumber = "ABCD123";

// POST method endpoint
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, user_id: userId });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));

    // Sorting the alphabets to get the highest alphabet
    alphabets.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    const highestAlphabet = alphabets.length ? [alphabets[alphabets.length - 1]] : [];

    res.json({
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: highestAlphabet
    });
});

// GET method endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
