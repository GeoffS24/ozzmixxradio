# 🔧 Visual Editing Production Fix Guide

## ✅ **Issues Fixed**

Your visual editing was failing in production due to several configuration issues. Here's what I've fixed:

### **1. X-Frame-Options Configuration**
**Problem**: `X-Frame-Options: DENY` was preventing the studio from being embedded
**Solution**: Updated `next.config.ts` to use `SAMEORIGIN` for studio routes

### **2. Content Security Policy**
**Problem**: Missing CSP headers for frame ancestors
**Solution**: Added proper CSP headers allowing Sanity Studio and Vercel domains

### **3. Client Configuration**
**Problem**: Incorrect stega and perspective settings for production
**Solution**: Updated client configuration to handle preview vs production properly

### **4. Visual Editing Component**
**Problem**: Server-side rendering issues with VisualEditing component
**Solution**: Created client-side wrapper component

## 🚀 **Changes Made**

### **1. Updated `next.config.ts`**
```typescript
// Before: X-Frame-Options: DENY (blocked all framing)
// After: Different headers for studio vs regular pages
{
  source: '/studio/(.*)',
  headers: [
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'Content-Security-Policy', value: "frame-ancestors 'self' https://*.sanity.studio https://ozz-ebon.vercel.app https://*.vercel.app" }
  ]
}
```

### **2. Updated `src/sanity/lib/client.ts`**
```typescript
// Added proper production configuration
useCdn: process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_VERCEL_ENV !== 'preview',
perspective: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' ? 'previewDrafts' : 'published',
stega: {
  enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview',
  studioUrl: getStudioUrl(),
}
```

### **3. Created `VisualEditingWrapper.tsx`**
```typescript
// Client-side only component to avoid hydration issues
'use client'
export function VisualEditingWrapper() {
  // Handles client-side rendering and refresh logic
}
```

### **4. Updated Studio URL Function**
```typescript
// Better production URL handling
if (process.env.NODE_ENV === 'production') {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/studio`;
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return `${process.env.NEXT_PUBLIC_SITE_URL}/studio`;
  }
  return 'https://ozz-ebon.vercel.app/studio';
}
```

### **5. Added `vercel.json`**
```json
// Additional Vercel-specific configuration
{
  "headers": [
    {
      "source": "/studio/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Content-Security-Policy", "value": "frame-ancestors 'self' https://*.sanity.studio https://ozz-ebon.vercel.app" }
      ]
    }
  ]
}
```

## 🔧 **Environment Variables Needed**

Make sure these are set in your Vercel dashboard:

### **Required:**
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_VIEWER_TOKEN=your_viewer_token
```

### **For Visual Editing:**
```bash
NEXT_PUBLIC_VERCEL_ENV=preview  # Set this for preview deployments
VERCEL_URL=auto                 # Automatically set by Vercel
NEXT_PUBLIC_SITE_URL=https://ozz-ebon.vercel.app
```

## 🚀 **How to Enable Visual Editing**

### **1. In Vercel Dashboard:**
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add `NEXT_PUBLIC_VERCEL_ENV=preview` for preview deployments
4. Make sure `SANITY_VIEWER_TOKEN` is set with read permissions

### **2. In Sanity Studio:**
1. Go to your Sanity project dashboard
2. Navigate to "API" → "Tokens"
3. Create a viewer token with read permissions
4. Add it to Vercel as `SANITY_VIEWER_TOKEN`

### **3. For Preview Deployments:**
1. Create a preview branch in your repository
2. Set up a preview deployment in Vercel
3. The preview deployment will automatically have visual editing enabled

## 🔍 **Testing Visual Editing**

### **1. Local Development:**
```bash
npm run dev
# Visit http://localhost:3000/studio
# Visual editing should work in draft mode
```

### **2. Production Preview:**
```bash
# Deploy to preview branch
git checkout -b preview
git push origin preview

# Or use Vercel CLI
vercel --prod
```

### **3. Verify in Browser:**
1. Open your production site
2. Navigate to `/studio`
3. Enable "Presentation" mode
4. Visual editing should now work without X-Frame-Options errors

## 🛠️ **Troubleshooting**

### **If you still see X-Frame-Options errors:**
1. Clear browser cache
2. Check Vercel deployment logs
3. Verify environment variables are set
4. Ensure the domain in CSP headers matches your actual domain

### **If visual editing doesn't connect:**
1. Check browser console for CORS errors
2. Verify `SANITY_VIEWER_TOKEN` has correct permissions
3. Ensure `NEXT_PUBLIC_VERCEL_ENV=preview` is set for preview deployments
4. Check that the studio URL is accessible

### **If you see "Unable to connect" errors:**
1. Verify the studio is accessible at `/studio`
2. Check that the token has read permissions
3. Ensure the project ID and dataset are correct
4. Try refreshing the page

## ✅ **Expected Behavior**

After these fixes:
- ✅ Visual editing works in production preview mode
- ✅ No X-Frame-Options errors
- ✅ Proper CORS handling
- ✅ Studio loads correctly in iframe
- ✅ Real-time updates work
- ✅ No hydration issues

## 🔄 **Deployment Steps**

1. **Commit all changes**:
```bash
git add .
git commit -m "Fix visual editing for production"
git push
```

2. **Deploy to Vercel**:
```bash
vercel --prod
```

3. **Test visual editing**:
- Visit your production site
- Go to `/studio`
- Enable Presentation mode
- Visual editing should now work!

Your visual editing should now work perfectly in production! 🎉
