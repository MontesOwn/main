export interface GalleryImage {
    url: string;
    alt: string;
    width: number;
    height: number;
    spanClass: 'span-wide' | 'span-tall' | 'span-big' | 'span-standard';
}

export const calculateSpan = (width: number, height: number): GalleryImage['spanClass'] => {
  const ratio = width / height;

  if (ratio > 1.2) return 'span-wide';      // Landscape
  if (ratio < 0.8) return 'span-tall';      // Portrait
  if (width > 1200 && height > 1200) return 'span-big'; // High-res square
  return 'span-standard';                   // Regular square-ish
};

export const montvillaGallery: GalleryImage[] = [
    {
        url: "",
        alt: "",
        width: 0,
        height: 0,
        spanClass: 
    }
];