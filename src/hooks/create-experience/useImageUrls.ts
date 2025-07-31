import {useState,useRef,useEffect} from 'react';

export default function useImageUrls(experienceImages: (string | File)[]) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const urlsRef = useRef<Map<File, string>>(new Map());

  useEffect(() => {
    const newUrls: string[] = [];
    const newFileUrls = new Map<File, string>();

    experienceImages.forEach((img) => {
      if (typeof img === "string") {
        newUrls.push(img);
      } else if (img instanceof File) {
        let url = urlsRef.current.get(img);
        if (!url) {
          url = URL.createObjectURL(img);
        }
        newFileUrls.set(img, url);
        newUrls.push(url);
      }
    });

    urlsRef.current.forEach((url, file) => {
      if (!newFileUrls.has(file)) {
        URL.revokeObjectURL(url);
      }
    });

    urlsRef.current = newFileUrls;
    setImageUrls(newUrls);
  }, [experienceImages]);

  useEffect(() => {
    return () => {
      urlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      urlsRef.current.clear();
    };
  }, []);

  return imageUrls;
}