import { env } from 'hono/adapter';
export function getEnv(c) {
    return env(c);
}
