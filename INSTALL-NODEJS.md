# 📥 How to Install Node.js and Complete Setup

## Step 1: Install Node.js

Node.js is required to use npm. Here's how to install it:

### Option A: Official Installer (Recommended)

1. **Download Node.js:**
   - Go to: https://nodejs.org/
   - Download the **LTS (Long Term Support)** version (Recommended)
   - This includes both Node.js and npm

2. **Install:**
   - Run the downloaded `.msi` installer (Windows)
   - Follow the installation wizard
   - **Important:** Check "Automatically install necessary tools" if prompted
   - Complete the installation

3. **Verify Installation:**
   - Open a NEW terminal/PowerShell window (important!)
   - Run: `node --version`
   - Run: `npm --version`
   - You should see version numbers

### Option B: Using Chocolatey (Windows Package Manager)

If you have Chocolatey installed:
```powershell
choco install nodejs-lts
```

### Option C: Using Winget (Windows Package Manager)

```powershell
winget install OpenJS.NodeJS.LTS
```

## Step 2: Complete Setup

After Node.js is installed:

### Automatic Setup (Easiest)

1. **Open PowerShell/Terminal in this folder**
2. **Run the setup script:**

   **Windows:**
   ```powershell
   .\setup.bat
   ```

   This will:
   - ✅ Check Node.js installation
   - ✅ Install all dependencies
   - ✅ Verify setup
   - ✅ Start development server

### Manual Setup

1. **Open PowerShell/Terminal in this folder**

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Verify setup:**
   ```powershell
   npm run verify
   ```

4. **Start development server:**
   ```powershell
   npm run dev
   ```

5. **Open browser:**
   - Visit: `http://localhost:3000`

## Troubleshooting

### "node is not recognized"
- **Solution:** Restart your terminal/PowerShell after installing Node.js
- **Solution:** Check if Node.js is in your PATH:
  - Windows: Check `C:\Program Files\nodejs\` exists
  - Add to PATH if needed (usually done automatically)

### "npm is not recognized"
- **Solution:** npm comes with Node.js, reinstall Node.js if missing

### Port 3000 already in use
- **Solution:** Kill the process or change port in `vite.config.js`

### Permission errors
- **Solution:** Run PowerShell as Administrator if needed

## Alternative: Use Without NPM

If you can't install Node.js, the website still works:

1. Open `index.html` directly in your browser, OR
2. Use Python server:
   ```powershell
   python -m http.server 8000
   ```
   Then visit: `http://localhost:8000`

## Need Help?

- Node.js Website: https://nodejs.org/
- Node.js Documentation: https://nodejs.org/docs/
- NPM Documentation: https://docs.npmjs.com/

---

**After installing Node.js, come back and run:**
```powershell
npm install
npm run dev
```



