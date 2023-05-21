import { DeleteObjectCommand, PutObjectCommandOutput } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { s3 } from '../../utils/s3/s3Client';

dotenv.config({
  path: '../../../../.env',
});

const { AWS_BUCKET } = process.env;

// Удаление одичного изображения
export const deleteExistingImage = async (
  key: string,
): Promise<PutObjectCommandOutput | Error> => {
  try {
    const result = await s3.send(
      new DeleteObjectCommand({
        Bucket: AWS_BUCKET,
        Key: key,
      }),
    );

    return result;
  } catch (err: unknown) {
    console.log(err);
    return err as Error;
  }
};
