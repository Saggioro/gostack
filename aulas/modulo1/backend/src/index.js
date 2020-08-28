const express = require('express');
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());


function logRequest(request, response, next){

    const {method, url} = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;
    
    return next;

}

app.use(logRequest);


app.get('/projects', (request, response) =>{
    const query = request.query;
    return response.json({message: 'hell world'});
});

app.post('/projects', (request, response) =>{
    const body = request.body;
});

app.put('/projects/:id', (request, response) =>{
    const body = request.body;
    const params = request.params;
});

app.delete('/projects/:id', (request, response) =>{

});

app.listen(3333, () =>{
    console.log('⚡Servidor iniciado!')
});
