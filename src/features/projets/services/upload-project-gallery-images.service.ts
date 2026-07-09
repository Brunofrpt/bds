import { cloudinary } from "@/lib/cloudinary";

type UploadedGalleryImage = {
  secure_url: string;
  public_id: string;
};

async function uploadSingleGalleryImage(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadResult = await new Promise<UploadedGalleryImage>(
    (resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "projects/gallery",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result) {
            reject(
              new Error("Le televersement d'une image de galerie a echoue."),
            );
            return;
          }

          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        },
      );

      stream.end(buffer);
    },
  );

  return uploadResult;
}

export async function uploadProjectGalleryImagesService(files: File[]) {
  const uploadedImages = await Promise.all(
    files.map((file) => uploadSingleGalleryImage(file)),
  );

  return uploadedImages;
}
