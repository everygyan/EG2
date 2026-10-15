# EveryGyan Portal — Hostinger Production Deployment Guide

This guide provides step-by-step instructions to sync your code to **GitHub** and deploy to **Hostinger Business Web Hosting** with **Hostinger MySQL**.

---

## Step 1: Push Your Code to GitHub

1. Open your browser and go to [GitHub New Repository](https://github.com/new).
2. Name your repository (e.g., `everygyan-portal`) and set it to **Private** or **Public**.
3. Do **not** check "Initialize with README" (we already have a complete codebase initialized).
4. In your terminal on your computer, run:
   ```powershell
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/everygyan-portal.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 2: Create Hostinger MySQL Database

1. Log into your **Hostinger hPanel**.
2. Go to **Databases** → **Management**.
3. Under **Create a New MySQL Database And Database User**:
   * **MySQL Database name**: e.g., `everygyan` (full name will look like `u123456789_everygyan`).
   * **MySQL Username**: e.g., `admin` (full username will look like `u123456789_admin`).
   * **Password**: Generate a strong password and save it securely.
4. Click **Create**.
5. Note the **MySQL Host**:
   * If running directly on the Hostinger server, host is usually `localhost` or `127.0.0.1`.
   * If accessing remotely, Hostinger displays the remote IP or host (e.g. `sql123.main-hosting.eu`).

Your complete `DATABASE_URL` format will be:
```env
DATABASE_URL="mysql://u123456789_admin:YOUR_PASSWORD@localhost:3306/u123456789_everygyan"
```

---

## Step 3: Deploy via Hostinger Git & Node.js

### Method A: Hostinger Git Auto-Deploy (Recommended)
1. In Hostinger hPanel, search for **Git** (under *Advanced*).
2. Click **Create a Repository**:
   * **Repository URL**: `https://github.com/<YOUR_GITHUB_USERNAME>/everygyan-portal.git`
   * **Branch**: `main`
   * **Install Directory**: `public_html` (or a subfolder like `portal`)
3. Click **Create**.
4. Hostinger will clone your repository and provide an **Auto-Deployment Webhook URL**.
5. Copy that URL and paste it in your GitHub repository:
   * **GitHub Repo** → **Settings** → **Webhooks** → **Add Webhook**.
   * Payload URL: Paste the Hostinger Webhook URL.
   * Content type: `application/json`.
   * Events: Just the `push` event.
   * Now every time you push code to GitHub, Hostinger automatically updates!

### Method B: Hostinger Node.js Application Manager
1. In Hostinger hPanel, search for **Node.js**.
2. Click **Create Application**:
   * **Node.js version**: Select `20.x` or `22.x`.
   * **Application Mode**: `Production`.
   * **Application Root**: `public_html` (where your repo was cloned).
   * **Application Startup File**: `node_modules/next/dist/bin/next` with argument `start`, or specify `npm start`.
3. Add **Environment Variables** in the Node.js settings:
   * `DATABASE_URL` = `mysql://u123456789_admin:YOUR_PASSWORD@localhost:3306/u123456789_everygyan`
   * `JWT_SECRET` = `your-strong-random-jwt-key-xyz987`
   * `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com`
   * `ADMIN_EMAIL` = `admin@everygyan.com`
   * `ADMIN_PASSWORD` = `YourSecureAdminPassword123!`
4. Click **Save** and **Start Application**.

---

## Step 4: Run Database Migration & Initial Seed

To populate all your categories (*Travel Guide*, *Learning Portal*, *Tech*, *Personal Blog*, etc.) and default admin account on Hostinger:

1. In Hostinger hPanel, go to **Advanced** → **SSH Access** (or open the built-in Terminal).
2. Connect or enter the terminal in your project directory:
   ```bash
   cd public_html
   npm install
   npx prisma db push
   npx tsx prisma/seed.ts
   ```
3. This creates all MySQL tables and seeds the starter articles, dropdowns, and ad slots!

---

## Step 5: Enable Free SSL & Custom Domain

1. In Hostinger hPanel, go to **Websites** → **SSL**.
2. Click **Install Let's Encrypt SSL** on your domain.
3. Toggle on **Force HTTPS**.
4. Open `https://yourdomain.com` in your browser.

Your EveryGyan editorial website is now live in production!

---

## Step 6: Accessing Your Production CMS

* Log in at: `https://yourdomain.com/admin/login`
* **Default Email**: `admin@everygyan.com`
* **Default Password**: The password you set in your environment variables.
* From the CMS, you can:
  * Publish new articles with the rich WYSIWYG editor.
  * Upload featured images.
  * Add new categories and dropdown menus.
  * Manage ad placements and insert your Google AdSense publisher ID.
