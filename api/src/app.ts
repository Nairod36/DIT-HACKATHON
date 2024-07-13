import express from 'express';
import verificationRoutes from './routes/verification.route';

const app = express();

app.use(express.json());
app.use('/api', verificationRoutes());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
