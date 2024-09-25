# ReadwiseAI - Daily Reading Content Generator

ReadwiseAI is a backend application built with **Next.js** that leverages **OpenAI's GPT-3/4** to generate daily reading content in multiple languages at two language levels: **B2** and **C2**. It automatically generates texts on different topics, stores them in a **PostgreSQL** database, and ensures that all users receive the same content each day without incurring additional costs from OpenAI.

## Features

- **Daily Content Generation**: Generates reading content in two levels (B2 and C2) for various topics such as sports, politics, technology news, and more.
- **Multilingual Support**: Generate content in different languages based on user preference.
- **Efficient Resource Management**: All texts are generated once daily and stored in a database to prevent repeated API calls to OpenAI.
- **PostgreSQL Database with Prisma**: Store the generated content and topics for easy retrieval.

## Topics

The current list of topics for daily content generation includes:

- Sports
- Politics
- Technology News
- Economy
- Culture and Entertainment
- Health and Wellness
- Environment
- Science
- Travel and Tourism

## Tech Stack

- **Next.js**: Used for backend API and content generation.
- **OpenAI API**: To generate the daily reading content.
- **PostgreSQL**: Database to store the daily content and topics.
- **Prisma ORM**: To interact with PostgreSQL.
- **Docker**: For local database setup with PostgreSQL.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**
- **Docker** (for running PostgreSQL)
- **Prisma CLI**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/antoniosaleme/ReadwiseAI.git
   cd ReadwiseAI
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables. Create a `.env` file in the root directory and add your OpenAI API key and PostgreSQL credentials:

   ```bash
   OPENAI_API_KEY=your-openai-api-key
   DATABASE_URL=postgresql://postgres:<DB_PASSWORD>@localhost:5432/<DB_NAME>?schema=public
   ```

4. Start PostgreSQL using Docker:

   ```bash
   docker-compose up -d
   ```

5. Initialize Prisma and run migrations:

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

### API Endpoints

- **/api/generate** (POST): Triggers the daily generation of reading content based on the predefined topics and stores them in the database.

### Database Schema

- **GeneratedText**: Stores the generated content for each topic, language, and date.
- **Topic**: Stores the list of topics available for content generation.

## Docker Setup

If you're using Docker for PostgreSQL, the setup is already provided in the `docker-compose.yml` file.

```yaml
version: '3'
services:
  db:
    image: postgres:14.3
    restart: always
    ports:
      - '5432:5432'
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    container_name: ReadwiseAI
    volumes:
      - ./postgres:/var/lib/postgresql/data
```

Run the following command to start the Docker container for PostgreSQL:

```bash
docker-compose up -d
```

## Running Migrations

After configuring the database, apply the Prisma migrations:

```bash
npx prisma migrate dev --name init
```

## Cron Job for Daily Content Generation

To automate the daily content generation, you can set up a cron job using Node.js. Here's an example using `node-cron`:

```javascript
import cron from 'node-cron';
import generateDailyContent from './path/to/generateContent';

// Run at midnight every day
cron.schedule('0 0 * * *', () => {
  generateDailyContent();
});
```

## License

This project is licensed under the MIT License.
# ReadwiseAI-24
