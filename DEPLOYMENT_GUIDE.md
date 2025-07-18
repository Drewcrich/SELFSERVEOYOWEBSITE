# Deployment Guide - Industrial Container Storage Website

## 🚀 Deployment Options

### Option 1: Netlify (Recommended)
1. **Create Netlify Account**: Go to netlify.com and sign up
2. **Connect Repository**: Link your GitHub repository
3. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Deploy**: Netlify will automatically build and deploy

### Option 2: Vercel
1. **Create Vercel Account**: Go to vercel.com and sign up
2. **Import Project**: Connect your GitHub repository
3. **Framework**: Select "Vite" as the framework
4. **Deploy**: Vercel handles the rest automatically

### Option 3: Traditional Web Hosting
1. **Build the Project**:
   ```bash
   npm install
   npm run build
   ```
2. **Upload Files**: Upload the entire `dist/` folder contents to your web server
3. **Configure Redirects**: Set up redirects for single-page application

## 📁 File Upload Checklist

### Required Files (from dist/ folder)
- [ ] `index.html` - Main HTML file
- [ ] `assets/` folder - CSS and JavaScript bundles
- [ ] All image files (container photos, textures)
- [ ] `_redirects` file (for Netlify) or equivalent

### Important Images to Verify
- [ ] `industrial_metal_texture.png`
- [ ] `container_corrugated_texture.png`
- [ ] `goodentrencephoto.png`
- [ ] `entrancefardistance.png`
- [ ] All `Screenshot2025-*.png` files

## 🔧 Configuration

### Single Page Application Setup
For traditional hosting, add this to your `.htaccess` file:
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Netlify Redirects
Create `public/_redirects` file:
```
/*    /index.html   200
```

### Domain Configuration
1. **Point Domain**: Update DNS to point to your hosting provider
2. **SSL Certificate**: Enable HTTPS (most hosts provide free SSL)
3. **WWW Redirect**: Set up www to non-www redirect (or vice versa)

## 🧪 Testing Checklist

### Before Going Live
- [ ] **Homepage loads correctly** with industrial design
- [ ] **All navigation links work** (Pricing, About, Book Tour)
- [ ] **Slideshow displays** all professional photos
- [ ] **JotForm booking works** and submits properly
- [ ] **Mobile responsive** on phone and tablet
- [ ] **Fast loading** (under 3 seconds)
- [ ] **Contact information** is correct throughout

### Google Ads Integration
- [ ] **Landing page URL** matches your ads
- [ ] **Pricing information** is prominent and accurate
- [ ] **Phone number** is clickable on mobile
- [ ] **Booking form** is easily accessible
- [ ] **Trust signals** are visible (family business, certifications)

## 📈 Performance Optimization

### Image Optimization
All images are already optimized, but verify:
- [ ] Images load quickly
- [ ] No broken image links
- [ ] Slideshow transitions smoothly

### Speed Testing
Test your site with:
- Google PageSpeed Insights
- GTmetrix
- Pingdom Website Speed Test

Target scores:
- **Performance**: 90+ on mobile
- **Loading Time**: Under 3 seconds
- **Core Web Vitals**: All green

## 🔍 SEO Setup

### Meta Tags (Already Included)
- [ ] Title tags for each page
- [ ] Meta descriptions
- [ ] Open Graph tags for social sharing

### Google Analytics (Optional)
Add your Google Analytics tracking code to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🛡️ Security

### HTTPS
- [ ] SSL certificate installed
- [ ] HTTP redirects to HTTPS
- [ ] Mixed content warnings resolved

### Headers
Recommended security headers:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
```

## 📱 Mobile Testing

### Test On
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad (Safari)
- [ ] Various screen sizes

### Key Mobile Features
- [ ] Touch-friendly buttons
- [ ] Readable text without zooming
- [ ] Fast loading on mobile networks
- [ ] Easy navigation

## 🔄 Updates and Maintenance

### Content Updates
To update content:
1. Edit the relevant `.jsx` files
2. Run `npm run build`
3. Upload new `dist/` folder contents

### Photo Updates
1. Add new photos to `public/` folder
2. Update photo arrays in `HomePageIndustrial.jsx`
3. Rebuild and redeploy

### Emergency Fixes
Keep a backup of your current working version before making changes.

## 📞 Troubleshooting

### Common Issues
- **White screen**: Check browser console for JavaScript errors
- **Images not loading**: Verify file paths and uploads
- **Form not working**: Check JotForm embed code
- **Mobile issues**: Test responsive design

### Support Resources
- React documentation: reactjs.org
- Tailwind CSS docs: tailwindcss.com
- Vite documentation: vitejs.dev

---

**Live Example**: https://wjesimyq.manus.space
**Support**: Check documentation or contact your developer
**Last Updated**: July 18, 2025

