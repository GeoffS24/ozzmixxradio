# 🚀 Deploy Visual Editing Fix - Step by Step

## ✅ **Current Status**
The visual editing fix is working locally! I can confirm the headers are correctly set:
- `x-frame-options: ALLOWALL` ✅
- `content-security-policy: frame-ancestors *` ✅  
- `access-control-allow-origin: *` ✅

## 🔧 **What Was Fixed**

### **1. Headers Configuration**
- **next.config.ts**: Updated to allow studio embedding
- **middleware.ts**: Added runtime header enforcement
- **vercel.json**: Vercel-specific header configuration

### **2. Visual Editing Component**
- **VisualEditingWrapper.tsx**: Client-side only rendering
- **Debug logging**: Added for troubleshooting

### **3. Sanity Client**
- **Proper preview mode**: Configured for production
- **Studio URL**: Fixed for production deployment

## 📋 **Deployment Steps**

### **Step 1: Commit and Push Changes**
```bash
git add .
git commit -m "Fix visual editing headers for production"
git push origin main
```

### **Step 2: Deploy to Vercel**
The changes will automatically deploy when you push to main branch.

### **Step 3: Verify Environment Variables**
In your Vercel dashboard, ensure these are set:

**Required:**
- `NEXT_PUBLIC_SANITY_PROJECT_ID` = your_project_id
- `NEXT_PUBLIC_SANITY_DATASET` = production  
- `SANITY_VIEWER_TOKEN` = your_viewer_token

**For Preview Mode:**
- `NEXT_PUBLIC_VERCEL_ENV` = preview (for preview deployments)

### **Step 4: Test After Deployment**
1. Wait for deployment to complete
2. Visit `https://ozz-ebon.vercel.app/studio`
3. Check browser console for errors
4. Test visual editing in Presentation mode

## 🔍 **Testing the Fix**

### **Local Test (Working ✅)**
```bash
curl -I http://localhost:3000/studio
# Should show: x-frame-options: ALLOWALL
```

### **Production Test (After Deployment)**
```bash
curl -I https://ozz-ebon.vercel.app/studio
# Should show: x-frame-options: ALLOWALL
```

## 🛠️ **If Still Not Working After Deployment**

### **1. Check Vercel Function Logs**
- Go to Vercel dashboard
- Check function logs for errors
- Look for header-related issues

### **2. Clear Browser Cache**
```bash
# Hard refresh
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)

# Or clear cache completely
```

### **3. Verify Headers in Production**
```bash
# Check if headers are actually set
curl -I https://ozz-ebon.vercel.app/studio

# Should show:
# x-frame-options: ALLOWALL
# content-security-policy: frame-ancestors *
```

### **4. Check Sanity Studio Configuration**
1. Go to Sanity project dashboard
2. Check CORS origins include your domain
3. Verify API tokens have correct permissions

## 🔧 **Alternative: Manual Vercel Configuration**

If the automatic headers don't work, you can manually configure in Vercel:

### **1. Vercel Dashboard → Project Settings → Headers**
Add these headers:

**For `/studio/*`:**
```
X-Frame-Options: ALLOWALL
Content-Security-Policy: frame-ancestors *
Access-Control-Allow-Origin: *
```

**For `/api/draft-mode/*`:**
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

## 📞 **Debug Information**

### **Files Modified:**
1. `next.config.ts` - Header configuration
2. `src/middleware.ts` - Runtime header enforcement  
3. `vercel.json` - Vercel-specific settings
4. `src/components/molecules/presentation/VisualEditingWrapper.tsx` - Client-side wrapper
5. `src/sanity/lib/client.ts` - Production configuration

### **Expected Behavior After Fix:**
- ✅ No "X-Frame-Options: deny" errors
- ✅ Studio loads in iframe
- ✅ Visual editing connects successfully
- ✅ Real-time updates work
- ✅ No CORS errors in console

### **Debug Console Logs:**
After deployment, you should see:
```
🎨 Visual Editing Wrapper mounted
🎨 Current URL: https://ozz-ebon.vercel.app/
🎨 Environment: { NODE_ENV: "production", NEXT_PUBLIC_VERCEL_ENV: "preview" }
```

## 🚨 **Emergency Fallback**

If visual editing still doesn't work, you can temporarily disable the security headers:

### **Quick Fix in next.config.ts:**
```typescript
// Comment out the headers function temporarily
// async headers() {
//   return []
// }
```

This will remove all custom headers and allow visual editing to work, but reduces security.

## ✅ **Success Indicators**

You'll know it's working when:
1. No "X-Frame-Options" errors in console
2. Studio loads without iframe errors  
3. Visual editing toolbar appears
4. Real-time content updates work
5. No "Unable to connect" messages

## 📞 **Next Steps After Deployment**

1. **Test immediately** after deployment completes
2. **Check browser console** for any remaining errors
3. **Verify visual editing** works in Presentation mode
4. **Test on different browsers** (Chrome, Firefox, Safari)
5. **Document the working setup** for future reference

The fix is ready and working locally - it just needs to be deployed to production! 🚀
