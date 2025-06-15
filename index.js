require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Groq } = require('groq-sdk'); // pastikan groq-sdk sudah terinstall

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});


app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'Kamu adalah asisten kreatif caption yang membantu menulis ulang caption dengan kalimat yang panjang, lebih menarik, ekspresif, dan sangat persuasif.' },
        { role: 'user', content: userMessage }
      ],
      model: 'llama-3.3-70b-versatile'
    });

    const reply = chatCompletion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
console.error('Terjadi kesalahan:', error.response?.data || error.message || error);
    res.status(500).json({ error: 'Gagal memproses permintaan' });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
