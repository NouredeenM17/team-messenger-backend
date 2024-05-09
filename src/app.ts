import express, { Express } from 'express'; 
import { loginRoute } from './routes/loginRoute';
import { usersRoute } from './routes/usersRoute';
import { roomsRoute } from './routes/roomsRoute';

export const app: Express = express();

app.use(express.json());
app.use('/api/login', loginRoute);
app.use('/api/users', usersRoute);
app.use('/api/rooms', roomsRoute);

