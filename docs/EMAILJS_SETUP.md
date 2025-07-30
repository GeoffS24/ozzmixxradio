# EmailJS Setup Guide

This guide will help you set up EmailJS to handle contact form submissions for your radio station website.

## 1. Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## 3. Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:

```html
Subject: New Contact Form Submission - {{topic}}

Hello,

You have received a new contact form submission from your radio station website.

**Contact Details:**
- Name: {{first_name}} {{last_name}}
- Email: {{from_email}}
- Phone: {{phone}}
- User Type: {{user_type}}
- Topic: {{topic}}

**Message:**
{{message}}

**Submission Details:**
- Date: {{submission_date}}
- Reply to: {{reply_to}}

---
This message was sent from your radio station contact form.
```

4. Save the template and note down your **Template ID**

## 4. Get Public Key

1. Go to **Account** in your EmailJS dashboard
2. Find your **Public Key** (also called User ID)
3. Copy this key

## 5. Configure Environment Variables

Add these variables to your `.env.local` file:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## 6. Set Recipient Email in Sanity

1. Go to your Sanity Studio: `http://localhost:3000/studio`
2. Navigate to **⚙️ Station Settings** → **Radio Station Settings**
3. Scroll to **Contact Information**
4. Set the **Email** field to where you want to receive contact form submissions

## 7. Test the Contact Form

1. Go to your website's contact section
2. Fill out and submit the form
3. Check your email for the submission
4. Check Sanity Studio under **📧 Contact Submissions** to see the saved submission

## Template Variables Available

The following variables are automatically populated in your email template:

- `{{first_name}}` - Contact's first name
- `{{last_name}}` - Contact's last name
- `{{from_email}}` - Contact's email address
- `{{phone}}` - Contact's phone number
- `{{topic}}` - Selected topic/category
- `{{user_type}}` - Type of user (Listener, Artist, etc.)
- `{{message}}` - The contact message
- `{{submission_date}}` - When the form was submitted
- `{{full_name}}` - First and last name combined
- `{{subject}}` - Email subject line
- `{{reply_to}}` - Reply-to email address
- `{{to_email}}` - Recipient email from Sanity

## Troubleshooting

### Email Not Sending
- Check that all environment variables are set correctly
- Verify your EmailJS service is properly configured
- Check the browser console for error messages
- Ensure your email service has sufficient quota

### Form Submissions Not Saving
- Check Sanity Studio permissions
- Verify the API route is working: `/api/contact`
- Check server logs for errors

### Template Not Working
- Ensure all variable names match exactly (case-sensitive)
- Test the template in EmailJS dashboard first
- Check for typos in variable names

## EmailJS Limits

**Free Plan:**
- 200 emails per month
- Basic email services
- Standard support

**Paid Plans:**
- Higher email limits
- Premium features
- Priority support

## Security Notes

- Never expose your private keys in client-side code
- Use environment variables for all sensitive data
- The public key is safe to use in client-side code
- Consider implementing rate limiting for production use

## Support

If you need help with EmailJS setup:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Support](https://www.emailjs.com/support/)
- Check the browser console for error messages
- Review the API logs in your deployment platform
