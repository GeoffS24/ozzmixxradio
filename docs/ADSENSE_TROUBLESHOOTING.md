# Google AdSense Troubleshooting Guide

## Quick Debugging Steps

### 1. Use the Ad Debugger
- Visit your homepage in production
- Look for the red "🐛 Debug Ads" button in the bottom-right corner
- Click it to see detailed debugging information

### 2. Check Browser Console
Open your browser's developer tools (F12) and look for:
- `[AdsManager]` logs showing ad configuration
- `[AdSense]` logs showing ad loading attempts
- Any red error messages related to AdSense

### 3. Common Issues & Solutions

#### Issue: "Ads disabled or no client ID"
**Solution:** 
1. Go to your Sanity Studio (`/studio`)
2. Navigate to Home Page settings
3. Find the Google Ads section
4. Ensure "Enable Ads" is checked
5. Add your AdSense client ID (format: `ca-pub-1234567890`)

#### Issue: "No enabled ad slots"
**Solution:**
1. In Sanity Studio, go to Google Ads configuration
2. Add ad slots with valid slot IDs from your AdSense account
3. Ensure each ad slot is enabled
4. Set the correct placement (header, content-top, etc.)

#### Issue: "AdSense script not loading"
**Possible causes:**
- Ad blocker is blocking the script
- Network connectivity issues
- Invalid client ID
- AdSense account not approved

#### Issue: "Ads show in development but not production"
**Check:**
1. Environment variables are correctly set in production
2. Domain is added to your AdSense account
3. Site has been approved by Google AdSense
4. No policy violations

### 4. AdSense Account Requirements

#### Before ads will show:
1. **Account Approval**: Your AdSense account must be approved
2. **Site Review**: Google needs to review and approve your site
3. **Domain Verification**: Add your production domain to AdSense
4. **Content Policy**: Ensure your site meets AdSense policies
5. **Traffic Requirements**: Some regions require minimum traffic

#### Timeline:
- Initial review: 1-14 days
- Site approval: 1-30 days
- First ads may take 24-48 hours to appear

### 5. Testing in Development

To test ads in development:
1. Go to Sanity Studio
2. Navigate to Google Ads settings
3. Enable "Test Mode" in Ad Settings
4. This will show test ads even in development

### 6. Production Checklist

- [ ] AdSense account is approved
- [ ] Site is approved in AdSense
- [ ] Production domain is added to AdSense account
- [ ] Client ID is correctly configured in Sanity
- [ ] At least one ad slot is enabled
- [ ] Ads are enabled globally in Sanity
- [ ] No ad blockers are interfering
- [ ] Site meets AdSense content policies

### 7. Console Commands for Debugging

Open browser console and run:

```javascript
// Check if AdSense script is loaded
console.log('AdSense script:', !!document.querySelector('script[src*="adsbygoogle.js"]'))

// Check if adsbygoogle array exists
console.log('adsbygoogle array:', typeof window.adsbygoogle)

// Check for ad containers
console.log('Ad containers:', document.querySelectorAll('.adsbygoogle').length)

// Check for ad placement containers
console.log('Ad placements:', document.querySelectorAll('[data-ads-placement]').length)
```

### 8. Common Error Messages

#### "AdSense head tag missing"
- The AdSense script isn't loading properly
- Check your client ID format

#### "No fill"
- AdSense couldn't find relevant ads
- Normal for new sites or low-traffic pages
- Try different ad formats/sizes

#### "Invalid ad slot"
- Ad slot ID is incorrect
- Check your AdSense account for correct slot IDs

### 9. When to Contact Support

Contact Google AdSense support if:
- Account has been approved for 30+ days
- Site has been approved
- Ads still don't show after following all steps
- You see persistent error messages

### 10. Remove Debug Components

Once debugging is complete, remove the debug components:

1. Remove `<AdDebugger />` from `src/app/(base)/page.tsx`
2. Remove debug console.log statements from:
   - `src/components/organisms/ads/AdsManager.tsx`
   - `src/components/molecules/ads/GoogleAdsense.tsx`

## Need Help?

If you're still having issues:
1. Check the Ad Debugger output
2. Review browser console logs
3. Verify your AdSense account status
4. Ensure your site meets AdSense policies
