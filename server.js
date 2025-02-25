const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para processar JSON
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname)));

// Rota para carregar assentos vendidos
app.get('/assentos.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'assentos.json'));
});

// Rota para salvar assentos vendidos
app.post('/assentos.json', (req, res) => {
    const soldSeats = req.body.soldSeats;
    fs.writeFileSync(path.join(__dirname, 'assentos.json'), JSON.stringify({ soldSeats }, null, 2));
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});