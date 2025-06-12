import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Set the environment here: 'qa' or 'dev'
const ENV: 'qa' | 'dev' = 'dev'; // <-- Change this value to 'dev' for DEV environment

const envFile = ENV === 'qa' ? 'qa.env' : 'dev.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

if (!process.env.BASE_URL) {
  throw new Error(`BASE_URL is not defined in ${envFile}`);
}

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: process.env.BASE_URL,
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [['list'], ['html']],
  timeout: 30000,
}); 