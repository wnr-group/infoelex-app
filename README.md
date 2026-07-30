# ⚡ InfoElex - Electronics & Warehouse Management Application


## ⚡ Quick Start 

```bash
# 1. Clone the repository
git clone https://github.com/infoelex/infoelex.git
cd infoelex

# 2. Install dependencies
npm install

# 3. Start Supabase (Docker required)
npm run supabase:start

# 4. Copy environment variables
cp .env.example .env.local

# 5. Update .env.local with Supabase credentials
npm run supabase:status  # Get your credentials

# 6. Start development server
npm run dev
```

**Visit:**
- 🏠 Homepage: http://localhost:3000
- 🏢 Admin Panel: http://localhost:3000/admin
- 🗄️ Supabase Studio: http://localhost:54323

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Docker Desktop**: For running Supabase locally
- **Git**: For version control

**Check your versions:**
```bash
node --version  # Should be >= 18.0.0
npm --version   # Should be >= 9.0.0
docker --version # Should be installed
```

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/infoelex/infoelex.git
cd infoelex
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js, React, TypeScript
- Supabase client libraries
- Tailwind CSS

### Step 3: Environment Setup

Create your local environment file:

```bash
cp .env.example .env.local
```

---

## 🗄️ Database Setup

### Start Supabase Locally

InfoElex uses Supabase for database and authentication. Start it locally with Docker:

```bash
npm run supabase:start
```

**Wait for it to complete** (first time takes 2-3 minutes)

### Get Your Credentials

Once started, get your local Supabase credentials:

```bash
npm run supabase:status
```

You'll see output like:
```
API URL: http://127.0.0.1:54321
Anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Service role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Update .env.local

Open `.env.local` and update these values:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<paste-your-anon-key-here>
SUPABASE_SERVICE_ROLE_KEY=<paste-your-service-role-key-here>
```

---

## 💻 Development

### Start Development Server

```bash
npm run dev
```

The app will be available at:
- **Frontend**: http://localhost:3000
- **Admin Portal**: http://localhost:3000/admin
- **Admin Panel**: http://localhost:3000/admin/dashboard
- **Supabase Studio**: http://localhost:54323

### Available Scripts

```bash
# Development
npm run dev              # Start Next.js dev server with Turbopack
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint

# Supabase Commands
npm run supabase:start   # Start Supabase (Docker required)
npm run supabase:stop    # Stop Supabase containers
npm run supabase:status  # View credentials and status
npm run supabase:reset   # Reset database (⚠️ destructive!)

# Database Migrations (when you create them)
npm run supabase:migration:new <name>  # Create new migration
npm run supabase:migration:up          # Apply migrations
```

