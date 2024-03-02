declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_APP_ENDPOINT: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
  }
}
