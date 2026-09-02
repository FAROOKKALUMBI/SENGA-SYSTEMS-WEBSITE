# Production setup

Set `CORS_ORIGIN` to the public website origin and run behind HTTPS. Staff user records require a `passwordHash` formatted as `salt:hex-scrypt-key`; plaintext passwords must never be stored in `data.json` or source control. Run `npm run password:hash -- "a-strong-password"` to generate a value, then add it directly to the correct staff record in a private development database. The included JSON datastore is for development only—use a managed database and backups in production.
