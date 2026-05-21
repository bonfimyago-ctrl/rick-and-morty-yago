const express = require('express');
const http = require('http');
const patch = require('path');


const app = express();
const URL_API = 'https://rickmortyapi.com/api/character';

app.use(express.static(patch.join(__dirname, 'public')));
function buscarPersonagens(callback) {
 https.get(URL_API, (resposta) => {
    let dados = '';
    resposta.on('data', parte => { dados += parte });
    resposta.on('end', () => {
        const personagens = JSON.parse(dados).results;
        callback(personagens);
     });
 });                                                  
}

app.get('/personagens', (req, res) => {
    buscarPersonagens((personagens) => {
        res.json(personagens);
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
