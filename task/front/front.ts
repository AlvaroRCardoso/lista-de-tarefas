import express, { } from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname)));

app.listen(8080, function () {
    console.log(`Server FRONT started at http://localhost:8080/tarefas.html`);
});
