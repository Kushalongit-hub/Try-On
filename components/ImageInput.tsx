import React, { useState, useRef, useCallback } from 'react';

interface ImageInputProps {
    onImageSelect: (image: { data: string; mimeType: string }) => void;
}

const fileToDataUri = (file: File): Promise<{ data: string; mimeType: string }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target?.result) {
                resolve({ data: event.target.result as string, mimeType: file.type });
            } else {
                reject(new Error("Failed to read file"));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;

const ImageInput: React.FC<ImageInputProps> = ({ onImageSelect }) => {
    const [error, setError] = useState<string | null>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const file = event.target.files?.[0];
        if (file) {
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                setError('Invalid file type. Please upload a JPG or PNG image.');
                return;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError('File is too large. Please upload an image under 5MB.');
                return;
            }
            try {
                const imageData = await fileToDataUri(file);
                onImageSelect(imageData);
            } catch (err) {
                setError('Could not process the image file.');
            }
        }
    };

    const startCamera = async () => {
        setError(null);
        try {
            console.log('📷 Requesting camera access...');
            
            // Request camera with better constraints
            const constraints = {
                video: {
                    facingMode: 'user',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            };
            
            streamRef.current = await navigator.mediaDevices.getUserMedia(constraints);
            console.log('✅ Camera access granted');
            
            if (videoRef.current) {
                videoRef.current.srcObject = streamRef.current;
                await videoRef.current.play();
                console.log('✅ Camera stream started');
            }
            setIsCapturing(true);
        } catch (err: any) {
            console.error('❌ Camera error:', err);
            let errorMessage = 'Could not access the camera. ';
            
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                errorMessage += 'Please allow camera access in your browser settings.';
            } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
                errorMessage += 'No camera found on your device.';
            } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
                errorMessage += 'Camera is already in use by another application.';
            } else {
                errorMessage += 'Please check your browser permissions and try again.';
            }
            
            setError(errorMessage);
        }
    };

    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setIsCapturing(false);
    }, []);

    const captureImage = () => {
        console.log('📸 Capturing image from camera...');
        
        if (videoRef.current && videoRef.current.videoWidth > 0) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            
            console.log('📐 Canvas size:', canvas.width, 'x', canvas.height);
            
            const context = canvas.getContext('2d');
            if (context) {
                // Draw the video frame to canvas
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                
                // Convert to JPEG with good quality
                const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
                console.log('✅ Image captured, size:', Math.round(dataUrl.length / 1024), 'KB');
                
                onImageSelect({ data: dataUrl, mimeType: 'image/jpeg' });
            } else {
                console.error('❌ Could not get canvas context');
                setError('Failed to capture image. Please try again.');
            }
            stopCamera();
        } else {
            console.error('❌ Video not ready or invalid dimensions');
            setError('Camera not ready. Please wait a moment and try again.');
        }
    };
    
    if (isCapturing) {
        return (
            <div className="w-full max-w-2xl mx-auto p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold text-[var(--color-header)] mb-4 text-center">📷 Camera</h2>
                <div className="relative bg-black rounded-lg overflow-hidden">
                    <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        muted
                        className="w-full rounded-lg"
                        style={{ transform: 'scaleX(-1)' }} // Mirror the video
                    />
                </div>
                {error && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}
                <div className="flex justify-center space-x-4 mt-6">
                    <button 
                        onClick={captureImage} 
                        className="px-8 py-3 bg-[var(--color-button)] text-[var(--color-button-text)] font-bold rounded-full shadow-lg hover:opacity-90 transition-transform transform hover:scale-105 duration-300"
                    >
                        📸 Capture Photo
                    </button>
                    <button 
                        onClick={stopCamera} 
                        className="px-8 py-3 bg-gray-300 text-gray-800 font-bold rounded-full shadow-lg hover:bg-gray-400 transition-transform transform hover:scale-105 duration-300"
                    >
                        ❌ Cancel
                    </button>
                </div>
                <p className="text-center text-sm text-[var(--color-text-muted)] mt-4">
                    💡 Position your face in the frame and click "Capture Photo"
                </p>
            </div>
        )
    }

    return (
        <div className="w-full max-w-md mx-auto p-8 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow-xl text-center">
            <h2 className="text-2xl font-bold text-[var(--color-header)] mb-2">Let's Get Started!</h2>
            <p className="text-[var(--color-text-muted)] mb-6">Upload a photo or use your camera to begin your virtual try-on experience.</p>
            {error && <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{error}</p>}
            <div className="flex flex-col space-y-4">
                <label htmlFor="file-upload" className="cursor-pointer flex items-center justify-center w-full px-6 py-3 bg-[var(--color-button)] text-[var(--color-button-text)] font-semibold rounded-full shadow-lg hover:opacity-90 transition-transform transform hover:scale-105 duration-300">
                    <UploadIcon />
                    Upload an Image
                </label>
                <input id="file-upload" type="file" accept="image/png, image/jpeg" className="hidden" onChange={handleFileChange} />

                <button onClick={startCamera} className="flex items-center justify-center w-full px-6 py-3 bg-gray-700 text-white font-semibold rounded-full shadow-lg hover:bg-gray-800 transition-transform transform hover:scale-105 duration-300">
                    <CameraIcon />
                    Use Camera
                </button>
            </div>
        </div>
    );
};

export default ImageInput;
