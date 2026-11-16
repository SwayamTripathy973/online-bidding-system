import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import categoryRoutes from './routes/category.routes.js';
// for testing purposes, we can import the auth middleware here

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
// mount the auth routes under /api/auth
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(err.stack);
  }
  if (!err.status) {
    err.status = 500;
    err.message = 'Internal Server Error';
  }
  const errors = err.errors ?? [err.message];
  res.status(err.status).json({ errors });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;

