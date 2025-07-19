# Deployment Instructions - Industrial Container Storage Website

## 🎯 Pre-Deployment Checklist

### 1. Update Domain References
Before deploying, update these domain references to match your actual website:

**JotForm Redirect URL:**
- Login to JotForm
- Edit your booking form (ID: 251895754464067)
- Go to Settings > Thank You Page
- Update redirect URL from current to: `https://yourdomain.com/booking-confirmed`

**Website Content:**
- Check all components for hardcoded domain references
- Update any links that point to old domains

### 2. Test Locally First
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Test booking form flow:
# 1. Go to http://localhost:3001/book-tour
# 2. Fill out form completely
# 3. Submit and verify redirect to /booking-confirmed
```

## 🚀 Deployment Options

### Option 1: Netlify (Recommended)

**Step 1: Prepare Repository**
1. Upload all files to your GitHub repository
2. Ensure `package.json` and `vite.config.js` are in root directory

**Step 2: Connect to Netlify**
1. Login to Netlify
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18 or higher

**Step 3: Deploy**
1. Click "Deploy site"
2. Wait for build to complete
3. Test the live site

**Step 4: Update JotForm**
1. Copy your new Netlify domain
2. Update JotForm redirect URL to: `https://yournetlifydomain.netlify.app/booking-confirmed`

### Option 2: Vercel

**Step 1: Import Project**
1. Login to Vercel
2. Click "New Project"
3. Import from GitHub repository

**Step 2: Configure**
1. Framework preset: Vite
2. Build command: `npm run build`
3. Output directory: `dist`

**Step 3: Deploy**
1. Click "Deploy"
2. Wait for deployment
3. Test the live site

**Step 4: Update JotForm**
1. Copy your Vercel domain
2. Update JotForm redirect URL to: `https://yourproject.vercel.app/booking-confirmed`

### Option 3: Traditional Web Hosting

**Step 1: Build Locally**
```bash
npm install
npm run build
```

**Step 2: Upload Files**
1. Upload entire `dist/` folder contents to your web server
2. Ensure all files are in the root directory or subdirectory

**Step 3: Configure Server**
For single-page applications, configure your server to serve `index.html` for all routes:

**Apache (.htaccess):**
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Step 4: Update JotForm**
1. Update JotForm redirect URL to: `https://yourdomain.com/booking-confirmed`

## 🔧 Post-Deployment Testing

### 1. Test All Pages
- Homepage: Industrial design loads properly
- Pricing: All pricing information displays correctly
- Book Tour: JotForm loads and styling matches
- About Us: Family business story displays
- All legal pages: Industrial theme consistent

### 2. Test Booking Flow
1. **Go to**: `https://yourdomain.com/book-tour`
2. **Fill out form**: Use real information for testing
3. **Submit form**: Click submit button
4. **Verify redirect**: Should go to `/booking-confirmed`
5. **Check URL**: URL should change to show booking-confirmed

### 3. Test Mobile Responsiveness
- Test on mobile devices
- Verify industrial design works on small screens
- Ensure booking form is mobile-friendly

### 4. Test Google Ads Conversion Tracking
1. **Set up Google Ads conversion action**:
   - Name: Container Tour Booking
   - Category: Book appointment
   - Value: Don't use a value
   - URL: `https://yourdomain.com/booking-confirmed`

2. **Test conversion tracking**:
   - Fill out booking form
   - Verify Google Ads registers the conversion
   - Check conversion data in Google Ads dashboard

## 🛠 Troubleshooting

### Booking Form Not Redirecting
1. **Check JotForm settings**:
   - Verify redirect URL is correct
   - Ensure "Redirect to external link" is selected
   - Save changes in JotForm

2. **Check confirmation page**:
   - Verify `/booking-confirmed` route exists in App.jsx
   - Test direct navigation to confirmation page

### Industrial Design Not Loading
1. **Check image paths**: Ensure all industrial texture images are in public folder
2. **Check CSS**: Verify Tailwind classes are working
3. **Check console**: Look for any JavaScript errors

### Mobile Issues
1. **Test responsive design**: Use browser dev tools
2. **Check viewport meta tag**: Should be in index.html
3. **Test touch interactions**: Ensure buttons work on mobile

## 📊 Google Ads Integration

### Conversion Tracking Setup
1. **Create conversion action** in Google Ads
2. **Install tracking code** on confirmation page (if needed)
3. **Test conversion flow** multiple times
4. **Monitor conversion data** in Google Ads dashboard

### Campaign Optimization
- Use conversion data to optimize keywords
- Adjust bids based on conversion rates
- Pause non-converting ad groups
- Scale successful campaigns

## 🎉 Success Metrics

After deployment, you should see:
- **Professional industrial website** that matches your container business
- **Working booking form** that redirects properly
- **Google Ads conversion tracking** that counts bookings
- **Mobile-responsive design** that works on all devices
- **Consistent branding** across all pages

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify JotForm redirect settings
3. Test booking flow multiple times
4. Monitor Google Ads conversion data

The website is now ready to maximize your Google Ads conversions with authentic industrial design!

