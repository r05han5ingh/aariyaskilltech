# AARIYA SKILLTECH ACADEMY WEBSITE - SETUP GUIDE

## 📋 WEBSITE OVERVIEW

Your professional 6-page website has been created with the following features:

### Pages Created:
1. **index.html** - Home page with hero section, features, courses, stats, testimonials
2. **about.html** - About page with mission, vision, leadership, values, achievements
3. **courses.html** - Courses page with filtering system and 13+ courses
4. **verify.html** - Student admission verification system (by Roll Number)
5. **contact.html** - Contact page with form, map, FAQ section
6. **enroll.html** - Comprehensive enrollment form with email integration

### Supporting Files:
- **styles.css** - Complete responsive styling
- **script.js** - All interactive functionality

---

## 🚀 HOW TO RUN YOUR WEBSITE

### Option 1: Open Locally
1. Open the folder: `C:\Users\BALAJI\OneDrive\Desktop\certi format`
2. Double-click on `index.html` to open in browser

### Option 2: Use Live Server (Recommended)
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html` → "Open with Live Server"

---

## ⚙️ IMPORTANT: CUSTOMIZE THESE DETAILS

### 1. Replace Placeholder Information:
- **Phone Numbers**: Search for `+91 XXXXX XXXXX` and replace with your actual numbers
- **Email Addresses**: Keep `info@aariyaskilltech.com` or update to your domain
- **Address**: Replace "Your Address Here" with actual institute address
- **Logo**: Place your logo image as `logo.png` in the main folder

### 2. Update Social Media Links:
In all HTML files, replace `#` with your actual social media URLs:
- Facebook, Twitter, Instagram, LinkedIn, YouTube links

### 3. Google Maps:
In `contact.html`, replace the map embed code with your actual location:
- Go to Google Maps → Find your location → Share → Embed a map → Copy HTML

---

## 📧 EMAIL INTEGRATION SETUP

