import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { Upload, User, Loader2 } from 'lucide-react';

const AvatarUpload = ({ onUpload, initialUrl }) => {
    const [preview, setPreview] = useState(initialUrl);
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setLoading(true);

        try {
            const options = {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 500,
                useWebWorker: true,
            };

            const compressedFile = await imageCompression(file, options);
            const url = URL.createObjectURL(compressedFile);

            setPreview(url);
            if (onUpload) onUpload(compressedFile);
        } catch (error) {
            console.error('Error compressing image:', error);
        } finally {
            setLoading(false);
        }
    }, [onUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false,
    });

    return (
        <div className="flex flex-col items-center gap-4">
            <div
                {...getRootProps()}
                className={`relative flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed transition-all ${isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-slate-600 hover:border-slate-400 bg-slate-900'
                    }`}
            >
                <input {...getInputProps()} />

                {loading ? (
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                ) : preview ? (
                    <img src={preview} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                    <div className="flex flex-col items-center text-slate-400">
                        <Upload className="h-6 w-6 mb-1" />
                        <span className="text-xs">Upload</span>
                    </div>
                )}

                {/* Hover overlay hint */}
                {!loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                        <span className="text-xs font-medium text-white">Change</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvatarUpload;
