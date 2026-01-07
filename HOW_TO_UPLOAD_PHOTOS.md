# How to Upload Photos - Step by Step Guide

## Method 1: Using Finder (Mac) or File Explorer (Windows)

### Step 1: Find your photo file
- Locate the photo on your computer (Desktop, Downloads, Photos app, etc.)

### Step 2: Copy the photo to the images folder
1. Open Finder (Mac) or File Explorer (Windows)
2. Navigate to your project folder: `Josh Website`
3. Go into the `public` folder
4. Go into the `images` folder
5. **Drag and drop** your photo file into this `images` folder
   - Or copy the file (Cmd+C / Ctrl+C) and paste it here (Cmd+V / Ctrl+V)

### Step 3: Note the filename
- Remember the exact filename, for example: `my-photo.jpg` or `sunset.png`

## Method 2: Using Terminal/Command Line

### Step 1: Open Terminal
- On Mac: Press `Cmd + Space`, type "Terminal", press Enter
- On Windows: Press `Win + R`, type "cmd", press Enter

### Step 2: Navigate to your project
```bash
cd "/Users/joshearle/Josh Website"
```

### Step 3: Copy your photo
```bash
# Replace "/path/to/your/photo.jpg" with the actual path to your photo
cp "/path/to/your/photo.jpg" "public/images/photo.jpg"
```

**Example:**
```bash
# If your photo is on your Desktop:
cp ~/Desktop/my-photo.jpg public/images/my-photo.jpg

# If your photo is in Downloads:
cp ~/Downloads/sunset.png public/images/sunset.png
```

## Step 4: Add the photo to your website

1. Open the file: `app/pics/page.tsx` in your code editor

2. Find the `pics` array (around line 7)

3. Add a new entry like this:
```javascript
const pics = [
  {
    id: 1,
    title: "photo 1",
    imageUrl: "/images/photo1.jpg",
    date: "NOV 30, 25",
  },
  // ADD YOUR NEW PHOTO HERE:
  {
    id: 3,  // Use the next number (3, 4, 5, etc.)
    title: "my awesome photo",  // Change this to your photo title
    imageUrl: "/images/my-photo.jpg",  // Change this to match your filename
    date: "DEC 15, 25",  // Change this to the date
  },
];
```

### Example:
If you uploaded a file called `sunset.jpg`:
```javascript
{
  id: 3,
  title: "sunset in san francisco",
  imageUrl: "/images/sunset.jpg",  // Must match your filename exactly!
  date: "DEC 15, 25",
}
```

## Step 5: Save and view

1. **Save** the `app/pics/page.tsx` file (Cmd+S / Ctrl+S)
2. If your development server is running, it will automatically refresh
3. Go to your website and click on "pics" in the navigation
4. Your photo should appear!

## Troubleshooting

**Photo doesn't show up?**
- Check that the filename in `imageUrl` matches exactly (case-sensitive!)
- Make sure the file is in `public/images/` folder
- Check the file extension (.jpg, .png, .jpeg, etc.)
- Try refreshing your browser (Cmd+R / Ctrl+R)

**File too large?**
- Large photos can slow down your site
- Try compressing them first (use an online tool like TinyPNG or Squoosh)

## Quick Reference

- **Photo location**: `public/images/your-photo.jpg`
- **Code location**: `app/pics/page.tsx`
- **Format**: Use JPG, PNG, or WebP files
- **Naming**: Use lowercase, no spaces (use dashes: `my-photo.jpg`)


