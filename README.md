# stav-vozidla

Studentsky projekt TIS 2021

### Installation

1. Install NPM packages
   ```sh
   npm install
   ```
2. Enter your database in `config/config.json` like :
   ```js
   {
   "development": {
    "username": "yourDBusername",
    "password": "yourDBpassword",
    "database": "yourDBname",
    "host": "yourDBhost(127.0.0.1)",
    "dialect": "yourDBdialect"
   },
   "APP_URL": "http://domainOfApp",
    "EMAIL_NAME": "emailNameForImportAndExport",
    "EMAIL_PASSWORD": "emailPasswordForImportAndExport"
   }
   ```
3. Run project

```sh
   npm run dev
```

3. Seed Admin

```sh
   npx sequelize db:seed:all
```

For tests use Postmen or testy.rest (install rest VSC extension)
