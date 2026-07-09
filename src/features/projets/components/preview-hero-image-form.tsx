type PreviewHeroImageFormProps = {
  previewUrl: string | null;
};

export default function PreviewHeroImageForm({
  previewUrl,
}: PreviewHeroImageFormProps) {
  if (!previewUrl) {
    return null;
  }

  return (
    <div className="preview-hero-image-form">
      <img
        className="preview-hero-image-form__image"
        src={previewUrl}
        alt="Aperçu de l'image hero"
      />
    </div>
  );
}
