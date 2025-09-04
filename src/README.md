# MichieHots - Premium Streaming Platform

🎬 **MichieHots** adalah platform streaming premium dengan gaya Netflix yang dibangun menggunakan React, TypeScript, dan Tailwind CSS. Website ini menyediakan pengalaman streaming yang immersive dengan 15 kategori konten eksklusif.

## 🚀 Features

### ✨ Core Features
- **Netflix-style Interface** - UI/UX yang familiar dan elegant
- **15 Kategori Konten** - Michooy, Michelle, Michoooos, Michsx, dan lainnya
- **180+ Episode** dengan real Google Drive video integration
- **Auto-rotating Hero Section** dengan smart content selection
- **Fully Responsive** - Mobile, tablet, dan desktop optimized
- **Real-time Search** dengan instant results

### 🎯 Technical Features
- **React 18** with TypeScript
- **Tailwind CSS v3** untuk styling modern
- **Error Boundary** untuk error handling
- **Image Fallback System** dengan Catbox + Unsplash
- **Smart Video Detection** - hanya tampilkan episode dengan video valid
- **Smooth Animations** dan hover effects
- **SEO Optimized**

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v3
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Video Hosting**: Google Drive
- **Image Hosting**: Catbox + Unsplash
- **Deployment**: GitHub Pages / Vercel / Netlify

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm atau yarn

### Local Development

1. **Clone Repository**
   \`\`\`bash
   git clone https://github.com/your-username/michiehots-streaming.git
   cd michiehots-streaming
   \`\`\`

2. **Install Dependencies**
   \`\`\`bash
   npm install
   # atau
   yarn install
   \`\`\`

3. **Start Development Server**
   \`\`\`bash
   npm run dev
   # atau
   yarn dev
   \`\`\`

4. **Open Browser**
   Navigate to `http://localhost:3000`

## 🏗️ Build & Deployment

### Build for Production
\`\`\`bash
npm run build
# atau
yarn build
\`\`\`

### Deploy to GitHub Pages
1. Build the project
2. Push `dist` folder to `gh-pages` branch
3. Enable GitHub Pages in repository settings

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically

### Deploy to Netlify
1. Drag and drop `dist` folder to Netlify
2. Or connect GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## 📁 Project Structure

\`\`\`
michiehots-streaming/
├── App.tsx                 # Main App component
├── index.html             # HTML template
├── package.json           # Dependencies & scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
├── components/            # React components
│   ├── HomePage.tsx       # Landing page with hero
│   ├── Navigation.tsx     # Top navigation bar
│   ├── SeriesDetailPage.tsx # Series detail view
│   ├── VideoPlayerPage.tsx  # Video player
│   ├── ContentPages.tsx   # Trending & Latest pages
│   ├── SearchModal.tsx    # Search functionality
│   ├── ErrorBoundary.tsx  # Error handling
│   └── ui/                # Shadcn/ui components
├── data/
│   └── content.ts         # Content data & logic
└── styles/
    └── globals.css        # Global styles
\`\`\`

## 🐛 Troubleshooting

### White Screen Issue
Jika website menampilkan layar putih:

1. **Check Console Errors**
   - Buka Developer Tools (F12)
   - Lihat Console untuk error messages

2. **Verify Build Files**
   - Pastikan file `dist/` ter-generate dengan benar
   - Check apakah file CSS dan JS dimuat

3. **Check Network Tab**
   - Pastikan semua assets (CSS, JS, images) termuat
   - Verify path URLs benar

4. **Clear Cache**
   - Hard refresh browser (Ctrl+Shift+R)
   - Clear browser cache

### Common Solutions

1. **Path Issues**
   - Pastikan base URL di `vite.config.ts` sesuai deployment
   - Check relative vs absolute paths

2. **CSS Not Loading**
   - Verify Tailwind config
   - Check PostCSS configuration
   - Ensure CSS imports correct

3. **TypeScript Errors**
   - Run `npm run build` untuk check compile errors
   - Fix TypeScript issues sebelum deploy

## 🎨 Customization

### Adding New Categories
Edit `data/content.ts`:
\`\`\`typescript
const newCategory = {
  id: "new-category",
  name: "New Category",
  description: "Description here",
  series: generateSeries("New Category", categoryIndex)
};
\`\`\`

### Changing Colors
Edit `tailwind.config.js`:
\`\`\`javascript
colors: {
  'michiehots': {
    'primary': '#your-color',
    // ... other colors
  }
}
\`\`\`

### Adding New Pages
1. Create component in `components/`
2. Add route logic in `App.tsx`
3. Update navigation if needed

## 📊 Content Statistics

- **Total Episodes**: 180+ dengan real Google Drive URLs
- **Complete Categories**: 8 (12 episodes each)
- **Partial Categories**: 7 (5-11 episodes each)  
- **Image Variety**: 17 thumbnails (12 Catbox + 5 Unsplash)
- **Auto-rotation**: Smart content selection setiap 8-14 detik

## 🚨 Known Issues & Limitations

1. **Google Drive Limits**: Video mungkin tidak play jika quota terlampaui
2. **Mobile Performance**: Video player mungkin butuh optimization
3. **SEO**: Client-side routing butuh SSG untuk SEO optimal

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Netflix** untuk design inspiration
- **Tailwind CSS** untuk utility-first styling
- **React Team** untuk amazing framework
- **Lucide** untuk beautiful icons
- **Catbox** untuk reliable image hosting

---

**⚡ Quick Deploy Commands:**
\`\`\`bash
npm install && npm run build
\`\`\`

🎬 **Happy Streaming with MichieHots!**