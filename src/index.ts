import express from 'express';
import './db/mongoose.js';
import { noteRouter } from './routers/note.js';
import { defaultRouter } from './routers/default.js';
import { userRouter } from './routers/user.js';
import { cardRouter } from './routers/card.js';

/// Si no te funciona el comando para que funcione el servidor de mongoose es el siguiente
/// sudo /home/usuario/mongodb/bin/mongod --dbpath /home/usuario/mongodb-data/ 

/// Declarar App
export const app = express();
app.use(express.json());
app.use(noteRouter);
app.use(userRouter);
app.use(cardRouter);
app.use(defaultRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});