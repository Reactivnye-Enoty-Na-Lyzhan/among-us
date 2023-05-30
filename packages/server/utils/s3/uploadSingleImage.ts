import { PutObjectCommand } from '@aws-sdk/client-s3';
import { randomBytes } from 'crypto';
import dotenv from 'dotenv';
import sharp from 'sharp';
import { s3 } from '../../utils/s3/s3Client';

dotenv.config({
  path: '../../../../.env',
});

const { AWS_BUCKET } = process.env;

// Загрузка одичного изображения
export const uploadSingleImage = async (
  file: Express.Multer.File
): Promise<string | Error> => {
  try {
    const compressed = await sharp(file.buffer)
      .webp({ quality: 40 })
      .toBuffer();

    const fileName = randomBytes(10).toString('hex');

    await s3.send(
      new PutObjectCommand({
        Bucket: AWS_BUCKET,
        Key: fileName,
        Body: compressed,
        ContentType: file.mimetype,
      })
    );
    return fileName;
  } catch (err: unknown) {
    return err as Error;
  }
};
