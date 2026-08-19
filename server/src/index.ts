import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ZodError } from 'zod';
import { env } from './env.js';
import { authRouter } from './routes/auth.js';
import { paymentsRouter } from './routes/payments.js';
import { ensureAuthSchema } from './schema.js';

const app = express();

app.use(cors({
  origin: env.clientUrl,
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
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

  console.error(error);
  return res.status(500).json({
    message: env.nodeEnv === 'production' ? 'Internal server error' : error instanceof Error ? error.message : 'Unknown error',
  });
});

await ensureAuthSchema();

app.listen(env.port, () => {
  console.log(`Auth API listening on http://localhost:${env.port}`);
});
