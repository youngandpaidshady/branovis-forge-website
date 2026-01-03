# Branovis Forge Remodelling LLC - Website

Premium construction and remodeling website for Branovis Forge Remodelling LLC. Built with HTML, CSS (Tailwind), JavaScript (GSAP), and optimized for SEO and mobile devices.

## 🚀 Features

- ✅ **Fully Responsive** - Mobile-first design optimized for all devices
- ✅ **SEO Optimized** - Comprehensive meta tags, structured data (JSON-LD), sitemap
- ✅ **Modern Animations** - GSAP-powered 3D animations and smooth transitions
- ✅ **Fast Performance** - Optimized assets, lazy loading, and efficient code
- ✅ **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation
- ✅ **PWA Ready** - Web manifest for Progressive Web App capabilities

## 📁 Project Structure

```
├── index.html          # Homepage
├── projects.html       # Projects portfolio
├── blog.html          # Blog page
├── contact.html       # Contact page
├── styles.css         # Main stylesheet
├── script.js          # JavaScript functionality
├── netlify.toml       # Netlify deployment config
├── sitemap.xml        # SEO sitemap
├── robots.txt         # Search engine directives
└── site.webmanifest   # PWA manifest
```

## 🛠️ Development

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment

### Deploy to Netlify

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/branovis-forge-website.git
   git push -u origin main
   ```

2. **Deploy on Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Build settings (auto-detected from netlify.toml):
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

For detailed deployment instructions, see [DEPLOY.md](./DEPLOY.md)

## 🎨 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom styles with Tailwind CSS
- **JavaScript (ES6+)** - Modern JavaScript
- **GSAP** - Animation library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔍 SEO Features

- Structured data (JSON-LD) for LocalBusiness, Organization, WebSite
- Comprehensive meta tags (Open Graph, Twitter Cards)
- XML sitemap
- robots.txt configuration
- Semantic HTML5
- Optimized images with alt text
- Fast page load times

## 📄 License

© 2024 Branovis Forge Remodelling LLC. All rights reserved.

## 📞 Contact

For questions or support, visit [Contact Page](./contact.html) or email through the website.

---

**Built with ❤️ for Branovis Forge Remodelling LLC**
