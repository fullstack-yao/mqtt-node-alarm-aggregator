import * as dotenv from 'dotenv';
dotenv.config();

export const BROKER_URL = process.env.BROKER_URL || 'mqtt://127.0.0.1';
export const FAILED_MESSAGE = '0';
export const NORMAL_MESSAGE = '1';
