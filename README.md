# Portfolio - Bruno Da Silva

Portfolio personnel developpe avec Next.js.

## Prerequis

- Node.js 20.9 ou superieur
- npm
- MySQL 8

## Installation

Installer les dependances :

```bash
npm install
```

Lancer le serveur de developpement :

```bash
npm run dev
```

Ouvrir ensuite :

```text
http://localhost:3000
```

## Configuration locale

Le projet utilise une base de donnees MySQL locale.

Creer la base de donnees :

```sql
CREATE DATABASE portfolio_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

Creer un utilisateur MySQL dedie :

```sql
CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;
```

Creer un fichier `.env.local` a la racine du projet en suivant l'exemple fourni dans `.env.example` :

```env
DATABASE_URL="mysql://portfolio_user:your_password@localhost:3306/portfolio_db"
```

Le fichier `.env.local` contient des informations sensibles et ne doit pas etre versionne.

## Prisma

Le projet utilise Prisma pour gerer le schema de base de donnees et generer un client TypeScript.

Le schema Prisma se trouve dans :

```text
prisma/schema.prisma
```

Le client Prisma est genere dans :

```text
src/generated/prisma
```

Generer le client Prisma :

```bash
npx prisma generate
```

Verifier le schema Prisma :

```bash
npx prisma validate
```

## Scripts utiles

```bash
npm run dev
npm run build
npm run lint
npx prettier . --check
npx prisma validate
npx prisma generate
```
