# Deployment Guide - Branovis Forge Website

## 🚀 Deploy to Netlify

### Prerequisites

-   Git installed on your computer
-   GitHub account
-   Netlify account (free tier works perfectly)

---

## Step 1: Initialize Git Repository (if not already done)

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Branovis Forge website with SEO and mobile optimizations"
```

---

## Step 2: Push to GitHub

### Option A: Create New Repository on GitHub

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Name it: `branovis-forge-website` (or any name you prefer)
4. **DO NOT** initialize with README, .gitignore, or license
5. Click **"Create repository"**

### Option B: Connect to Existing Repository

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push your code
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.**

---

## Step 3: Deploy to Netlify

### Method 1: Deploy via Netlify Dashboard (Recommended)

1. **Sign up/Login to Netlify**

    - Go to [netlify.com](https://www.netlify.com)
    - Sign up with GitHub (easiest option)

2. **Add New Site**

    - Click **"Add new site"** → **"Import an existing project"**
    - Choose **"Deploy with GitHub"**
    - Authorize Netlify to access your GitHub account
    - Select your repository: `branovis-forge-website`

3. **Configure Build Settings**

    - **Build command:** `npm run build`
    - **Publish directory:** `dist`
    - Netlify will auto-detect these from `netlify.toml`

4. **Deploy**

    - Click **"Deploy site"**
    - Wait for build to complete (usually 1-2 minutes)
    - Your site will be live at: `https://random-name-123.netlify.app`

5. **Custom Domain (Optional)**
    - Go to **Site settings** → **Domain management**
    - Click **"Add custom domain"**
    - Enter your domain: `www.branovisforge.com`
    - Follow DNS configuration instructions

### Method 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

---

## Step 4: Environment Variables (if needed)

If you need to add environment variables:

1. Go to **Site settings** → **Environment variables**
2. Add any required variables
3. Redeploy the site

---

## Step 5: Continuous Deployment

Once connected to GitHub, Netlify will automatically:

-   ✅ Deploy when you push to `main` branch
-   ✅ Create preview deployments for pull requests
-   ✅ Run builds automatically

---

## 📝 Build Configuration

The project uses:

-   **Build command:** `npm run build`
-   **Publish directory:** `dist`
-   **Node version:** 18 (configured in netlify.toml)

---

## 🔧 Troubleshooting

### Build Fails

-   Check Netlify build logs
-   Ensure `package.json` has all dependencies
-   Verify Node version (should be 18+)

### Site Not Loading

-   Check publish directory is set to `dist`
-   Verify `index.html` is in the root of `dist`
-   Check browser console for errors

### Assets Not Loading

-   Ensure all paths are relative (not absolute)
-   Check that images are in the correct directories
-   Verify CSS/JS files are being built correctly

---

## 📞 Support

For issues:

1. Check Netlify build logs
2. Review GitHub repository
3. Verify all files are committed and pushed

---

**Your site will be live at:** `https://your-site-name.netlify.app`

Happy deploying! 🎉
