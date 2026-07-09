"use client";

import { type ChangeEvent, useRef, useState } from "react";
import type { ProjectInitialData } from "../types/project-initial-data";

type ExistingGalleryImageItem = {
  id: string;
  previewUrl: string;
  altText: string;
  source: "existing";
  imageUrl: string;
};

type NewGalleryImageItem = {
  id: string;
  previewUrl: string;
  altText: string;
  source: "new";
  file: File;
};

type GalleryImageItem = ExistingGalleryImageItem | NewGalleryImageItem;

type ProjectGalleryImagesInputProps = {
  initialImages?: ProjectInitialData["images"];
};

export default function ProjectGalleryImagesInput({
  initialImages = [],
}: ProjectGalleryImagesInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImageItem[]>(
    initialImages.map((image) => ({
      id: image.id,
      previewUrl: image.imageUrl,
      altText: image.altText,
      source: "existing",
      imageUrl: image.imageUrl,
    })),
  );

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

  function getNewFiles(images: GalleryImageItem[]) {
    return images
      .filter((image): image is NewGalleryImageItem => image.source === "new")
      .map((image) => image.file);
  }

  function handleGalleryImagesChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.currentTarget.files ?? []);

    if (selectedFiles.length === 0) {
      return;
    }

    setGalleryImages((currentImages) => {
      const newImages = selectedFiles.map((file) => ({
        id: crypto.randomUUID(),
        previewUrl: URL.createObjectURL(file),
        altText: "",
        source: "new" as const,
        file,
      }));

      const nextImages = [...currentImages, ...newImages];
      syncInputFiles(getNewFiles(nextImages));

      return nextImages;
    });
  }

  function handleRemoveGalleryImage(imageId: string) {
    setGalleryImages((currentImages) => {
      const imageToRemove = currentImages.find((image) => image.id === imageId);

      if (imageToRemove) {
        if (imageToRemove.source === "new") {
          URL.revokeObjectURL(imageToRemove.previewUrl);
        }
      }

      const nextImages = currentImages.filter((image) => image.id !== imageId);
      syncInputFiles(getNewFiles(nextImages));

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
                  {image.source === "new"
                    ? image.file.name
                    : `Image galerie ${index + 1}`}
                </p>

                <input
                  className="project-gallery-images-input__alt project-form__input"
                  type="text"
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

                {image.source === "existing" ? (
                  <>
                    <input
                      type="hidden"
                      name="existingGalleryImageUrls"
                      value={image.imageUrl}
                    />
                    <input
                      type="hidden"
                      name="existingGalleryImageAltTexts"
                      value={image.altText}
                    />
                    <input
                      type="hidden"
                      name="existingGalleryImageDisplayOrders"
                      value={index}
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="hidden"
                      name="galleryImageAltTexts"
                      value={image.altText}
                    />
                    <input
                      type="hidden"
                      name="galleryImageDisplayOrders"
                      value={index}
                    />
                  </>
                )}

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
