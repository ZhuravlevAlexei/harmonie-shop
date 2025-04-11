'use client';
import React from 'react';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import './ProductGallery.css';

interface ProductGalleryProps {
  images: { original: string; thumbnail: string }[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  return (
    <div>
      <ImageGallery
        items={images}
        thumbnailPosition="left"
        showPlayButton={false}
        showFullscreenButton={true}
        lazyLoad={true}
        autoPlay={false}
        slideDuration={400}
        showNav={true}
      />
    </div>
  );
};
