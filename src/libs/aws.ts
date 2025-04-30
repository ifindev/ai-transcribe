import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
    region: process.env.R2_REGION,
    endpoint: process.env.R2_S3_API_URL,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

interface UploadFileArgs {
    key: string;
    folder: string;
    body: File | Uint8Array;
}

export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB for audio
const ALLOWED_AUDIO_TYPES = [
    'audio/wav',
    'audio/mpeg',
    'audio/mp3',
    'audio/webm',
    'audio/ogg',
    'audio/x-wav',
    'audio/x-m4a',
    'audio/mp4',
];

export async function uploadFile(args: UploadFileArgs) {
    try {
        if (!(args.body instanceof File)) {
            return { success: false, error: new Error('Only File objects are supported') };
        }

        // Validate file type
        if (!ALLOWED_AUDIO_TYPES.includes(args.body.type)) {
            return {
                success: false,
                error: new Error('Only audio files are allowed (wav, mp3, webm, ogg, m4a, mp4)'),
            };
        }

        // Validate file size
        if (args.body.size > MAX_FILE_SIZE) {
            return {
                success: false,
                error: new Error('Audio file size must be less than 20MB'),
            };
        }

        const buffer = Buffer.from(await args.body.arrayBuffer());
        const contentType = args.body.type;

        const data = await s3Client.send(
            new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: `${args.folder}/${args.key}`,
                ContentType: contentType,
                Body: buffer,
            }),
        );

        return { success: true, data };
    } catch (error) {
        return { success: false, error };
    }
}
