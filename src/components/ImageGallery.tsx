
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewAll, setViewAll] = useState(false);

  const handleNextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative">
      {viewAll ? (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-auto p-4">
          <div className="max-w-6xl mx-auto pt-16">
            <Button 
              variant="ghost" 
              className="absolute top-4 right-4 text-white hover:bg-white/10"
              onClick={() => setViewAll(false)}
            >
              إغلاق
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div key={index} className="aspect-video overflow-hidden rounded-md">
                  <img 
                    src={image}
                    alt={`صورة ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="aspect-[16/9] overflow-hidden rounded-lg mb-4">
            <img 
              src={images[activeIndex]} 
              alt="صورة العقار"
              className="w-full h-full object-cover"
            />
            
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {activeIndex + 1} / {images.length}
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full aspect-square"
              onClick={handleNextImage}
            >
              <ChevronRight className="h-5 w-5 text-gray-800" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full aspect-square"
              onClick={handlePrevImage}
            >
              <ChevronLeft className="h-5 w-5 text-gray-800" />
            </Button>
            
            <Button 
              variant="ghost" 
              className="absolute bottom-4 left-4 bg-white/80 hover:bg-white text-gray-800 font-medium text-sm rounded-md"
              onClick={() => setViewAll(true)}
            >
              عرض جميع الصور
            </Button>
          </div>
          
          <div className="hidden md:grid grid-cols-5 gap-4">
            {images.slice(0, 5).map((image, index) => (
              <div 
                key={index}
                className={`aspect-video overflow-hidden rounded-lg cursor-pointer ${
                  index === activeIndex ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img 
                  src={image} 
                  alt={`صورة مصغرة ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {index === 4 && images.length > 5 && (
                  <div 
                    className="absolute inset-0 bg-black/50 flex items-center justify-center text-white"
                    onClick={(e) => { 
                      e.stopPropagation();
                      setViewAll(true);
                    }}
                  >
                    <span className="text-lg font-medium">+{images.length - 5}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
