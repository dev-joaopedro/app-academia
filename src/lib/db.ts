import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in environment variables');
}

// Cria o cliente SQL do Neon
export const sql = neon(process.env.DATABASE_URL);

/**
 * Exemplo de uso:
 * const result = await sql`SELECT * FROM exercises WHERE muscle = ${muscle}`;
 */
