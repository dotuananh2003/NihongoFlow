import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ZodError } from 'zod';
import { authRouter } from '../server/src/routes/auth.js';
import { paymentsRouter } from '../server/src/routes/payments.js';

const app = express();

app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, server: 'azure-mssql-ready' });
});

app.use('/api/auth', authRouter);
app.use('/api/payments', paymentsRouter);

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Invalid request payload',
      issues: error.issues.map(issue => ({ path: issue.path.join('.'), message: issue.message })),
    });
  }

  console.error('API Error:', error);
  return res.status(500).json({
    message: error instanceof Error ? error.message : 'Internal server error',
  });
});

export default app;
