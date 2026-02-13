import Image from "next/image";

export type GalleryGridProps = {
  images: string[];
  className?: string;
};

export default function GalleryGrid({ images, className }: GalleryGridProps) {
  return (
    <div className={["grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className].filter(Boolean).join(" ")}>
      {images.map((image, i) => (
        <div key={image} className="relative aspect-[4/3] w-full">
          <Image
            src={`/gallery/${image}`}
            alt={`Ireland private tours and travel — gallery image ${i + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}
