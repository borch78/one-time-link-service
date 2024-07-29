import Postgrator from "postgrator";
import pg from "pg";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
    const client = new pg.Client({
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        database: process.env.PG_DATABASE,
        user: process.env.PG_USERNAME,
        password: process.env.PG_PASSWORD,
    });

    try {
        await client.connect();

        console.log(path.join(__dirname, 'migrations'))
        const postgrator = new Postgrator({
            migrationDir: path.join(__dirname, 'migrations'),
            driver: 'pg',
            username: process.env.PG_USERNAME,
            password: process.env.PG_PASSWORD,
            host: process.env.PG_HOST,
            port: process.env.PG_PORT,
            database: process.env.PG_DATABASE,
            schemaTable: 'public.migrations',
            // execQuery: (query) => client.query(query),
        });

        postgrator.on("validation-started", (migration) => console.log(migration));
        postgrator.on("validation-finished", (migration) => console.log(migration));
        postgrator.on("migration-started", (migration) => console.log(migration));
        postgrator.on("migration-finished", (migration) => console.log(migration));

        // Or migrate to max version (optionally can provide 'max')
        await postgrator.migrate();
    } catch (error) {
        // If error happened partially through migrations,
        // error object is decorated with appliedMigrations
        console.error(error?.appliedMigrations); // array of migration objects
    }

    // Once done migrating, close your connection.
    await client.end();
}
main();