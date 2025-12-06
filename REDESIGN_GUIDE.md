# 🎄 Christmas Tree Video Generator - Redesign Guide

## Project Structure Overview

This redesigned website allows users to:
1. **Select a Background** - Choose from predefined background images
2. **Select a Tree Style** - Choose from different tree designs
3. **Add Custom Images** - Upload images to decorate the tree
4. **Export as MP4** - Generate and download the final video

---

## How to Add New Backgrounds

### Step 1: Add Image Files
Place your background images in: `/public/images/`

Recommended image specifications:
- **Format**: JPG or PNG
- **Size**: 1920x1080 or 16:9 aspect ratio
- **File naming**: Use descriptive names (e.g., `winter-scene.jpg`, `modern-background.jpg`)

### Step 2: Update the Defaults Configuration
Edit: `src/types/defaults.ts`

Add your background to the `DEFAULT_BACKGROUNDS` array:

```typescript
export const DEFAULT_BACKGROUNDS: Background[] = [
  {
    id: "bg-1",
    name: "Classic Tree",
    src: "/images/ctree.jpg",
    thumbnail: "/images/ctree.jpg",
  },
  // Add your new background here:
  {
    id: "bg-2",
    name: "Winter Scene",
    src: "/images/winter-scene.jpg",
    thumbnail: "/images/winter-scene.jpg",
  },
  {
    id: "bg-3",
    name: "Snowy Landscape",
    src: "/images/snowy-landscape.jpg",
    thumbnail: "/images/snowy-landscape.jpg",
  },
];
```

**Parameters:**
- `id`: Unique identifier (must start with "bg-" for backgrounds)
- `name`: Display name shown in the selector
- `src`: Path to the full image
- `thumbnail`: Path to thumbnail (or same as src if not resizing)

---

## How to Add New Tree Styles

### Step 1: Add Image/Asset Files
Place your tree files in: `/public/images/`

Recommended specifications:
- **Format**: PNG (for transparency) or JPG
- **Size**: 1920x1080 or similar
- **File naming**: Use descriptive names (e.g., `modern-tree.png`, `elegant-tree.jpg`)

### Step 2: Update the Defaults Configuration
Edit: `src/types/defaults.ts`

Add your tree to the `DEFAULT_TREES` array:

```typescript
export const DEFAULT_TREES: TreeStyle[] = [
  {
    id: "tree-1",
    name: "Classic Green",
    src: "/images/ctree.jpg",
    thumbnail: "/images/ctree.jpg",
  },
  // Add your new tree here:
  {
    id: "tree-2",
    name: "Modern Tree",
    src: "/images/modern-tree.png",
    thumbnail: "/images/modern-tree.png",
  },
  {
    id: "tree-3",
    name: "Elegant Design",
    src: "/images/elegant-tree.png",
    thumbnail: "/images/elegant-tree.png",
  },
];
```

**Parameters:**
- `id`: Unique identifier (must start with "tree-" for trees)
- `name`: Display name shown in the selector
- `src`: Path to the full image
- `thumbnail`: Path to thumbnail (or same as src)

---

## Project Files

### New Files Created:
- `src/types/defaults.ts` - Default backgrounds and trees configuration
- `src/components/BackgroundSelector.tsx` - Background selection UI
- `src/components/TreeSelector.tsx` - Tree selection UI
- `src/styles/BackgroundSelector.css` - Background selector styling
- `src/styles/TreeSelector.css` - Tree selector styling
- `src/styles/VideoGenerator.css` - Main layout styling

### Modified Files:
- `src/components/VideoGenerator.tsx` - Updated with new layout and selectors
- `src/components/ImageCanvas.tsx` - Now accepts `backgroundSrc` prop

---

## Component Architecture

### BackgroundSelector
- Displays grid of available backgrounds
- Allows user to select one
- Shows helpful info for adding more backgrounds

### TreeSelector
- Displays grid of available tree styles
- Allows user to select one
- Shows helpful info for adding more trees

### VideoGenerator (Updated)
- Main container with header
- Left sidebar with both selectors
- Center section with canvas and controls
- Passes selected background to ImageCanvas
- (Note: Tree selection is prepared for future use)

---

## Next Steps for Development

1. ✅ **Backgrounds & Trees**: Add your images to `/public/images/` and configure in `src/types/defaults.ts`

2. **Integrate Tree Selection**: Currently tree selection is UI-ready but not integrated with ImageCanvas. Update `ImageCanvas.tsx` to use the selected tree if needed.

3. **Add More Customization**: Consider adding:
   - Image filters or effects
   - Tree decorations
   - Snow animations
   - Background music selection UI

4. **Performance**: Optimize large image loading and caching

---

## Styling Customization

If you want to modify the colors or layout:
- Main layout: `src/styles/VideoGenerator.css`
- Background selector: `src/styles/BackgroundSelector.css`
- Tree selector: `src/styles/TreeSelector.css`

The design uses:
- **Primary Colors**: Green (#4CAF50) for backgrounds, Blue (#2196F3) for trees
- **Grid Layout**: Responsive design adapts to different screen sizes
- **Modern Aesthetic**: Clean cards with hover effects and smooth transitions

---

## Testing the Changes

1. Run `npm run dev` to start the development server
2. You should see:
   - Header with title and description
   - Left sidebar with background and tree selectors
   - Center area with the canvas and controls
   - The current background will update as you switch selections

---

## File Locations Reference

```
Public images directory:
/public/images/
├── ctree.jpg (existing)
├── winter-scene.jpg (add here)
├── modern-tree.png (add here)
└── ...more images

Configuration file:
src/types/defaults.ts (update this with new images)
```
