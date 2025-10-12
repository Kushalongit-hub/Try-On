import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import ImageInput from './components/ImageInput';
import ProductSelector from './components/ProductSelector';
import ResultView from './components/ResultView';
import Spinner from './components/Spinner';
import { generateTryOnImage } from './services/geminiService';
import type { AppState, SelectedProductInfo, Theme, Product, AiModel } from './types';
import { themes } from './themes';

// --- ICONS ---
const ThemeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>;
const QRIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 3h-1m4 4h-1m-3 6v1M4 12H3m3-6V5m14 4h1m-6 7v1m-7-3H5m3-7V5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h2v2H5zm4 0h2v2H9zm4 0h2v2h-2zm-4 4h2v2H9zm4 0h2v2h-2z" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

// --- THEMES ---
const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
        const cssVarName = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        root.style.setProperty(cssVarName, value);
    });
};

const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target?.result) resolve(event.target.result as string);
            else reject(new Error("Failed to read file"));
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

// --- SUB-COMPONENTS ---
const Header: React.FC<{ onThemeClick: () => void; onQRCodeClick: () => void; }> = ({ onThemeClick, onQRCodeClick }) => (
    <header className="text-center p-4 relative">
        <div className="absolute top-4 right-4 flex gap-2">
            <button onClick={onThemeClick} title="Change Theme" className="p-2 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors duration-300 backdrop-blur-sm"><ThemeIcon /></button>
            <button onClick={onQRCodeClick} title="Show QR Code" className="p-2 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors duration-300 backdrop-blur-sm"><QRIcon /></button>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: 'var(--color-accent)' }}>
            Try-On the <span style={{ color: 'var(--color-header)' }}>Virtual Exhibition</span>
        </h1>
        <p className="text-md mt-1" style={{ color: 'var(--color-text-muted)' }}>Experience Fashion Like Never Before</p>
    </header>
);

const Footer = () => (
    <footer className="text-center p-4 mt-8">
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Made by Trust it | members: Kushal M Anverkar, Mohanmad Affan, Arsh Irfan & Sreerevanth
        </p>
    </footer>
);

const ThemeSelectorModal: React.FC<{ onSelect: (theme: Theme) => void; onClose: () => void }> = ({ onSelect, onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-[var(--color-background)] rounded-2xl shadow-xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[var(--color-header)]">Select a Theme</h3>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><CloseIcon /></button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {themes.map(theme => (
                    <div key={theme.name} onClick={() => onSelect(theme)} className="cursor-pointer text-center group">
                        <div className="h-24 w-full rounded-lg flex flex-wrap overflow-hidden shadow-md transition-transform transform group-hover:scale-105 border-2 border-gray-200 dark:border-gray-700">
                            <div style={{ flexBasis: '100%', height: '40%', backgroundColor: theme.colors.background }}></div>
                            <div style={{ flexBasis: '50%', height: '60%', backgroundColor: theme.colors.primary }}></div>
                            <div style={{ flexBasis: '50%', height: '60%', backgroundColor: theme.colors.accent }}></div>
                        </div>
                        <p className="mt-2 text-sm font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]">{theme.name}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const QRCodeModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const qrCodeUrl = useMemo(() => `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(window.location.href)}`, []);
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[var(--color-background)] rounded-2xl shadow-xl p-6 text-center relative">
                <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><CloseIcon /></button>
                <h3 className="text-xl font-bold text-[var(--color-header)] mb-2">Scan to Open on Mobile</h3>
                <img src={qrCodeUrl} alt="QR Code" className="mx-auto rounded-lg shadow-md" />
                <p className="mt-4 text-sm text-[var(--color-text-muted)]">Open your phone's camera and point it here!</p>
            </div>
        </div>
    );
};

const CustomProductModal: React.FC<{
    categoryInfo: { category: string; subCategory: string; } | null;
    onClose: () => void;
    onAdd: (product: Product) => void;
}> = ({ categoryInfo, onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const dataUri = await fileToDataUri(file);
            setImage(dataUri);
        }
    };

    const handleSubmit = () => {
        if (name && image && categoryInfo) {
            const newProduct: Product = {
                name,
                type: 'image',
                value: image,
                imageUrl: image,
                isCustom: true,
                ...categoryInfo
            };
            onAdd(newProduct);
        }
    };
    
    if (!categoryInfo) return null;

    return (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[var(--color-background)] rounded-2xl shadow-xl p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-[var(--color-header)]">Add Custom {categoryInfo.subCategory}</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><CloseIcon /></button>
                </div>
                <div className="space-y-4">
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Product Name" className="w-full p-2 border rounded bg-transparent border-gray-400" />
                    <input type="file" accept="image/png, image/jpeg" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                    <button onClick={() => fileInputRef.current?.click()} className="w-full p-2 border-2 border-dashed rounded border-gray-400 text-[var(--color-text-muted)]">
                        {image ? <img src={image} alt="preview" className="h-24 mx-auto"/> : 'Upload Image'}
                    </button>
                    <button onClick={handleSubmit} disabled={!name || !image} className="w-full py-2 bg-[var(--color-button)] text-[var(--color-button-text)] font-bold rounded-full disabled:bg-gray-400">Add Product</button>
                </div>
            </div>
        </div>
    )
}

