declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_APP_ENDPOINT: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    AWS_S3_REGION: string;
    AWS_S3_BUCKET: string;
    AWS_S3_ACCESS_KEY_ID: string;
    AWS_S3_SECRET_ACCESS_KEY: string;
  }
}
