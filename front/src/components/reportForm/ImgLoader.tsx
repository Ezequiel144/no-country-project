"use client"
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

interface ImgLoaderProps {
    onImageUpload: (images: File[]) => void;
}

const ImgLoader: React.FC<ImgLoaderProps> = ({ onImageUpload }) => {
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const newPreviews = Array.from(files).map((file) =>
                URL.createObjectURL(file)
            );
            const newImages = Array.from(files);
            if (selectedImages.length + newImages.length <= 6) {
                setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
                setSelectedImages((prevImages) => {
                    const updatedImages = [...prevImages, ...newImages];
                    onImageUpload(updatedImages);
                    return updatedImages;
                });
            } else {
                alert('Puedes subir un máximo de 6 imágenes');
            }
        }
    };

    const handleRemoveImage = (indexToRemove: number) => {
        const updatedPreviews = imagePreviews.filter((_, index) => index !== indexToRemove);
        const updatedImages = selectedImages.filter((_, index) => index !== indexToRemove);

        setImagePreviews(updatedPreviews);
        setSelectedImages(updatedImages);
        onImageUpload(updatedImages);
    };

    return (
        <div className="flex flex-col items-center w-full">
            {imagePreviews.length === 0 ? (
                <div className="border-dashed border-4 border-primary p-8 rounded-3xl flex flex-col items-center justify-center w-4/6 h-48">
                    <label
                        htmlFor="imageUpload"
                        className="cursor-pointer text-primary text-lg font-semibold"
                    >
                        Subir imágenes (png, jpg)
                    </label>
                    <input
                        type="file"
                        id="imageUpload"
                        name="imageUpload"
                        accept="image/png, image/jpeg"
                        onChange={handleImageUpload}
                        multiple
                        className="hidden"
                    />
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-4">
                    {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative w-full h-40">
                            <img
                                src={preview}
                                alt={`Upload Preview ${index + 1}`}
                                className="w-full h-full object-cover rounded-3xl"
                            />
                            <button
                                className="absolute top-2 right-2 bg-accent text-white rounded-full p-2 hover:scale-110 hover:duration-300"
                                onClick={() => handleRemoveImage(index)}
                            >
                                <FaTrash size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImgLoader;
