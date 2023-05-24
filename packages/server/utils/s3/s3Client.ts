import { S3Client } from '@aws-sdk/client-s3';

const REGION = 'ru-central1';
const ENDPOINT = 'https://storage.yandexcloud.net';

export const s3 = new S3Client({
  region: REGION,
  endpoint: ENDPOINT,
});