### Option 1: EmailJS (Free & Easy - Recommended)
1. Sign up at: https://www.emailjs.com/
2. Create email service (Gmail/Outlook)
3. Create email template
4. Get your Public Key, Service ID, Template ID
5. Add before `</body>` in all HTML files:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>emailjs.init('YOUR_PUBLIC_KEY');</script>
```
6. Uncomment the emailjs code in `script.js` (line 254-264)

### Option 2: Formspree (Alternative)
1. Sign up at: https://formspree.io/
2. Create a form
3. Update form action in HTML files

### Option 3: Your Own Backend
- Use Node.js with Nodemailer
- Or PHP mail() function

---

## 🎓 STUDENT VERIFICATION SYSTEM

The verification system is ready to use! Test it with these sample roll numbers:
- AST-2026-0001 (Rahul Kumar)
- AST-2026-0002 (Priya Sharma)
- AST-2026-0003 (Amit Patel)
- AST-2026-0004 (Anjali Verma)
- AST-2026-0005 (Vikash Singh)

**To add real students:**
Edit `script.js` (lines 105-141) and add entries to the `studentDatabase` object.

---

## 🌐 HOW TO PUBLISH YOUR WEBSITE

### Option 1: Free Hosting (GitHub Pages)
1. Create GitHub account
2. Create repository named: `aariyaskilltech`
3. Upload all files
4. Enable GitHub Pages in Settings
5. Your site: `yourusername.github.io/aariyaskilltech`

### Option 2: Netlify (Free - Drag & Drop)
1. Go to: https://www.netlify.com/
2. Sign up free
3. Drag your folder onto Netlify
4. Get instant website URL

### Option 3: Purchase Domain & Hosting
Recommended providers:
- Hostinger (₹59/month)
- Bluehost (₹199/month)
- GoDaddy (₹249/month)
- NameCheap (₹180/month)

Steps:
1. Buy domain: `aariyaskilltech.com`
2. Buy hosting plan
3. Upload files via FTP/cPanel
4. Connect domain to hosting

---

## 📱 FEATURES INCLUDED

✅ Fully responsive (mobile, tablet, desktop)
✅ Student verification by roll number
✅ Comprehensive enrollment form
✅ Course filtering system
✅ Contact form with validation
✅ FAQ accordion
✅ Animated statistics counter
✅ Smooth scrolling
✅ Mobile navigation menu
✅ Social media integration ready
✅ Email integration ready
✅ Professional design with your logo support

---

## 🎨 COLOR SCHEME

Your website uses:
- **Primary Blue**: #1e3a8a
- **Secondary Blue**: #3b82f6
- **Accent Green**: #10b981
- **Dark**: #1f2937
- **Light**: #f3f4f6

To change colors: Edit the `:root` variables in `styles.css` (lines 11-18)

---

## 📞 YOUR DETAILS TO UPDATE

Managing Director: **Roshan Singh**
Institute: **Aariya SkillTech Academy**

Update these in footer of all HTML files if needed.

---

## 🔧 TROUBLESHOOTING

**Images not showing?**
- Make sure `logo.png` is in the same folder as HTML files

**Forms not submitting?**
- Set up EmailJS or other email service (see Email Integration above)

**Mobile menu not working?**
- Make sure `script.js` is properly linked

**Need changes?**
- All styling is in `styles.css`
- All functionality is in `script.js`

---

## 🗄️ Backend & Database Setup

Follow these steps to link the backend to a MySQL database and run the server locally.

1. Create a `.env` file in the project root (copy from `.env.example`):

```powershell
copy .env.example .env
```

2. Edit `.env` and set your MySQL credentials (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).

3. Ensure MySQL server is running and you have permissions to create databases.

4. Run the database setup script (this creates the database and tables defined in `database_schema.sql`):

```powershell
npm run db:setup
```

5. Start the server:

```powershell
npm start
```

If you see an error about `EADDRINUSE` (port in use), stop the other process using port `3001` or change `PORT` in `.env`.

If you see `Access denied for user 'root'@'localhost'`, update `.env` with correct credentials.

---

## 📤 Publish to GitHub

To push this project to your GitHub account (you must have a GitHub repo ready):

```powershell
git init
git add .
git commit -m "Initial project files"
# replace <YOUR_REMOTE_URL> with your GitHub repo HTTPS or SSH URL
git remote add origin <YOUR_REMOTE_URL>
git branch -M main
git push -u origin main
```

If you prefer using the GitHub CLI (gh) to create a repo and push:

```powershell
gh repo create yourusername/aariyaskilltech --public --source=. --remote=origin --push
```

If you want, provide your GitHub repository URL or give me temporary access (PAT) and I can push the code for you.


## 📊 ENROLLMENT FORM DATA

When students enroll, the form collects:
- Personal information
- Contact details  
- Educational background
- Course selection
- Batch preferences
- Additional information

Data is logged to console and ready for email integration.

---

## ✨ NEXT STEPS

1. ✅ Add your logo image (`logo.png`)
2. ✅ Update contact information (phone, email, address)
3. ✅ Set up email integration (EmailJS recommended)
4. ✅ Update Google Maps location
5. ✅ Add real student data to verification system
6. ✅ Update social media links
7. ✅ Test on mobile devices
8. ✅ Choose hosting and publish

---

## 💡 FUTURE ENHANCEMENTS (Optional)

- Student login portal
- Online payment gateway
- Course management system
- Certificate generation
- Student progress tracking
- Online classes integration
- Blog section
- Photo gallery
- Video testimonials
- Live chat support

---

## 📧 SUPPORT

If you need any modifications or have questions about the website, you can:
- Edit HTML files for content changes
- Edit CSS for styling changes
- Edit JavaScript for functionality changes

All files are well-commented for easy understanding!

---

**Your professional website is ready! 🎉**

Good luck with Aariya SkillTech Academy!

---

*Website Created: January 7, 2026*
*For: Roshan Singh, Managing Director*
*Institute: Aariya SkillTech Academy*