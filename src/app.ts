import express, { Express } from 'express'; 
import { loginRoute } from './routes/loginRoute';
import { usersRoute } from './routes/usersRoute';
import { timestampRoute } from './routes/timestampRoute';

export const app: Express = express();

app.use(express.json());
app.use('/api/login', loginRoute);
app.use('/api/users', usersRoute);
app.use('/api/timestamp', timestampRoute);

