import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Route de base
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

// Exemple de route GET
app.get('/api/example', (req: Request, res: Response) => {
  res.json({ message: 'This is an example endpoint' });
});

// Exemple de route POST
app.post('/api/example', (req: Request, res: Response) => {
  const data = req.body;
  res.json({ message: 'Data received', data });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
