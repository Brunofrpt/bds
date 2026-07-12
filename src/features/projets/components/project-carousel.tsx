"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type ProjectCarouselProps = {
  heroImageUrl: string;
  heroImageAlt: string;
  images: {
    id: string;
    imageUrl: string;
    altText: string;
  }[];
};

type CarouselImage = {
  id: string;
  src: string;
  alt: string;
};

export default function ProjectCarousel({
  heroImageUrl,
  heroImageAlt,
  images,
}: ProjectCarouselProps) {
  const carouselImages = useMemo<CarouselImage[]>(() => {
    const heroImage: CarouselImage = {
      id: "hero-image",
      src: heroImageUrl,
      alt: heroImageAlt,
    };

    const galleryImages = images
      .filter((image) => image.imageUrl !== heroImageUrl)
      .map((image) => ({
        id: image.id,
        src: image.imageUrl,
        alt: image.altText,
      }));

    return [heroImage, ...galleryImages];
  }, [heroImageAlt, heroImageUrl, images]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentImage = carouselImages[currentIndex];
  const hasMultipleImages = carouselImages.length > 1;

  function handlePrevious() {
    setCurrentIndex((previousIndex) =>
      previousIndex === 0 ? carouselImages.length - 1 : previousIndex - 1,
    );
  }

  function handleNext() {
    setCurrentIndex((previousIndex) =>
      previousIndex === carouselImages.length - 1 ? 0 : previousIndex + 1,
    );
  }

  return (
    <figure className="projet__image-wrapper">
      <Image
        src={currentImage.src}
        alt={currentImage.alt}
        loading="lazy"
        width={1280}
        height={800}
        className="projet__image"
      />

      {hasMultipleImages && (
        <div className="projet__carousel-controls">
          <button
            type="button"
            className="projet__carousel-button projet__carousel-button--previous"
            onClick={handlePrevious}
            aria-label="Afficher l'image précédente"
          >
            ←
          </button>
          <button
            type="button"
            className="projet__carousel-button projet__carousel-button--next"
            onClick={handleNext}
            aria-label="Afficher l'image suivante"
          >
            →
          </button>
        </div>
      )}
    </figure>
  );
}
