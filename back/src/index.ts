import express from 'express';
import cors from 'cors';
import itemRoutes from './routes/itemRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/items', itemRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Backend API is running' });
});

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 API endpoints available at:`);
  console.log(` GET    http://localhost:${PORT}/items`);
  console.log(` GET    http://localhost:${PORT}/items/:id`);
  console.log(` POST   http://localhost:${PORT}/items`);
  console.log(` PUT    http://localhost:${PORT}/items/:id`);
  console.log(` DELETE http://localhost:${PORT}/items/:id`);
});

export default app; 