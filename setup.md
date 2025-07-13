# Family Echo - Setup Guide

## 🚀 Quick Start

### Prerequisites
1. **Node.js** (version 16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

### Installation Steps

1. **Open Terminal/Command Prompt**
   - Windows: PowerShell or Command Prompt
   - Mac/Linux: Terminal

2. **Navigate to Project Directory**
   ```bash
   cd D:\FamilyEcho
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start Development Server**
   ```bash
   npm start
   ```

5. **Open Browser**
   - Navigate to: http://localhost:3000
   - The Family Echo website should now be running!

## 🔧 Troubleshooting

### Windows PowerShell Issues
If you encounter execution policy errors:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Node.js Not Found
- Ensure Node.js is installed and in your PATH
- Restart terminal after installation
- Try running: `node --version`

### Port Already in Use
If port 3000 is busy:
- The app will automatically suggest using a different port
- Or manually kill the process using port 3000

### Dependencies Issues
If npm install fails:
```bash
npm cache clean --force
npm install
```

## 📁 Project Structure Overview

```
FamilyEcho/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Main page components
│   ├── context/       # React context for data
│   └── index.css      # Global styles
├── public/            # Static files
├── package.json       # Dependencies
└── tailwind.config.js # Tailwind configuration
```

## 🎨 Features Available

✅ **Homepage** - Hero section, featured profiles, recent memories
✅ **Profiles Page** - Grid of family members with search/filter
✅ **Profile Details** - Individual member pages with audio/video
✅ **Memories Page** - Photo/video gallery with upload form
✅ **Family Tree** - Interactive family tree visualization
✅ **Contact Page** - Contact form and family information

## 🚀 Next Steps

1. **Customize Content**
   - Edit `src/context/FamilyContext.js` to add your family members
   - Replace sample photos with real family photos
   - Add personal stories and memories

2. **Styling**
   - Modify `tailwind.config.js` for color changes
   - Update `src/index.css` for custom styles

3. **Deploy**
   - Run `npm run build` for production build
   - Deploy to Netlify, Vercel, or your preferred hosting

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify Node.js version is 16+
4. Try clearing npm cache and reinstalling

---

**Family Echo** - Ready to preserve your family's legacy! ❤️ 