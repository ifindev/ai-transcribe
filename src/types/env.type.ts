// NOTES: We don't need these eslint rules for now
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-namespace */
import { z } from 'zod';

// #region ENV CONFIG SCHEMA
export const envSchema = z.object({
    APP_URL: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    OPENAI_API_KEY: z.string().min(1),
    R2_REGION: z.string().min(1),
    R2_BUCKET_NAME: z.string().min(1),
    R2_PUBLIC_URL: z.string().min(1),
    R2_S3_API_URL: z.string().min(1),
    R2_ACCESS_KEY_ID: z.string().min(1),
    R2_SECRET_ACCESS_KEY: z.string().min(1),
});
// #endregion

// #region LOAD ENV CONFIG AS SINGLETON
const envParse = envSchema.safeParse({
    APP_URL: process.env.APP_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    R2_REGION: process.env.R2_REGION,
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
    R2_PUBLIC_URL: process.env.R2_PUBLIC_URL,
    R2_S3_API_URL: process.env.R2_S3_API_URL,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
});
// #endregion

// #region CHECK ENV
if (!envParse.success) {
    throw new Error('Error ENV Validation');
}
// #endregion

// #region EXTENDS ENV SCHEMA TO GLOBAL PROCESS ENV
type TENV = z.infer<typeof envSchema>;
declare global {
    namespace NodeJS {
        interface ProcessEnv extends TENV {}
    }
}
// #endregion
