import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ImageUpload({ images = [], setImages }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setImages([...images, ...acceptedFiles]); // use the current `images` prop value
    },
    [images, setImages]
  );

  const removeImage = (index) => {
    const newImages = [...(images || [])];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.svg'],
    },
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <div className="space-y-4">
      <div className="text-xl font-semibold">Product Images</div>

      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-primary/50'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload className="h-10 w-10 text-muted-foreground" />
          {isDragActive ? (
            <p>Drop the images here...</p>
          ) : (
            <>
              <p className="text-lg font-medium">Drag & drop images here</p>
              <p className="text-sm text-muted-foreground">
                or click to select files (max 5 images, 5MB each)
              </p>
            </>
          )}
        </div>
      </div>

      {images?.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {images.map((file, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-md overflow-hidden border"
            >
              <img
                src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                alt={`Product image ${index + 1}`}
                className="object-cover w-full h-full"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
