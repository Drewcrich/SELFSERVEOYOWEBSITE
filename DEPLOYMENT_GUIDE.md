# 🚀 Own Your Own Storage - Deployment Guide

This guide will help you deploy your storage rental website to **Netlify** (frontend) and **Railway** (if needed for backend services).

## 📋 What's Included

Your deployment package contains:
- ✅ **Complete React application** with all your customizations
- ✅ **EmailJS integration** for booking notifications
- ✅ **Responsive design** for mobile and desktop
- ✅ **SEO optimization** for Urbana storage searches
- ✅ **Professional styling** with your green brand colors

## 🌐 Option 1: Netlify Deployment (Recommended for Frontend)

### Step 1: Upload to GitHub
1. Create a new repository on GitHub (e.g., `urbana-storage-website`)
2. Upload all files from this `deployment-package` folder to your repository
3. Make sure to include the `netlify.toml` configuration file

### Step 2: Connect to Netlify
1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "New site from Git"
3. Choose GitHub and select your repository
4. Netlify will automatically detect the build settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 20

### Step 3: Deploy
1. Click "Deploy site"
2. Netlify will automatically build and deploy your site
3. You'll get a custom URL (e.g., `amazing-site-123.netlify.app`)
4. You can customize this URL in your Netlify dashboard

### Step 4: Custom Domain (Optional)
1. In Netlify dashboard, go to "Domain settings"
2. Add your custom domain (e.g., `ownyourownstorage.com`)
3. Follow Netlify's DNS configuration instructions

## 🚂 Option 2: Railway Deployment (Alternative)

### Step 1: Upload to GitHub
1. Same as Netlify - upload all files to a GitHub repository

### Step 2: Connect to Railway
1. Go to [railway.app](https://railway.app) and sign in
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will use the `railway.json` configuration automatically

### Step 3: Configure Environment
1. Railway will automatically detect this is a Node.js project
2. It will run `npm run build && npm run preview` as specified in `railway.json`
3. Your site will be deployed with a Railway URL

## 📧 EmailJS Configuration

Your EmailJS integration is already configured with:
- **Service ID**: `service_mzjm45n`
- **Template ID**: `template_tpasori`
- **Public Key**: `nkBo4RSj5XY1LaspO`

**Important**: Make sure your EmailJS account is active and the template is properly configured to send emails to `Drewcrichardson1999@gmail.com`.

## 🔧 Build Commands Reference

If you need to modify build settings:

### For Netlify:
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview build locally
npm run preview
```

### For Railway:
```bash
# Install dependencies
npm install

# Build and start
npm run build && npm run preview
```

## 📱 Features Included

Your deployed website includes:

### ✅ **Booking System**
- 1-minute booking form
- EmailJS integration for instant notifications
- Professional confirmation page
- Tour time scheduling with date/time picker

### ✅ **Professional Design**
- Responsive mobile/desktop layout
- Green brand color scheme
- Professional typography
- Real facility photos

### ✅ **SEO Optimized**
- Urbana, IL location targeting
- Storage-related keywords
- Meta tags and descriptions
- Fast loading times

### ✅ **User Experience**
- Clear process steps (Book → Get Details → Tour → Rent)
- Specific messaging about what customers receive
- Professional testimonials
- Easy navigation

## 🆘 Troubleshooting

### Build Fails on Netlify/Railway:
1. Check that `package.json` is in the root directory
2. Ensure Node version is set to 20 (check `.nvmrc` file)
3. Verify all dependencies are listed in `package.json`

### EmailJS Not Working:
1. Check your EmailJS dashboard for service status
2. Verify the service ID, template ID, and public key
3. Test the template in EmailJS dashboard

### Site Not Loading:
1. Check build logs in Netlify/Railway dashboard
2. Ensure `dist` folder is being published (Netlify)
3. Verify the start command is correct (Railway)

## 📞 Support

If you need help with deployment:
1. Check the build logs in your deployment platform
2. Verify all configuration files are uploaded
3. Test the site locally first with `npm run dev`

## 🎯 Next Steps After Deployment

1. **Test the booking form** - Submit a test booking to verify EmailJS
2. **Check mobile responsiveness** - Test on different devices
3. **Set up custom domain** - Point your domain to the deployed site
4. **Monitor performance** - Use Netlify/Railway analytics
5. **Update content** - Make any final content adjustments

Your professional storage rental website is ready to start receiving customers! 🎉

