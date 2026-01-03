# Setup Guide - Branovis Forge Website

## Quick Setup Steps

### 1. Install Node.js (if not already installed)

Download and install Node.js 18+ from: https://nodejs.org/

This includes npm (Node Package Manager) automatically.

**Verify installation:**
```bash
node --version
npm --version
```

### 2. Install Project Dependencies

Navigate to the project directory and run:

```bash
npm install
```

This will install Vite and all development dependencies.

### 3. Start Development Server

```bash
npm run dev
```

The development server will start at `http://localhost:3000`

Features:
- ✅ Instant hot module replacement (HMR)
- ✅ Fast page reloads
- ✅ Error overlay in browser
- ✅ Source maps for debugging

### 4. Build for Production

When ready to deploy:

```bash
npm run build
```

This creates an optimized `dist/` folder with:
- Minified CSS and JavaScript
- Optimized assets
- Production-ready HTML files

### 5. Preview Production Build

Test the production build locally:

```bash
npm run preview
```

## Troubleshooting

### npm is not recognized

**Solution:** Install Node.js from https://nodejs.org/

### Port 3000 already in use

**Solution:** Edit `vite.config.js` and change the port:
```javascript
server: {
    port: 3001, // Change to available port
}
```

### Module not found errors

**Solution:** Run `npm install` again to ensure all dependencies are installed.

## Alternative: No NPM Setup

If you don't want to use npm, you can still use the site:

1. Open `index.html` directly in a browser
2. Or use a simple HTTP server (Python, PHP, etc.)

See README.md for alternative setup methods.



