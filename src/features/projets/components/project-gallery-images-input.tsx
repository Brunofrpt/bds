"use client";

import { type ChangeEvent, useRef, useState } from "react";

type GalleryImageItem = {
  id: string;
  file: File;
  previewUrl: string;
  altText: string;
};

export default function ProjectGalleryImagesInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImageItem[]>([]);

  function syncInputFiles(files: File[]) {
    if (!inputRef.current) {
      return;
    }

    const dataTransfer = new DataTransfer();

    files.forEach((file) => {
      dataTransfer.items.add(file);
    });

    inputRef.current.files = dataTransfer.files;
  }

  function handleGalleryImagesChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.currentTarget.files ?? []);

    if (selectedFiles.length === 0) {
      return;
    }

    setGalleryImages((currentImages) => {
      const newImages = selectedFiles.map((file) => ({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
        altText: "",
      }));

      const nextImages = [...currentImages, ...newImages];
      syncInputFiles(nextImages.map((image) => image.file));

      return nextImages;
    });
  }

  function handleRemoveGalleryImage(imageId: string) {
    setGalleryImages((currentImages) => {
      const imageToRemove = currentImages.find((image) => image.id === imageId);

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }

      const nextImages = currentImages.filter((image) => image.id !== imageId);
      syncInputFiles(nextImages.map((image) => image.file));

      return nextImages;
    });
  }

  function handleGalleryImageAltChange(imageId: string, nextAltText: string) {
    setGalleryImages((currentImages) =>
      currentImages.map((image) =>
        image.id === imageId ? { ...image, altText: nextAltText } : image,
      ),
    );
  }

  return (
    <div className="project-gallery-images-input">
      <div className="project-gallery-images-input__field">
        <label
          className="project-gallery-images-input__label label"
          htmlFor="galleryImages"
        >
          GALERIE D&apos;IMAGES
        </label>

        <input
          ref={inputRef}
          className="project-gallery-images-input__input project-form__input"
          id="galleryImages"
          name="galleryImages"
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryImagesChange}
        />

        <p className="project-gallery-images-input__helper">
          Tu peux ajouter zero, une ou plusieurs images de galerie.
        </p>
      </div>

      {galleryImages.length > 0 && (
        <div className="project-gallery-images-input__list">
          {galleryImages.map((image, index) => (
            <div key={image.id} className="project-gallery-images-input__item">
              <img
                className="project-gallery-images-input__preview"
                src={image.previewUrl}
                alt={`Apercu de la galerie ${index + 1}`}
              />

              <div className="project-gallery-images-input__meta">
                <p className="project-gallery-images-input__filename">
                  {image.file.name}
                </p>

                <input
                  className="project-gallery-images-input__alt project-form__input"
                  type="text"
                  name="galleryImageAltTexts"
                  value={image.altText}
                  onChange={(event) =>
                    handleGalleryImageAltChange(
                      image.id,
                      event.currentTarget.value,
                    )
                  }
                  placeholder="Texte alternatif de l'image"
                  required
                />

                <input
                  type="hidden"
                  name="galleryImageDisplayOrders"
                  value={index}
                />

                <button
                  type="button"
                  className="project-gallery-images-input__remove"
                  onClick={() => handleRemoveGalleryImage(image.id)}
                >
                  SUPPRIMER
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
