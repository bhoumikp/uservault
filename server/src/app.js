import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(cors({
	origin: [process.env.CLIENT_URL, "http://192.168.0.114:3000"],
	credentials: true
}));

app.use(express.json());
app.use(cookieParser())

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

export default app;