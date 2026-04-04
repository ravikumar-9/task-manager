import express from 'express';
import cors from 'cors';
import cookeParser from 'cookie-parser';
import authRoutes from './modules/auth/auth.routes';
import tasksRoutes from './modules/tasks/tasks.routes';

const app = express();
app.use(express.json());
app.use(cors({origin: 'http://localhost:3000',credentials: true}));
app.use(cookeParser());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);

export default app;