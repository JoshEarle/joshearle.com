# How to Make Your Website Live

You have two options. **Option 1 (with GitHub) is recommended** because it's easier to update your site later.

---

## Option 1: Deploy with GitHub + Vercel (Recommended)

### Why this way?
- ✅ Easy updates - just push to GitHub and your site updates automatically
- ✅ Free hosting
- ✅ Easy to roll back if something breaks
- ✅ Professional workflow

### Step-by-Step:

#### Part A: Create GitHub Repository

1. **Go to GitHub**: https://github.com/new
2. **Create a new repository**:
   - Repository name: `josh-website` (or whatever you want)
   - Make it **Public** (free) or **Private** (also free)
   - **Don't** check "Initialize with README"
   - Click "Create repository"

3. **In your terminal**, run these commands (one at a time):

```bash
cd "/Users/joshearle/Josh Website"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/josh-website.git
git push -u origin main
```

(Replace `YOUR_USERNAME` with your GitHub username)

#### Part B: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Log in** (you can use your GitHub account - easiest!)
3. **Click "Add New Project"**
4. **Import your GitHub repository**:
   - Select your `josh-website` repo
   - Click "Import"
5. **Configure**:
   - Framework Preset: **Next.js** (should auto-detect)
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build` (should be there)
   - Output Directory: `.next` (should be there)
   - **Click "Deploy"**
6. **Wait 2-3 minutes** - Vercel will build and deploy your site!
7. **You'll get a URL** like: `https://josh-website.vercel.app`

#### Part C: Add Environment Variables (for Spotify)

1. In Vercel, go to your project
2. Click **Settings** → **Environment Variables**
3. Add these three:
   - `SPOTIFY_CLIENT_ID` = (your client ID)
   - `SPOTIFY_CLIENT_SECRET` = (your client secret)
   - `SPOTIFY_REFRESH_TOKEN` = (your refresh token)
4. Click **Save**
5. Go to **Deployments** tab → Click the three dots on latest deployment → **Redeploy**

**Done!** Your site is now live! 🎉

---

## Option 2: Deploy Directly to Vercel (No GitHub)

### Why this way?
- ✅ Faster to get started
- ❌ Harder to update later (have to upload files each time)
- ❌ No version history

### Step-by-Step:

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd "/Users/joshearle/Josh Website"
   vercel
   ```
   - Follow the prompts:
     - Set up and deploy? **Yes**
     - Which scope? (choose your account)
     - Link to existing project? **No**
     - Project name? (press Enter for default)
     - Directory? (press Enter)
     - Override settings? **No**

4. **Add Environment Variables**:
   ```bash
   vercel env add SPOTIFY_CLIENT_ID
   vercel env add SPOTIFY_CLIENT_SECRET
   vercel env add SPOTIFY_REFRESH_TOKEN
   ```
   (Paste your values when prompted)

5. **Redeploy**:
   ```bash
   vercel --prod
   ```

**Done!** You'll get a URL like `https://josh-website.vercel.app`

---

## Updating Your Site Later

### If you used Option 1 (GitHub):
1. Make changes to your files
2. Run:
   ```bash
   git add .
   git commit -m "Update website"
   git push
   ```
3. Vercel automatically deploys the update! (takes 1-2 minutes)

### If you used Option 2 (Direct):
1. Make changes to your files
2. Run: `vercel --prod`
3. Wait for deployment

---

## Custom Domain (Optional)

Want `josh.com` instead of `josh-website.vercel.app`?

1. In Vercel dashboard → Your Project → **Settings** → **Domains**
2. Add your domain
3. Follow Vercel's instructions to update your DNS settings

---

## Need Help?

- **GitHub issues?** I can help you set it up
- **Vercel issues?** Their docs are great: https://vercel.com/docs
- **Something not working?** Just ask!

