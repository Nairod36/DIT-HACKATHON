"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware pour parser les requêtes JSON
app.use(express_1.default.json());
// Route de base
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
// Exemple de route GET
app.get('/api/example', (req, res) => {
    res.json({ message: 'This is an example endpoint' });
});
// Exemple de route POST
app.post('/api/example', (req, res) => {
    const data = req.body;
    res.json({ message: 'Data received', data });
});
// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
