export interface Product {
  name: string;
  type: 'color' | 'style' | 'image';
  value: string; // Hex code for color, descriptive name for style, or image URL for custom products
  imageUrl?: string; // URL for product preview image
  isCustom?: boolean;
}

export interface ProductCategory {
  name:string;
  icon: React.ComponentType<{ className?: string }>;
  items: {
    [subCategory: string]: Product[];
  };
}

export type AppState = 'HOME' | 'IMAGE_SELECTED' | 'PROCESSING' | 'RESULT';

export interface SelectedProductInfo {
    product: Product;
    category: string;
    subCategory: string;
}

export interface Theme {
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

export type AiModel = 'gemini' | 'pollinations-kontext' | 'pollinations-nanobanana' | 'pollinations-gptimage';