const SelectedProductsView: React.FC<{ products: SelectedProductInfo[], onRemove: (productName: string) => void }> = ({ products, onRemove }) => (
    <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow-xl p-4">
        <h4 className="font-bold text-[var(--color-header)] mb-2">Selected Items ({products.length})</h4>
        {products.length === 0 ? (
            <p className="text-sm text-[var(--color-text-muted)]">Select products to begin your try-on.</p>
        ) : (
            <div className="flex flex-wrap gap-2">
                {products.map(info => (
                    <div key={info.product.name} className="flex items-center bg-[var(--color-primary)] text-[var(--color-button-text)] text-sm font-semibold pl-3 pr-1 py-1 rounded-full">
                        <span>{info.product.name}</span>
                        <button onClick={() => onRemove(info.product.name)} className="ml-2 w-5 h-5 flex items-center justify-center rounded-full bg-black/20 text-white/70 hover:text-white hover:bg-black/40">&times;</button>
                    </div>
                ))}
            </div>
        )}
    </div>
);

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>('HOME');
    const [originalImage, setOriginalImage] = useState<{ data: string; mimeType: string } | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<SelectedProductInfo[]>([]);
    const [customProducts, setCustomProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [aiModel, setAiModel] = useState<AiModel>('pollinations-kontext');

    const [isThemeModalOpen, setThemeModalOpen] = useState(false);
    const [isQRModalOpen, setQRModalOpen] = useState(false);
    const [isCustomProductModalOpen, setCustomProductModalOpen] = useState(false);
    const [customProductCategory, setCustomProductCategory] = useState<{category: string, subCategory: string} | null>(null);

    useEffect(() => {
        const savedThemeName = localStorage.getItem('app-theme') || 'Day Mode';
        const savedTheme = themes.find(t => t.name === savedThemeName) || themes[0];
        applyTheme(savedTheme);
    }, []);

    const handleThemeSelect = (theme: Theme) => {
        applyTheme(theme);
        localStorage.setItem('app-theme', theme.name);
        setThemeModalOpen(false);
    };

    const handleImageSelect = useCallback((imageData: { data: string; mimeType: string }) => {
        setOriginalImage(imageData);
        setGeneratedImage(null);
        setSelectedProducts([]);
        setError(null);
        setAppState('IMAGE_SELECTED');
    }, []);
    
    const handleProductToggle = useCallback((productInfo: SelectedProductInfo) => {
        setSelectedProducts(prev => {
            const isSelected = prev.some(p => p.product.name === productInfo.product.name);
            if (isSelected) {
                return prev.filter(p => p.product.name !== productInfo.product.name);
            } else {
                return [...prev, productInfo];
            }
        });
    }, []);
    
    const handleRemoveProduct = useCallback((productName: string) => {
        setSelectedProducts(prev => prev.filter(p => p.product.name !== productName));
    }, []);

    const handleTryOn = async () => {
        if (!originalImage || selectedProducts.length === 0) {
            setError("Please select both an image and at least one product.");
            return;
        }
        
        setAppState('PROCESSING');
        setError(null);
        
        try {
            const result = await generateTryOnImage(aiModel, originalImage.data, originalImage.mimeType, selectedProducts);
            setGeneratedImage(result);
            setAppState('RESULT');
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred during image generation. Please try again.');
            setAppState('IMAGE_SELECTED');
        }
    };

    const handleRetry = useCallback(async () => {
        if (!originalImage || selectedProducts.length === 0) {
            setError("Cannot retry: missing image or products.");
            return;
        }
        
        setAppState('PROCESSING');
        setError(null);
        
        try {
            const result = await generateTryOnImage(aiModel, originalImage.data, originalImage.mimeType, selectedProducts);
            setGeneratedImage(result);
            setAppState('RESULT');
        } catch (err: any) {
            setError(err.message || 'Retry failed. Please try again.');
            setAppState('RESULT');
        }
    }, [originalImage, selectedProducts, aiModel]);

    const handleReset = useCallback(() => {
        setAppState('HOME');
        setOriginalImage(null);
        setGeneratedImage(null);
        setSelectedProducts([]);
        setError(null);
    }, []);

    const handleTryAnotherProduct = useCallback(() => {
        setAppState('IMAGE_SELECTED');
        setGeneratedImage(null);
        setSelectedProducts([]);
        setError(null);
    }, []);
    
    const handleChangeImage = useCallback(() => {
        handleReset();
    }, [handleReset]);

    const handleOpenCustomModal = (category: string, subCategory: string) => {
        setCustomProductCategory({ category, subCategory });
        setCustomProductModalOpen(true);
    };

    const handleAddCustomProduct = (product: Product) => {
        setCustomProducts(prev => [...prev, product]);
        setCustomProductModalOpen(false);
    };


    const renderContent = () => {
        switch (appState) {
            case 'HOME':
                return <ImageInput onImageSelect={handleImageSelect} />;
            case 'IMAGE_SELECTED':
            case 'PROCESSING':
                return (
                    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                        <div className="w-full space-y-4">
                            <img src={originalImage!.data} alt="User upload" className="rounded-2xl shadow-xl w-full" />
                             <button onClick={handleChangeImage} className="w-full py-2 px-4 bg-gray-700 text-white font-semibold rounded-full shadow-md hover:bg-gray-800 transition duration-300">
                                Change Image
                            </button>
                        </div>
                        <div className="w-full space-y-4">
                           {appState === 'PROCESSING' ? (
                                <div className="h-full flex items-center justify-center bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow-xl p-4 min-h-[400px]">
                                   <Spinner message="Uploading image and generating with Pollinations AI..." />
                                </div>
                            ) : (
                                <>
                                    <SelectedProductsView products={selectedProducts} onRemove={handleRemoveProduct} />
                                    <ProductSelector selectedProducts={selectedProducts} customProducts={customProducts} onProductToggle={handleProductToggle} onAddCustomClick={handleOpenCustomModal} />
                                    <div className="flex flex-col gap-4">
                                        <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-lg p-3 text-sm">
                                            <p className="text-purple-800 dark:text-purple-200">
                                                <strong>🎨 Powered by Pollinations AI</strong> - Your image will be uploaded to a public host (ImgBB/Imgur) to generate the try-on result.
                                            </p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                                            <select 
                                                value={aiModel} 
                                                onChange={e => {
                                                    const newModel = e.target.value as AiModel;
                                                    setAiModel(newModel);
                                                }} 
                                                className="w-full sm:w-auto p-3 bg-white/80 dark:bg-gray-800/80 rounded-full font-semibold border-2 border-transparent focus:border-[var(--color-primary)] focus:outline-none"
                                            >
                                                <option value="pollinations-kontext">🎨 Kontext (Recommended)</option>
                                                <option value="pollinations-nanobanana">⚡ NanoBanana (Fast)</option>
                                                <option value="pollinations-gptimage">🤖 GPT Image (Creative)</option>
                                            </select>
                                            <button
                                                onClick={handleTryOn}
                                                disabled={selectedProducts.length === 0}
                                                className="w-full sm:flex-1 py-3 px-6 bg-[var(--color-button)] text-[var(--color-button-text)] font-bold text-lg rounded-full shadow-lg hover:opacity-90 transition-transform transform hover:scale-105 duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none"
                                            >
                                                Try On {selectedProducts.length > 0 ? `(${selectedProducts.length})` : ''}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                );
            case 'RESULT':
                return (
                    <ResultView
                        originalImage={originalImage!.data}
                        generatedImage={generatedImage!}
                        onReset={handleReset}
                        onTryAnotherProduct={handleTryAnotherProduct}
                        onRetry={handleRetry}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col justify-between p-4">
            {isThemeModalOpen && <ThemeSelectorModal onSelect={handleThemeSelect} onClose={() => setThemeModalOpen(false)} />}
            {isQRModalOpen && <QRCodeModal onClose={() => setQRModalOpen(false)} />}
            {isCustomProductModalOpen && <CustomProductModal categoryInfo={customProductCategory} onAdd={handleAddCustomProduct} onClose={() => setCustomProductModalOpen(false)} />}
            
            <Header onThemeClick={() => setThemeModalOpen(true)} onQRCodeClick={() => setQRModalOpen(true)}/>
            <main className="flex-grow flex items-center justify-center">
                <div className="w-full">
                    {error && (
                      <div className="max-w-6xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                          <strong className="font-bold">Error: </strong>
                          <span className="block sm:inline">{error}</span>
                      </div>
                    )}
                    {renderContent()}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;
