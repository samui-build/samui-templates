import { getEnv } from './get-env.js';
export function getCorsOrigins(c) {
    const envOrigins = getEnv(c).ALLOWED_ORIGINS?.split(';') ?? [];
    return envOrigins.map((origin) => origin.trim()).filter((origin) => origin.length > 0);
}
