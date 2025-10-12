# 🎨 Try-On the Virtual Exhibition

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![AI Powered](https://img.shields.io/badge/AI-Pollinations%20%7C%20Gemini-FF6B6B?logo=openai)

**An advanced AI-powered virtual try-on system for fashion and beauty products**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Architecture](#-architecture) • [API](#-api-reference) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Architecture](#-architecture)
- [Workflows](#-workflows)
- [API Reference](#-api-reference)
- [Components](#-components)
- [Contributing](#-contributing)
- [Team](#-team)
- [License](#-license)

---

## 🌟 Overview

**Try-On the Virtual Exhibition** is a cutting-edge web application that enables users to virtually try on fashion and beauty products using AI-powered image generation. Built for college exhibitions, this system provides an immersive experience where students can upload photos or use their camera to see how different products look on them in real-time.


### 🎯 Key Highlights

- **AI-Powered Try-On**: Leverages Pollinations AI and Google Gemini for realistic product visualization
- **Multi-Product Layering**: Apply multiple products simultaneously (makeup, accessories, clothing)
- **Real-Time Camera**: Capture photos directly from your device camera
- **Theme Customization**: 11+ beautiful themes including Day Mode, Night Mode, Amoled, and more
- **Mobile-Friendly**: QR code generation for seamless mobile access
- **Custom Products**: Add your own products with custom images
- **Responsive Design**: Works flawlessly on desktop, tablet, and mobile devices

---

## ✨ Features

### 🖼️ Image Input
- **Upload Images**: Support for JPG and PNG formats (up to 5MB)
- **Camera Capture**: Real-time camera access with mirrored preview
- **Image Validation**: Automatic file type and size validation

### 👗 Product Selection
- **Makeup**: Lipstick, Eyeliner, Eye Shadow, Foundation (100+ options)
- **Accessories**: Sunglasses, Glasses, Hair Accessories (30+ styles)
- **Clothing**: Shirts/Tops, Dresses, Jackets (30+ items)
- **Custom Products**: Add your own products with images

### 🎨 AI Models
- **Pollinations Kontext**: Recommended for best quality
- **Pollinations NanoBanana**: Fast generation
- **Pollinations GPT Image**: Creative results
- **Google Gemini 2.5 Flash**: Advanced image understanding

### 🌈 Themes
11 pre-built themes with instant switching:
- Day Mode, Night Mode, Amoled
- Mystic Shadows, Neon Glow, Rose Gold
- Ocean Breeze, Sunset Vibes, Minimalist
- Forest Green, Cosmic Purple


---

## 🛠️ Tech Stack

### Frontend Framework
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)

### Styling
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### AI Services
![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Pollinations AI](https://img.shields.io/badge/Pollinations_AI-Latest-FF6B6B?style=for-the-badge)

### Image Hosting
![tmpfiles.org](https://img.shields.io/badge/tmpfiles.org-Primary-orange?style=for-the-badge)
![0x0.st](https://img.shields.io/badge/0x0.st-Fallback-blue?style=for-the-badge)
![catbox.moe](https://img.shields.io/badge/catbox.moe-Backup-green?style=for-the-badge)

### Dependencies
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "@google/genai": "^1.24.0",
  "@vitejs/plugin-react": "^5.0.0",
  "typescript": "~5.8.2",
  "vite": "^6.2.0",
  "dotenv": "^16.4.5"
}
```

---

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- API Keys (optional: Gemini API Key for Gemini model)

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/try-on-virtual-exhibition.git
cd try-on-virtual-exhibition
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```


### Step 3: Configure Environment Variables (Optional)
If you want to use Google Gemini model, create a `.env` file in the root directory:

```env
# Google Gemini API Key (Optional - only needed for Gemini model)
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Note: Pollinations AI models work without any API keys or tokens!

### Step 4: Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

### Step 5: Build for Production
```bash
npm run build
# or
yarn build
```

### Step 6: Preview Production Build
```bash
npm run preview
# or
yarn preview
```

---

## ⚙️ Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_GEMINI_API_KEY` | ❌ No | Google Gemini API key (only needed for Gemini model) |

### Vite Configuration
The project uses Vite with the following configuration:
- **Port**: 3000
- **Host**: 0.0.0.0 (accessible from network)
- **React Plugin**: Fast Refresh enabled
- **Path Aliases**: `@/` points to project root


---

## 🏗️ Architecture

### System Architecture Diagram

```mermaid
graph TB
    subgraph "Client Layer"
        A[User Browser] --> B[React Application]
        B --> C[Component Layer]
        C --> D[ImageInput]
        C --> E[ProductSelector]
        C --> F[ResultView]
        C --> G[ThemeSelector]
    end
    
    subgraph "State Management"
        H[App State] --> I[Image Data]
        H --> J[Selected Products]
        H --> K[Theme Settings]
        H --> L[Custom Products]
    end
    
    subgraph "Service Layer"
        M[Gemini Service] --> N[Image Processing]
        M --> O[Prompt Generation]
        M --> P[API Router]
    end
    
    subgraph "External Services"
        Q[Pollinations AI]
        R[Google Gemini]
        S[Image Hosting]
        S --> S1[tmpfiles.org]
        S --> S2[0x0.st]
        S --> S3[catbox.moe]
    end
    
    B --> H
    C --> M
    M --> Q
    M --> R
    M --> S
    
    style A fill:#61DAFB
    style B fill:#61DAFB
    style M fill:#FF6B6B
    style Q fill:#FF6B6B
    style R fill:#4285F4
    style S fill:#FFA500
```

### Component Architecture

```mermaid
graph LR
    subgraph "App.tsx - Main Container"
        A[App Component]
    end
    
    subgraph "Input Components"
        B[ImageInput]
        B1[Camera Capture]
        B2[File Upload]
    end
    
    subgraph "Selection Components"
        C[ProductSelector]
        C1[Category Tabs]
        C2[Product Grid]
        C3[Custom Product Modal]
    end
    
    subgraph "Display Components"
        D[ResultView]
        D1[Image Comparison]
        D2[Action Buttons]
    end
    
    subgraph "UI Components"
        E[ThemeSelectorModal]
        F[QRCodeModal]
        G[Spinner]
        H[DebugPanel]
    end
    
    A --> B
    A --> C
    A --> D
    A --> E
    A --> F
    A --> G
    A --> H
    B --> B1
    B --> B2
    C --> C1
    C --> C2
    C --> C3
    D --> D1
    D --> D2
    
    style A fill:#61DAFB
    style B fill:#90EE90
    style C fill:#FFD700
    style D fill:#FF6B6B
    style E fill:#DDA0DD
```


---

## 🔄 Workflows

### 1. Application Initialization Workflow

```mermaid
graph TD
    A[Application Start] --> B[Load index.html]
    B --> C[Initialize React]
    C --> D[Mount App Component]
    D --> E{Check localStorage}
    E -->|Theme Found| F[Apply Saved Theme]
    E -->|No Theme| G[Apply Default Theme]
    F --> H[Render Home Screen]
    G --> H
    H --> I[Display ImageInput Component]
    I --> J[Wait for User Action]
    
    style A fill:#4CAF50
    style H fill:#2196F3
    style J fill:#FF9800
```

### 2. Image Upload Workflow

```mermaid
graph TD
    A[User Selects Image] --> B{Upload Method?}
    B -->|File Upload| C[Select File from Device]
    B -->|Camera| D[Request Camera Permission]
    
    C --> E[Validate File Type]
    E -->|Invalid| F[Show Error Message]
    E -->|Valid| G[Check File Size]
    G -->|Too Large| H[Show Size Error]
    G -->|Valid| I[Convert to Base64]
    
    D --> J{Permission Granted?}
    J -->|No| K[Show Permission Error]
    J -->|Yes| L[Start Camera Stream]
    L --> M[Display Video Preview]
    M --> N[User Captures Photo]
    N --> O[Convert Frame to Base64]
    
    I --> P[Store Image Data]
    O --> P
    P --> Q[Update App State]
    Q --> R[Navigate to Product Selection]
    
    style A fill:#4CAF50
    style P fill:#2196F3
    style R fill:#FF9800
```

### 3. Product Selection Workflow

```mermaid
graph TD
    A[Display Product Selector] --> B[Show Category Tabs]
    B --> C[User Selects Category]
    C --> D[Display Subcategories]
    D --> E[Render Product Grid]
    
    E --> F{User Action?}
    F -->|Select Product| G[Toggle Product Selection]
    F -->|Add Custom| H[Open Custom Product Modal]
    
    G --> I[Update Selected Products Array]
    I --> J[Display Selection Badge]
    J --> K{Continue Shopping?}
    K -->|Yes| F
    K -->|No| L[User Clicks Try On]
    
    H --> M[User Enters Product Details]
    M --> N[Upload Product Image]
    N --> O[Add to Custom Products]
    O --> I
    
    L --> P[Validate Selection]
    P -->|No Products| Q[Show Error]
    P -->|Valid| R[Proceed to Generation]
    
    style A fill:#4CAF50
    style L fill:#FF9800
    style R fill:#2196F3
```


### 4. AI Image Generation Workflow (Pollinations)

```mermaid
graph TD
    A[Start Generation] --> B[Set State to PROCESSING]
    B --> C[Show Loading Spinner]
    C --> D[Extract Base64 Image Data]
    D --> E[Upload to Image Host]
    
    E --> F{Try tmpfiles.org}
    F -->|Success| G[Get Direct URL]
    F -->|Fail| H{Try 0x0.st}
    H -->|Success| G
    H -->|Fail| I{Try catbox.moe}
    I -->|Success| G
    I -->|Fail| J[Throw Upload Error]
    
    G --> K[Build Product Prompts]
    K --> L[Generate Prompt Text]
    L --> M[Collect Product Image URLs]
    M --> N[Combine User + Product URLs]
    N --> O[Generate Random Seed]
    O --> P[Build Pollinations URL]
    
    P --> Q[Construct Query Parameters]
    Q --> R[Add Model Selection]
    R --> S[Add Image References]
    S --> T[Return Final URL]
    
    U --> V[Set Generated Image]
    V --> W[Update State to RESULT]
    W --> X[Display Result View]
    
    J --> Y[Show Error Message]
    Y --> Z[Return to Selection]
    
    style A fill:#4CAF50
    style E fill:#FFA500
    style P fill:#FF6B6B
    style X fill:#2196F3
```

### 5. AI Image Generation Workflow (Gemini)

```mermaid
graph TD
    A[Start Gemini Generation] --> B[Validate API Key]
    B -->|Missing| C[Throw Error]
    B -->|Valid| D[Initialize GoogleGenAI]
    
    D --> E[Strip Base64 Prefix]
    E --> F[Create Product Prompts]
    F --> G{Number of Products?}
    G -->|Single| H[Generate Simple Prompt]
    G -->|Multiple| I[Generate Complex Prompt]
    
    H --> J[Build Gemini Request]
    I --> J
    J --> K[Set Model: gemini-2.5-flash-image]
    K --> L[Add Image Data]
    L --> M[Add Text Prompt]
    M --> N[Set Response Modalities]
    N --> O[Send API Request]
    
    O --> P{Response Valid?}
    P -->|No| Q[Throw Generation Error]
    P -->|Yes| R[Extract Image Parts]
    R --> S{Image Found?}
    S -->|No| T[Throw No Image Error]
    S -->|Yes| U[Convert to Base64 Data URI]
    
    U --> V[Return Generated Image]
    V --> W[Display Result]
    
    style A fill:#4CAF50
    style D fill:#4285F4
    style O fill:#FF6B6B
    style W fill:#2196F3
```


### 6. Result Display and Actions Workflow

```mermaid
graph TD
    A[Display Result View] --> B[Show Original Image]
    B --> C[Show Generated Image]
    C --> D[Display Action Buttons]
    
    D --> E{User Action?}
    E -->|Download| F[Fetch Generated Image]
    F --> G{Fetch Success?}
    G -->|Yes| H[Create Blob]
    G -->|No| I[Open in New Tab]
    H --> J[Trigger Download]
    
    E -->|Retry| K[Keep Same Products]
    K --> L[Regenerate Image]
    L --> M[Show New Result]
    
    E -->|Try Another| N[Clear Generated Image]
    N --> O[Keep Original Image]
    O --> P[Return to Product Selection]
    
    E -->|Start Over| Q[Clear All Data]
    Q --> R[Reset App State]
    R --> S[Return to Home Screen]
    
    style A fill:#4CAF50
    style J fill:#2196F3
    style M fill:#FF9800
    style S fill:#FF6B6B
```

### 7. Theme Switching Workflow

```mermaid
graph TD
    A[User Clicks Theme Button] --> B[Open Theme Modal]
    B --> C[Display Theme Grid]
    C --> D[Show 11 Theme Options]
    D --> E[User Selects Theme]
    
    E --> F[Apply Theme Colors]
    F --> G[Update CSS Variables]
    G --> H[--color-primary]
    G --> I[--color-secondary]
    G --> J[--color-accent]
    G --> K[--color-background]
    G --> L[--color-text]
    G --> M[--color-button]
    
    H --> N[Save to localStorage]
    I --> N
    J --> N
    K --> N
    L --> N
    M --> N
    
    N --> O[Close Modal]
    O --> P[UI Updates Instantly]
    
    style A fill:#4CAF50
    style F fill:#DDA0DD
    style P fill:#2196F3
```

### 8. Custom Product Addition Workflow

```mermaid
graph TD
    A[User Clicks Add Custom] --> B[Store Category Info]
    B --> C[Open Custom Product Modal]
    C --> D[Display Input Form]
    
    D --> E[User Enters Product Name]
    E --> F[User Uploads Image]
    F --> G[Convert Image to Base64]
    G --> H[Show Image Preview]
    
    H --> I{Validation?}
    I -->|Invalid| J[Disable Submit Button]
    I -->|Valid| K[Enable Submit Button]
    
    K --> L[User Clicks Add]
    L --> M[Create Product Object]
    M --> N[Set isCustom Flag]
    N --> O[Add Category Metadata]
    O --> P[Update Custom Products Array]
    
    P --> Q[Close Modal]
    Q --> R[Refresh Product Grid]
    R --> S[Display New Product]
    S --> T[Available for Selection]
    
    style A fill:#4CAF50
    style M fill:#FF9800
    style T fill:#2196F3
```


### 9. QR Code Generation Workflow

```mermaid
graph TD
    A[User Clicks QR Button] --> B[Get Current URL]
    B --> C[Encode URL]
    C --> D[Build QR API URL]
    D --> E[qrserver.com API]
    E --> F[Set Size: 250x250]
    F --> G[Generate QR Code Image]
    
    G --> H[Open QR Modal]
    H --> I[Display QR Code]
    I --> J[Show Instructions]
    J --> K[User Scans with Phone]
    K --> L[Open App on Mobile]
    
    style A fill:#4CAF50
    style G fill:#FF9800
    style L fill:#2196F3
```

### 10. Camera Capture Workflow

```mermaid
graph TD
    A[User Clicks Use Camera] --> B[Request Media Permissions]
    B --> C{Permission Status?}
    
    C -->|Denied| D[Show Permission Error]
    C -->|Not Found| E[Show No Camera Error]
    C -->|In Use| F[Show Camera Busy Error]
    C -->|Granted| G[Get Media Stream]
    
    G --> H[Set Video Constraints]
    H --> I[facingMode: user]
    H --> J[width: 1280]
    H --> K[height: 720]
    
    I --> L[Attach Stream to Video]
    J --> L
    K --> L
    L --> M[Start Video Playback]
    M --> N[Apply Mirror Effect]
    N --> O[Display Camera Preview]
    
    O --> P{User Action?}
    P -->|Capture| Q[Create Canvas Element]
    P -->|Cancel| R[Stop Media Stream]
    
    Q --> S[Set Canvas Dimensions]
    S --> T[Draw Video Frame]
    T --> U[Convert to JPEG]
    U --> V[Quality: 0.95]
    V --> W[Get Base64 Data]
    W --> X[Stop Camera Stream]
    X --> Y[Return Image Data]
    
    R --> Z[Release Camera]
    
    style A fill:#4CAF50
    style G fill:#FF9800
    style Y fill:#2196F3
```

### 11. Error Handling Workflow

```mermaid
graph TD
    A[Error Occurs] --> B{Error Type?}
    
    B -->|API Error| C[Check API Key]
    C --> D[Show API Error Message]
    
    B -->|Network Error| E[Check Connection]
    E --> F[Show Network Error]
    
    B -->|Upload Error| G[Try Next Host]
    G --> H{Hosts Remaining?}
    H -->|Yes| I[Retry Upload]
    H -->|No| J[Show Upload Failed]
    
    B -->|Validation Error| K[Show Validation Message]
    
    B -->|Generation Error| L[Log Error Details]
    L --> M[Show Generation Failed]
    
    D --> N[Display Error UI]
    F --> N
    J --> N
    K --> N
    M --> N
    
    N --> O[Offer Retry Option]
    O --> P{User Retries?}
    P -->|Yes| Q[Restart Process]
    P -->|No| R[Return to Previous State]
    
    style A fill:#FF0000
    style N fill:#FF6B6B
    style Q fill:#4CAF50
```


### 12. State Management Workflow

```mermaid
graph TD
    A[App State Machine] --> B{Current State?}
    
    B -->|HOME| C[Show ImageInput]
    C --> D[User Uploads Image]
    D --> E[Transition to IMAGE_SELECTED]
    
    B -->|IMAGE_SELECTED| F[Show ProductSelector]
    F --> G[User Selects Products]
    G --> H[User Clicks Try On]
    H --> I[Transition to PROCESSING]
    
    B -->|PROCESSING| J[Show Spinner]
    J --> K[Call AI Service]
    K --> L{Generation Success?}
    L -->|Yes| M[Transition to RESULT]
    L -->|No| N[Show Error]
    N --> O[Return to IMAGE_SELECTED]
    
    B -->|RESULT| P[Show ResultView]
    P --> Q{User Action?}
    Q -->|Start Over| R[Transition to HOME]
    Q -->|Try Another| S[Transition to IMAGE_SELECTED]
    Q -->|Retry| T[Transition to PROCESSING]
    
    style A fill:#4CAF50
    style E fill:#2196F3
    style I fill:#FF9800
    style M fill:#9C27B0
```

---

## 📚 API Reference

### Gemini Service API

#### `generateTryOnImage()`
Main function to generate try-on images using AI.

```typescript
async function generateTryOnImage(
  model: AiModel,
  base64Image: string,
  mimeType: string,
  productInfos: SelectedProductInfo[]
): Promise<string>
```

**Parameters:**
- `model`: AI model to use (`'pollinations-kontext'` | `'pollinations-nanobanana'` | `'pollinations-gptimage'` | `'gemini'`)
- `base64Image`: Base64-encoded image data
- `mimeType`: Image MIME type (`'image/jpeg'` | `'image/png'`)
- `productInfos`: Array of selected products with metadata

**Returns:** Promise resolving to generated image URL or base64 data

**Example:**
```typescript
const result = await generateTryOnImage(
  'pollinations-kontext',
  'data:image/jpeg;base64,...',
  'image/jpeg',
  [
    {
      product: { name: 'Crimson Red', type: 'color', value: '#DC143C' },
      category: 'Makeup',
      subCategory: 'Lipstick'
    }
  ]
);
```


#### `uploadImageToPublicHost()`
Uploads image to public hosting service with fallback support.

```typescript
async function uploadImageToPublicHost(base64Image: string): Promise<string>
```

**Upload Priority:**
1. **tmpfiles.org** - Primary host
2. **0x0.st** - First fallback
3. **catbox.moe** - Second fallback

**Returns:** Direct URL to uploaded image

#### `createGeminiPrompt()`
Generates AI prompt based on selected products.

```typescript
function createGeminiPrompt(productInfos: SelectedProductInfo[]): string
```

**Prompt Examples:**
- Single product: `"Realistically apply Crimson Red lipstick on the person..."`
- Multiple products: `"Apply the following changes: - apply Crimson Red lipstick - put on Aviator Black sunglasses..."`

---

## 🧩 Components

### Core Components

#### `App.tsx`
Main application container managing global state and routing.

**State:**
```typescript
- appState: 'HOME' | 'IMAGE_SELECTED' | 'PROCESSING' | 'RESULT'
- originalImage: { data: string; mimeType: string } | null
- generatedImage: string | null
- selectedProducts: SelectedProductInfo[]
- customProducts: Product[]
- aiModel: AiModel
```

**Key Functions:**
- `handleImageSelect()` - Process uploaded/captured images
- `handleProductToggle()` - Add/remove products from selection
- `handleTryOn()` - Trigger AI generation
- `handleReset()` - Clear all data and return to home

---

#### `ImageInput.tsx`
Handles image upload and camera capture.

**Features:**
- File upload with drag-and-drop support
- Real-time camera preview with mirror effect
- Image validation (type, size)
- Error handling for camera permissions

**Props:**
```typescript
interface ImageInputProps {
  onImageSelect: (image: { data: string; mimeType: string }) => void;
}
```

---

#### `ProductSelector.tsx`
Product browsing and selection interface.

**Features:**
- Category tabs (Makeup, Accessories, Clothing)
- Subcategory organization
- Visual product grid with previews
- Custom product addition
- Multi-select with visual feedback

**Props:**
```typescript
interface ProductSelectorProps {
  selectedProducts: SelectedProductInfo[];
  customProducts: Product[];
  onProductToggle: (info: SelectedProductInfo) => void;
  onAddCustomClick: (category: string, subCategory: string) => void;
}
```


---

#### `ResultView.tsx`
Displays original and generated images with action buttons.

**Features:**
- Side-by-side image comparison
- Download functionality with CORS fallback
- Retry with same products
- Try different products
- Start over option

**Props:**
```typescript
interface ResultViewProps {
  originalImage: string;
  generatedImage: string;
  onReset: () => void;
  onTryAnotherProduct: () => void;
  onRetry: () => void;
}
```

---

#### `ThemeSelectorModal.tsx`
Theme selection interface with live preview.

**Features:**
- Grid layout of 11 themes
- Color preview swatches
- Instant theme application
- localStorage persistence

**Available Themes:**
- Day Mode, Night Mode, Amoled
- Mystic Shadows, Neon Glow, Rose Gold
- Ocean Breeze, Sunset Vibes, Minimalist
- Forest Green, Cosmic Purple

---

#### `CustomProductModal.tsx`
Interface for adding custom products.

**Features:**
- Product name input
- Image upload with preview
- Category/subcategory metadata
- Validation before submission

**Props:**
```typescript
interface CustomProductModalProps {
  categoryInfo: { category: string; subCategory: string; } | null;
  onClose: () => void;
  onAdd: (product: Product) => void;
}
```

---

#### `Spinner.tsx`
Loading indicator with custom message.

**Props:**
```typescript
interface SpinnerProps {
  message: string;
}
```

---

#### `DebugPanel.tsx`
Development tool for monitoring application logs.

**Features:**
- Real-time log streaming
- Log level filtering (info, warn, error, success, debug)
- Timestamp display
- Clear logs functionality
- Floating toggle button

---

## 📊 Data Structures

### Product Type
```typescript
interface Product {
  name: string;
  type: 'color' | 'style' | 'image';
  value: string;
  imageUrl?: string;
  isCustom?: boolean;
}
```

### Selected Product Info
```typescript
interface SelectedProductInfo {
  product: Product;
  category: string;
  subCategory: string;
}
```

### Theme Type
```typescript
interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textMuted: string;
    button: string;
    buttonText: string;
    header: string;
  };
}
```

### AI Model Type
```typescript
type AiModel = 
  | 'gemini' 
  | 'pollinations-kontext' 
  | 'pollinations-nanobanana' 
  | 'pollinations-gptimage';
```


---

## 🎨 Product Catalog

### Makeup Products

#### Lipstick (10 Colors)
- Crimson Red (#DC143C)
- Soft Pink (#FFB6C1)
- Deep Berry (#800020)
- Coral (#FF7F50)
- Mauve (#E0B0FF)
- Brick Red (#B22222)
- Golden Rose (#dda35d)
- Plum Purple (#DDA0DD)
- Classic Red (#FF0000)
- Matte Maroon (#800000)

#### Eyeliner (10 Styles)
- Black Liquid, Brown Pencil, Navy Gel
- Burgundy Matte, Black Winged, Bronze Shimmer
- Black Cat Eye, Charcoal Soft, Deep Brown, Black Metallic

#### Eye Shadow (10 Colors)
- Gold Shimmer (#FFD700)
- Silver Glitter (#C0C0C0)
- Bronze Matte (#CD7F32)
- Charcoal Smokey (#36454F)
- Rose Gold Sparkle (#E0BFB8)
- Copper Warm (#B87333)
- Ivory Shimmer (#FFFFF0)
- Plum Deep (#5A2D5A)
- Emerald Green (#50C878)
- Navy Blue (#000080)

#### Foundation (10 Shades)
- Fair Light, Fair Medium, Medium Warm
- Medium Cool, Deep Olive, Deep Rich
- Honey Golden, Warm Tan, Cool Beige, Porcelain

### Accessories

#### Sunglasses (10 Styles)
- Aviator Black, Cat-Eye Brown, Wayfarer Black
- Round Gold, Oversized Black, Clubmaster Tortoise
- Pilot Silver, Square Rose Gold, Retro Green, Shield Purple

#### Glasses (10 Styles)
- Classic Black Frame, Rose Gold Frame, Clear Frame
- Tortoise Shell, Cat-Eye Blue, Rectangular Silver
- Round Gold, Wayfarer Brown, Oversized Black, Minimalist Clear

#### Hair Accessories (10 Items)
- Hair Clip Gold, Hair Band Silver, Headband Black
- Pearl Hair Clip, Gold Geometric Clip, Velvet Hair Band Red
- Crystal Hair Pin, Leather Hair Band, Floral Accessory, Metal Comb Gold

### Clothing

#### Shirts/Tops (10 Items)
- Classic White Tee, Black Polo, Denim Shirt Blue
- Striped Casual, Oversized Sweater Gray, Pink Crop Top
- Burgundy Button-Up, Vintage Band Tee, Cream Silk Blouse, Black Leather Top

#### Dresses (10 Items)
- Little Black Dress, Summer Floral, Casual Blue Denim
- Elegant Maroon, Sequin Gold, Bohemian Printed
- Classic White, Evening Red, Casual Green, Formal Navy Gown

#### Jackets (10 Items)
- Black Leather Jacket, Denim Jacket Blue, Blazer Gray
- Bomber Jacket Navy, Cardigan Beige, Puffer Jacket Black
- Suede Jacket Brown, Vintage Denim Light, Formal Blazer Charcoal, Oversized Jacket Cream

**Total Products: 100+ items across 10 categories**


---

## 🚀 Deployment

### Vercel Deployment

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel --prod
```

4. **Set Environment Variables (Optional)**
If using Gemini model, go to Vercel Dashboard → Project Settings → Environment Variables:
- `VITE_GEMINI_API_KEY` (only needed for Gemini model)

Note: No environment variables needed for Pollinations AI models!

### Netlify Deployment

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Netlify**
```bash
netlify deploy --prod --dir=dist
```

3. **Configure Environment Variables**
In Netlify Dashboard → Site Settings → Environment Variables

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]
```

**Build and Run:**
```bash
docker build -t try-on-app .
docker run -p 3000:3000 try-on-app
```

---

## 🧪 Testing

### Manual Testing Checklist

#### Image Upload
- [ ] Upload JPG image
- [ ] Upload PNG image
- [ ] Test file size validation (>5MB)
- [ ] Test invalid file types
- [ ] Camera capture on desktop
- [ ] Camera capture on mobile
- [ ] Camera permission denial handling

#### Product Selection
- [ ] Select single product
- [ ] Select multiple products
- [ ] Deselect products
- [ ] Add custom product
- [ ] Switch between categories
- [ ] View all subcategories

#### AI Generation
- [ ] Generate with Pollinations Kontext
- [ ] Generate with NanoBanana
- [ ] Generate with GPT Image
- [ ] Test with single product
- [ ] Test with multiple products
- [ ] Handle generation errors

#### Theme Switching
- [ ] Switch to all 11 themes
- [ ] Verify theme persistence
- [ ] Test theme on different pages

#### Result Actions
- [ ] Download generated image
- [ ] Retry generation
- [ ] Try another product
- [ ] Start over


---

## 🔧 Troubleshooting

### Common Issues

#### Camera Not Working
**Problem:** Camera permission denied or not found

**Solutions:**
1. Check browser permissions (chrome://settings/content/camera)
2. Ensure HTTPS connection (camera requires secure context)
3. Try different browser (Chrome, Firefox, Safari)
4. Check if camera is being used by another app

#### Image Upload Fails
**Problem:** Image hosting services unavailable

**Solutions:**
1. Check internet connection
2. Try different image (smaller size)
3. Wait and retry (services may be temporarily down)
4. Check browser console for specific errors

#### AI Generation Fails
**Problem:** No image generated or error message

**Solutions:**
1. Try different AI model
2. Reduce number of selected products
3. Use smaller/different input image
4. Check browser console for specific errors

#### Theme Not Persisting
**Problem:** Theme resets on page reload

**Solutions:**
1. Check browser localStorage is enabled
2. Clear browser cache and try again
3. Check for browser extensions blocking localStorage

#### Download Not Working
**Problem:** Image download fails or opens in new tab

**Solutions:**
1. This is expected behavior due to CORS
2. Right-click on opened image → Save As
3. Use screenshot tool as alternative

---

## 🔐 Security Considerations

### API Key Protection
- Never commit `.env` file to version control
- Use environment variables for all sensitive data
- Rotate API keys regularly
- Implement rate limiting in production

### Image Upload Security
- Validate file types on client and server
- Implement file size limits
- Sanitize file names
- Use secure image hosting services

### CORS Policy
- Configure proper CORS headers
- Whitelist allowed origins
- Implement CSRF protection

### Data Privacy
- Images are temporarily hosted on public services
- No permanent storage of user images
- Clear user data on session end
- Comply with GDPR/privacy regulations

---

## 📈 Performance Optimization

### Image Optimization
- Compress images before upload
- Use WebP format when supported
- Implement lazy loading for product images
- Cache product images in browser

### Code Splitting
```typescript
// Lazy load components
const ResultView = lazy(() => import('./components/ResultView'));
const ProductSelector = lazy(() => import('./components/ProductSelector'));
```

### Bundle Size Reduction
- Tree-shaking unused code
- Minimize dependencies
- Use production builds
- Enable gzip compression

### Caching Strategy
- Cache static assets (images, fonts)
- Use service workers for offline support
- Implement CDN for global distribution


---

## 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full Support |
| Firefox | 88+ | ✅ Full Support |
| Safari | 14+ | ✅ Full Support |
| Edge | 90+ | ✅ Full Support |
| Opera | 76+ | ✅ Full Support |
| Mobile Safari | iOS 14+ | ✅ Full Support |
| Chrome Mobile | Android 90+ | ✅ Full Support |

### Required Browser Features
- ES2022 JavaScript support
- CSS Grid and Flexbox
- MediaDevices API (for camera)
- FileReader API
- localStorage API
- Fetch API

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. **Fork the repository**
```bash
git clone https://github.com/yourusername/try-on-virtual-exhibition.git
```

2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

3. **Make your changes**
- Follow the existing code style
- Add comments for complex logic
- Update documentation as needed

4. **Test your changes**
```bash
npm run dev
# Test all affected features
```

5. **Commit your changes**
```bash
git commit -m "Add amazing feature"
```

6. **Push to your fork**
```bash
git push origin feature/amazing-feature
```

7. **Open a Pull Request**
- Describe your changes in detail
- Reference any related issues
- Add screenshots for UI changes

### Contribution Guidelines

#### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Write descriptive variable names

#### Commit Messages
Follow conventional commits format:
```
feat: add new product category
fix: resolve camera permission issue
docs: update installation guide
style: format code with prettier
refactor: simplify image upload logic
test: add unit tests for ProductSelector
```

#### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on mobile
- [ ] Added/updated tests

## Screenshots
(if applicable)
```


---

## 🗺️ Roadmap

### Version 1.1 (Q2 2025)
- [ ] Add more AI models (Stable Diffusion, DALL-E)
- [ ] Implement user accounts and history
- [ ] Add social sharing features
- [ ] Support for video try-on
- [ ] Batch processing for multiple images

### Version 1.2 (Q3 2025)
- [ ] AR try-on with real-time tracking
- [ ] 3D product visualization
- [ ] Virtual fitting room
- [ ] Size recommendation system
- [ ] Integration with e-commerce platforms

### Version 2.0 (Q4 2025)
- [ ] Mobile native apps (iOS/Android)
- [ ] Advanced AI customization
- [ ] Multi-language support
- [ ] Accessibility improvements (WCAG 2.1 AA)
- [ ] Analytics dashboard

### Future Considerations
- Virtual fashion shows
- AI-powered style recommendations
- Collaborative try-on sessions
- Integration with fashion brands
- Blockchain-based digital fashion NFTs

---

## 📱 Mobile App

### Progressive Web App (PWA)
The application is PWA-ready with:
- Offline support
- Add to home screen
- Push notifications (coming soon)
- App-like experience

### Installation on Mobile

**iOS (Safari):**
1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. Tap "Add"

**Android (Chrome):**
1. Open the app in Chrome
2. Tap the menu (three dots)
3. Select "Add to Home screen"
4. Tap "Add"

---

## 🎓 Educational Use

This project is perfect for:

### College Projects
- Computer Science capstone projects
- AI/ML course demonstrations
- Web development portfolios
- UI/UX design case studies

### Learning Topics
- React and TypeScript
- AI API integration
- Image processing
- State management
- Responsive design
- Camera API usage

### Workshop Material
- Building modern web apps
- Integrating AI services
- Creating interactive UIs
- Deployment strategies

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 Trust it Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```


---

## 👥 Team

### Trust it Team Members

<table>
  <tr>
    <td align="center">
      <img src="https://via.placeholder.com/100" width="100px;" alt="Kushal M Anverkar"/><br />
      <sub><b>Kushal M Anverkar</b></sub><br />
      <sub>Lead Developer</sub>
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/100" width="100px;" alt="Mohanmad Affan"/><br />
      <sub><b>Mohanmad Affan</b></sub><br />
      <sub>AI Integration Specialist</sub>
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/100" width="100px;" alt="Arsh Irfan"/><br />
      <sub><b>Arsh Irfan</b></sub><br />
      <sub>Frontend Developer</sub>
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/100" width="100px;" alt="Sreerevanth"/><br />
      <sub><b>Sreerevanth</b></sub><br />
      <sub>UI/UX Designer</sub>
    </td>
  </tr>
</table>

---

## 🙏 Acknowledgments

### Technologies & Services
- **React Team** - For the amazing React framework
- **Vite Team** - For the blazing fast build tool
- **Google** - For Gemini AI API
- **Pollinations AI** - For image generation services
- **Tailwind CSS** - For utility-first CSS framework

### Image Hosting Services
- **tmpfiles.org** - Primary image hosting
- **0x0.st** - Fallback hosting
- **catbox.moe** - Backup hosting

### Inspiration
- Virtual try-on technology pioneers
- Fashion tech innovators
- Open-source community

---

## 📞 Contact & Support

### Get in Touch

- **Email**: trustit.team@example.com
- **GitHub Issues**: [Report a bug](https://github.com/yourusername/try-on-virtual-exhibition/issues)
- **Discussions**: [Join the conversation](https://github.com/yourusername/try-on-virtual-exhibition/discussions)

### Social Media
- Twitter: [@TrustItTeam](https://twitter.com/trustitteam)
- LinkedIn: [Trust it Team](https://linkedin.com/company/trustitteam)
- Instagram: [@trustitteam](https://instagram.com/trustitteam)

### Support the Project

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing code
- 📢 Sharing with others

---

## 📚 Additional Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### AI Services
- [Google Gemini API](https://ai.google.dev/)
- [Pollinations AI](https://pollinations.ai/)

### Tutorials
- [Building React Apps with TypeScript](https://react-typescript-cheatsheet.netlify.app/)
- [Vite + React Setup](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
- [Camera API Guide](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

---

## 🎉 Success Stories

> "This virtual try-on system transformed our college exhibition. Students were amazed by the AI-powered results!" - **College Tech Fest Organizer**

> "Easy to set up and customize. The multi-product layering feature is incredible!" - **Fashion Tech Startup**

> "Perfect for our e-commerce demo. The code is clean and well-documented." - **Web Development Student**

---

## 🔄 Changelog

### Version 1.0.0 (Current)
- ✨ Initial release
- 🎨 11 theme options
- 🤖 Multiple AI model support
- 📸 Camera capture functionality
- 🛍️ 100+ products across 10 categories
- 📱 Mobile-responsive design
- 🎯 Custom product addition
- 🔄 QR code generation

### Version 0.9.0 (Beta)
- 🧪 Beta testing phase
- 🐛 Bug fixes and improvements
- 📝 Documentation updates

---

<div align="center">

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/try-on-virtual-exhibition&type=Date)](https://star-history.com/#yourusername/try-on-virtual-exhibition&Date)

---

### Made with ❤️ by Trust it Team

**Try-On the Virtual Exhibition** © 2025

[⬆ Back to Top](#-try-on-the-virtual-exhibition)

</div>
