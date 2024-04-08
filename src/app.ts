import express, { Express } from 'express'; 
import { loginRoute } from './routes/loginRoute';
import { usersRoute } from './routes/usersRoute';

export const app: Express = express();

app.use(express.json());
app.use('/api/login', loginRoute);
app.use('/api/users', usersRoute);

