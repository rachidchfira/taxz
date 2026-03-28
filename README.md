# VietPIT - Vietnam PIT Finalization Service for Foreigners

A professional website for Personal Income Tax (PIT) finalization services in Vietnam, built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Features

- **Premium UI/UX**: Glassmorphism effects, smooth animations, responsive design
- **Navy (#1E3A8A) / Teal (#40E0D0)** color scheme
- **26 Static Pages**: Fully optimized for SEO
- **Interactive Tools**: Tax calculator, residency assessment, document checklist
- **Contact Integration**: ZALO contact integration (+84703027485)

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Database**: Prisma ORM (SQLite for development)
- **Icons**: Lucide React

## 📦 Deployment to Vercel

### Prerequisites

1. A [Vercel](https://vercel.com) account
2. Git repository (GitHub, GitLab, or Bitbucket)

### Steps

1. **Push to Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables** (Optional)
   - `DATABASE_URL`: Your database connection string
   - `NEXT_PUBLIC_SITE_URL`: Your production URL
   - `NEXT_PUBLIC_ZALO_NUMBER`: +84703027485

4. **Deploy**
   - Click "Deploy"
   - Your site will be live in ~2 minutes

### Build Commands (Auto-detected)

- **Build Command**: `bun run build`
- **Output Directory**: `.next`
- **Install Command**: `bun install`

## 🔧 Local Development

```bash
# Install dependencies
bun install

# Generate Prisma client
bun run db:generate

# Run development server
bun run dev

# Build for production
bun run build
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── calculator/        # PIT Calculator
│   ├── contact/           # Contact page
│   ├── pricing/           # Pricing page
│   ├── services/          # Service pages
│   │   ├── pit-finalization/
│   │   ├── tax-residency/
│   │   ├── leaving-vietnam/
│   │   ├── multi-employer/
│   │   └── tax-refund/
│   └── api/               # API routes
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Page sections
│   └── ui/                # shadcn/ui components
└── lib/                   # Utilities, helpers

prisma/                    # Database schema
public/                    # Static assets
```

## 🎨 Customization

### Colors

The brand colors are defined in Tailwind:

- **Navy**: `#1E3A8A`
- **Teal**: `#40E0D0`

### Contact Info

Update in `.env`:
```
NEXT_PUBLIC_ZALO_NUMBER=+84703027485
NEXT_PUBLIC_ZALO_LINK=https://zalo.me/84703027485
NEXT_PUBLIC_EMAIL=contact@vietpit.vn
```

## 📊 Performance

- Build time: ~5 seconds
- 26 static pages generated in ~600ms
- Optimized package imports
- AVIF/WebP image formats

## 📝 License

Private project - All rights reserved.
