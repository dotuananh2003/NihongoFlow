import { PayOS } from '@payos/node';
import { env } from './env.js';

let payos: PayOS | null = null;

export const isPayOSConfigured = () =>
  Boolean(env.payment.payosClientId && env.payment.payosApiKey && env.payment.payosChecksumKey);

export const getPayOS = () => {
  if (!isPayOSConfigured()) {
    return null;
  }

  payos ??= new PayOS({
    clientId: env.payment.payosClientId,
    apiKey: env.payment.payosApiKey,
    checksumKey: env.payment.payosChecksumKey,
  });

  return payos;
};
