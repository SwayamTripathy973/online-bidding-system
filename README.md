# ITIS 4166/5166: Final Project

For full assignment description, rubric details, and grading criteria, please refer to the assignment page on **Canvas**.

---

## ⚠️ Important Dependency & Environment Rules

- **Do NOT install additional npm packages:** The autograder environment runs strictly with the dependencies provided in `package.json`. Additional packages installed locally will not be available in the grading environment and will break your build.
- **Do NOT modify dependency versions:** Keep all existing version tags (especially `prisma` and `@prisma/client`) unchanged to ensure your submission executes predictably during grading.

---

## Local Development Setup

Follow these steps to set up and run the project locally on your machine:

### 1. Repository Setup & Dependencies

```bash
# Clone your private repository and navigate into the project directory
git clone <your-repository-url>
cd <repository-folder-name>

# Install required dependencies
npm install
```

### 2. Environment & Database Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Update `.env` with your local PostgreSQL credentials and database URL:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/autograder_db?schema=public"
   ```

### 3. Database Schema & Prisma Setup

1. Define or update your database models in `prisma/schema.prisma`.
2. Create and apply your migration to your local database:

   ```bash
   npx prisma migrate dev --name init
   ```

3. Generate the updated Prisma Client:

   ```bash
   npx prisma generate
   ```

### 4. Start the Local Development Server

```bash
npm run dev
```
