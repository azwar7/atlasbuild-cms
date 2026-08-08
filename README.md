# AtlasBuild CMS — Enterprise Construction Management Platform

![Next.js 16](https://img.shields.io/badge/Next.js-15%2F16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![AI Providers](https://img.shields.io/badge/AI-OpenAI%20%7C%20Gemini%20%7C%20Hugging%20Face-purple?style=for-the-badge&logo=openai)
![Prisma](https://img.shields.io/badge/Prisma-7.0-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon_Cloud-336791?style=for-the-badge&logo=postgresql)
![Cloudflare R2](https://img.shields.io/badge/Cloudflare-R2_Storage-F38020?style=for-the-badge&logo=cloudflare)
![Vercel](https://img.shields.io/badge/Vercel-Production_Deploy-000000?style=for-the-badge&logo=vercel)
![WCAG 2.1 AA](https://img.shields.io/badge/Accessibility-WCAG_2.1_AA-success?style=for-the-badge)

**AtlasBuild CMS** is an enterprise-grade civil infrastructure and construction management platform designed for general contractors, site engineers, and executive client stakeholders. Built on Next.js 16, TypeScript, Prisma, and PostgreSQL, the platform delivers a high-contrast **"Obsidian Flux"** glassmorphic interface, real-time schedule tracking, secure blueprint document distribution, and an **AI-Powered RFP Technical Scope & Lead Risk Scoring Analyzer**.

---

## 🎯 Purpose & Problem Statement

Civil engineering projects—such as high-density commercial towers, structural bridges, and logistics hubs—require real-time transparency between field engineers and executive clients. Traditional tools suffer from fragmented communication, bloated PDF distribution, manual proposal evaluation bottlenecks, and high file egress fees.

**AtlasBuild CMS** solves this by providing:
1. **AI RFP Technical Scope & Lead Risk Scoring Analyzer**: Instant multi-provider AI evaluation of client RFPs extracting key scope requirements, project complexity ratings, lead quality scores (0-100), missing scope callouts, and risk indicators.
2. **Multi-Provider AI Infrastructure**: Unified abstraction layer supporting **OpenAI**, **Google Gemini** (`@google/genai`), and **Hugging Face Inference Providers** with zero client-side credential exposure and automatic fallback safety nets.
3. **Executive Client Portals**: Live interactive workspace dashboards showing phase milestones, Gantt schedules, and field photo updates.
4. **Secure CAD & Blueprint Distribution**: Zero-egress Cloudflare R2 asset storage with pre-signed temporary download URLs.
5. **Role-Based Access Control (RBAC)**: Strict permission boundaries for `SUPER_ADMIN`, `PROJECT_MANAGER`, `CLIENT_VIEWER`, and `SAFETY_INSPECTOR`.

---

## 🛠️ Technology Stack

| Layer | Technology | Key Responsibility |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16 (App Router)** | Server Components, Server Actions, Dynamic API Routes. |
| **Language** | **TypeScript 5.0** | End-to-end type safety across database models and API payloads. |
| **AI Architecture** | **Multi-Provider AI Abstraction Layer** | Supports **OpenAI** (`gpt-4o`), **Google Gemini** (`@google/genai`), and **Hugging Face** (`Llama-3.3-70B-Instruct`). |
| **Database** | **PostgreSQL (Neon Cloud)** | Serverless database with auto-scaling connection pooling. |
| **ORM** | **Prisma ORM v7** | Schema migrations, typed queries, and automated database seeding. |
| **Object Storage** | **Cloudflare R2** | CAD blueprint drawings & document storage with **zero egress fees**. |
| **Styling & UI** | **Tailwind CSS v4 + Vanilla CSS** | Custom "Obsidian Flux" design system with hardware-accelerated glassmorphism. |
| **Authentication** | **Auth.js / NextAuth & Crypto** | HMAC invitation tokens, bcrypt password hashing, session tokens. |
| **Testing** | **Vitest + Playwright** | Unit tests, RFP calculator validation, E2E browser automation. |
| **Deployment** | **Vercel + GitHub Actions** | Global edge network hosting with automated CI/CD quality gates. |

---

## 📐 System Architecture Diagram

```mermaid
flowchart TD
    subgraph ClientLayer ["Client Layer & Edge CDN"]
        Browser["Executive Client / Field Engineer Browser"]
        CloudflareEdge["Cloudflare Enterprise CDN (DNS / DDoS / SSL)"]
    end

    subgraph HostingPlatform ["Production Hosting (Vercel)"]
        NextServer["Next.js 16 Server Components & Actions"]
        APIRoutes["Secure REST API Routes (/api/v1/*)"]
    end

    subgraph CentralAIEngine ["Multi-Provider AI Layer"]
        AIFactory["AI Provider Factory (getAIProvider)"]
        OpenAIProvider["OpenAI Engine (gpt-4o)"]
        GeminiProvider["Google Gemini Engine (@google/genai)"]
        HFProvider["Hugging Face Router (Llama-3.3-70B)"]
    end

    subgraph DataStorage ["Database & Storage Engine"]
        NeonDB[("Neon Cloud PostgreSQL Database")]
        R2Bucket[("Cloudflare R2 Bucket (CAD Blueprints & Assets)")]
    end

    Browser -->|HTTPS Request| CloudflareEdge
    CloudflareEdge --> NextServer
    NextServer --> APIRoutes
    NextServer -->|Prisma Client| NeonDB
    NextServer -->|Presigned URLs| R2Bucket
    APIRoutes -->|RFP Technical Audit| AIFactory
    AIFactory --> OpenAIProvider
    AIFactory --> GeminiProvider
    AIFactory --> HFProvider
```

---

## 🚀 Key Features

* **AI RFP Analyzer & Lead Risk Scoring**: AI-powered RFP technical audits providing lead quality scores (0-100), risk profiles, structural complexity ratings, missing technical parameters, and estimator action recommendations.
* **Multi-Provider AI Flexibility**: Seamlessly switch active AI engines between **OpenAI**, **Google Gemini**, and **Hugging Face** via `AI_PROVIDER` environment variable with zero code modifications.
* **Obsidian Flux Glassmorphism**: Premium dark-mode UI tailored for high contrast and WCAG 2.1 AA legibility.
* **Interactive Blueprint Viewer**: Filter structural drawings, MEP plans, and site surveys with instant pre-signed URL downloads.
* **Safety Log Feed & EMR Tracking**: Real-time Experience Modification Rate (EMR) index tracking and incident reporting.
* **Cryptographic Client Onboarding**: Secure token invitation links that bind client accounts to specific project workspaces atomically.

---

## 💻 Local Development Setup

### 1. Prerequisites
* **Node.js**: `v20.0.0` or higher
* **npm**: `v10.0.0` or higher

### 2. Clone & Install
```bash
git clone https://github.com/azwar7/atlasbuild-cms.git
cd atlasbuild-cms
npm install
```

### 3. Environment Variables Setup
Create a `.env` file in the root directory:

```bash
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:pass@ep-cool-site.neon.tech/neondb?sslmode=require"

# Authentication
NEXTAUTH_SECRET="your_nextauth_jwt_secret_here"
NEXTAUTH_URL="http://localhost:3000"
INVITE_TOKEN_SECRET="your_invite_token_secret"

# Object Storage (Cloudflare R2)
STORAGE_PROVIDER="R2"
R2_ACCOUNT_ID="your_cloudflare_account_id"
R2_ACCESS_KEY_ID="your_r2_access_key"
R2_SECRET_ACCESS_KEY="your_r2_secret_key"
R2_BUCKET_NAME="atlasbuild-cms"
R2_PUBLIC_DOMAIN="https://pub-your-id.r2.dev"

# Multi-Provider AI Configuration
AI_PROVIDER="huggingface" # Options: "openai" | "gemini" | "huggingface"

# OpenAI Credentials
OPENAI_API_KEY="sk-proj-..."
OPENAI_MODEL="gpt-4o"

# Google Gemini Credentials
GEMINI_API_KEY="AIzaSy..."
GEMINI_MODEL="gemini-2.5-flash"

# Hugging Face Credentials
HF_TOKEN="hf_..."
HF_MODEL="meta-llama/Llama-3.3-70B-Instruct"
```

### 4. Database Migration & Seeding
Sync your PostgreSQL database schema and seed demo civil infrastructure projects:

```bash
# Push schema to database
npx prisma db push

# Seed initial projects, users, phases, and activity logs
npx tsx prisma/seed.ts
```

### 5. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🧪 Testing & Verification

Run typechecks, linting, and unit test suites:

```bash
# TypeScript compilation check
npx tsc --noEmit

# ESLint validation
npm run lint

# Run Vitest unit tests
npx vitest run
```

---

## 🌐 Production Deployment (Vercel)

1. Push your code to your GitHub repository.
2. Go to **[vercel.com/new](https://vercel.com/new)** and import `azwar7/atlasbuild-cms`.
3. Configure your Environment Variables (`DATABASE_URL`, `NEXTAUTH_SECRET`, `STORAGE_PROVIDER`, `AI_PROVIDER`, `HF_TOKEN`, `GEMINI_API_KEY`, `OPENAI_API_KEY`).
4. Click **Deploy**. Vercel will build and host your application globally.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

