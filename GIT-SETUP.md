# Git Setup & Deployment Guide

## Step 1: Install Git (if not installed)

### Download Git for Windows
1. Go to: https://git-scm.com/downloads
2. Download the Windows installer
3. Run the installer (use default settings)
4. Restart your terminal/PowerShell after installation

### Verify Installation
Open PowerShell and run:
```powershell
git --version
```
You should see something like: `git version 2.x.x`

---

## Step 2: Initialize Git Repository

Open PowerShell in your project folder and run:

```powershell
# Navigate to your project folder (if not already there)
cd "C:\Users\HP\Desktop\New folder"

# Initialize Git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Branovis Forge website with SEO and mobile optimizations"

# Set default branch to main
git branch -M main
```

---

## Step 3: Create GitHub Repository

1. **Go to GitHub.com** and sign in (create account if needed)
2. Click the **"+"** icon in top right → **"New repository"**
3. Repository name: `branovis-forge-website` (or any name you prefer)
4. Description: "Premium construction and remodeling website"
5. **IMPORTANT:** Leave it **Public** (or Private if you prefer)
6. **DO NOT** check "Initialize with README"
7. Click **"Create repository"**

---

## Step 4: Connect and Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```powershell
# Add your GitHub repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/branovis-forge-website.git

# Push your code to GitHub
git push -u origin main
```

**Note:** You'll be prompted for your GitHub username and password (or Personal Access Token)

---

## Step 5: Deploy to Netlify

### Option A: Via Netlify Dashboard (Easiest)

1. **Sign up/Login to Netlify**
   - Go to: https://www.netlify.com
   - Click "Sign up" → Choose "GitHub"
   - Authorize Netlify to access your GitHub account

2. **Add New Site**
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose **"Deploy with GitHub"**
   - Select your repository: `branovis-forge-website`

3. **Build Settings** (Netlify will auto-detect from netlify.toml)
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click **"Deploy site"**

4. **Wait for Deployment**
   - Build will take 1-2 minutes
   - Your site will be live at: `https://random-name-123.netlify.app`

5. **Custom Domain (Optional)**
   - Go to **Site settings** → **Domain management**
   - Click **"Add custom domain"**
   - Enter: `www.branovisforge.com`
   - Follow DNS setup instructions

### Option B: Via Netlify CLI

```powershell
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

---

## Quick Commands Reference

```powershell
# Check Git status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main
```

---

## Troubleshooting

### Git Authentication Issues
If you get authentication errors:
1. Use a **Personal Access Token** instead of password
2. Generate token: GitHub → Settings → Developer settings → Personal access tokens
3. Use token as password when pushing

### Build Fails on Netlify
- Check build logs in Netlify dashboard
- Ensure `package.json` has all dependencies
- Verify Node version (should be 18+)

### Files Not Uploading
- Check `.gitignore` - some files may be excluded
- Ensure files are committed: `git add .` then `git commit`

---

## Next Steps After Deployment

1. ✅ Test your live site
2. ✅ Set up custom domain (if you have one)
3. ✅ Configure SSL certificate (automatic on Netlify)
4. ✅ Set up form handling (if using contact form)
5. ✅ Monitor site analytics

---

**Your site will be live at:** `https://your-site-name.netlify.app`

For more details, see [DEPLOY.md](./DEPLOY.md)

