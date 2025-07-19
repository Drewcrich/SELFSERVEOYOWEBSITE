# Industrial Container Storage Website with Google Ads Conversion Tracking

Complete React website with authentic industrial design and Google Ads conversion tracking for container storage business.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📊 Google Ads Conversion Tracking Setup

### 1. Conversion Action Settings
- **Name**: Container Tour Booking
- **Category**: Book appointment
- **Value**: Don't use a value
- **Count**: One per conversion
- **Conversion URL**: `https://yourdomain.com/booking-confirmed`

### 2. Update JotForm Redirect
1. Login to JotForm account
2. Edit your booking form
3. Go to Settings > Thank You Page
4. Set redirect URL to: `https://yourdomain.com/booking-confirmed`

### 3. Test Conversion Flow
1. Fill out booking form at `/book-tour`
2. Submit form
3. Verify redirect to `/booking-confirmed`
4. Confirm Google Ads tracks the conversion

## 🎨 Industrial Design Features

- **Authentic Container Aesthetic**: Dark steel, orange/yellow colors
- **Professional Photos**: Clean container images (11 photos)
- **Heavy-Duty Styling**: Bold typography, industrial elements
- **Mobile Responsive**: Perfect on all devices
- **Complete Brand Consistency**: All pages match industrial theme

## 📁 Key Files

- `src/pages/BookingConfirmedPage.jsx` - Conversion tracking page
- `src/pages/BookTourPageIndustrialJotForm.jsx` - Booking form page
- `src/pages/HomePageIndustrial.jsx` - Industrial homepage
- `src/App.jsx` - Routes including `/booking-confirmed`

## 🔧 Customization

### Update Domain
Replace all instances of `ownyourownselfserve.com` with your domain:
- JotForm redirect URL
- Any hardcoded links in components

### Update Content
- `src/pages/AboutUsPageIndustrial.jsx` - Family business story
- `src/pages/HomePageIndustrial.jsx` - Photo slideshow array
- `src/components/CustomerReviewsIndustrial.jsx` - Customer reviews

### Update Photos
Replace photos in `public/` directory:
- Container photos for slideshow
- Facility entrance photo
- Any other business photos

## 📈 Expected Results

- **Track Google Ads Conversions**: Know which ads generate bookings
- **Improve ROI**: Focus budget on converting keywords
- **Professional Appearance**: Industrial design builds trust
- **Mobile Optimized**: Great experience on all devices

## 🛠 Deployment

### Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
1. Import GitHub repository
2. Framework preset: Vite
3. Deploy

### Traditional Hosting
1. Run `npm run build`
2. Upload `dist/` folder contents
3. Configure server for SPA routing

## 📞 Support

For questions about Google Ads conversion tracking or website customization, refer to the CONVERSION_TRACKING_SUMMARY.md file for detailed implementation notes.

