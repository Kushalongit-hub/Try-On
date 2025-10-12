import React from 'react';

interface ResultViewProps {
    originalImage: string;
    generatedImage: string;
    onReset: () => void;
    onTryAnotherProduct: () => void;
    onRetry: () => void;
}

const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const RetryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;
const RedoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;

const ResultView: React.FC<ResultViewProps> = ({ originalImage, generatedImage, onReset, onTryAnotherProduct, onRetry }) => {
    // NOTE: generatedImage is the Pollinations URL
    // The browser loads it automatically using the img tag's onload event

    const handleDownload = async () => {
        try {
            // Fetch the image for download
            const response = await fetch(generatedImage);
            if (!response.ok) throw new Error('Network response was not ok.');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'virtual-exhibition-try-on.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed, likely due to CORS policy. Opening image in new tab as fallback.", error);
            // Fallback for when fetch fails (e.g., CORS issues with pollinations.ai)
            const link = document.createElement('a');
            link.href = generatedImage;
            link.download = 'virtual-exhibition-try-on.png';
            link.target = '_blank'; // Open in new tab as a fallback
             document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            alert("Could not download automatically. Your image has been opened in a new tab. Please save it from there.");
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow-xl text-center">
            <h2 className="text-3xl font-bold text-[var(--color-header)] mb-4">Your New Look!</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center">
                    <h3 className="font-semibold text-lg text-[var(--color-text)] mb-2">Original</h3>
                    <img src={originalImage} alt="Original" className="rounded-lg shadow-md w-full object-contain" />
                </div>
                <div className="text-center">
                    <h3 className="font-semibold text-lg text-[var(--color-text)] mb-2">Try-On Result</h3>
                    <img src={generatedImage} alt="Generated Try-On" className="rounded-lg shadow-md w-full object-contain" />
                </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
                 <button onClick={handleDownload} className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-[var(--color-button)] text-[var(--color-button-text)] font-semibold rounded-full shadow-lg hover:opacity-90 transition-transform transform hover:scale-105 duration-300">
                    <DownloadIcon />
                    Save Result
                </button>
                <button onClick={onRetry} className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300">
                    <RetryIcon />
                    Retry Same
                </button>
                <button onClick={onTryAnotherProduct} className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-gray-700 text-white font-semibold rounded-full shadow-lg hover:bg-gray-800 transition-transform transform hover:scale-105 duration-300">
                    <RedoIcon />
                    Try Another Product
                </button>
                <button onClick={onReset} className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-full shadow-md hover:bg-gray-400 transition-transform transform hover:scale-105 duration-300">
                    <HomeIcon />
                    Start Over
                </button>
            </div>
        </div>
    );
};

export default ResultView;
