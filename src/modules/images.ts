export interface GalleryImage {
    url: string;
    thumbnail: string;
    alt: string;
    width: number;
    height: number;
    spanClass: 'span-wide' | 'span-tall' | 'span-big' | 'span-standard';
}

export const calculateSpan = (width: number, height: number): GalleryImage['spanClass'] => {
  const ratio = width / height;
  if (ratio > 1.2) return 'span-wide';
  if (ratio < 0.8) return 'span-tall';
  if (width > 1200 && height > 1200) return 'span-big';
  return 'span-standard';
};

export const montvillaGallery: GalleryImage[] = [
    {
        url: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_1.png',
        thumbnail: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_1_thumbnail.png',
        alt: 'Front room with desk and sofa/bed',
        width: 400,
        height: 300,
        spanClass: 'span-wide'
    },
    {
        url: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_2.png',
        thumbnail: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_2_thumbnail.png',
        alt: 'Front bathroom',
        width: 300,
        height: 400,
        spanClass: 'span-tall'
    },
    {
        url: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_3.png',
        thumbnail: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_3_thumbnail.png',
        alt: 'Kitchen',
        width: 400,
        height: 300,
        spanClass: 'span-wide'
    },
    {
        url: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_4.png',
        thumbnail: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_4_thumbnail.png',
        alt: 'Kitchen',
        width: 400,
        height: 300,
        spanClass: 'span-wide'
    },
    {
        url: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_5.png',
        thumbnail: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_5_thumbnail.png',
        alt: 'Breakfast Nook',
        width: 400,
        height: 300,
        spanClass: 'span-wide'
    },
    {
        url: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_6.png',
        thumbnail: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_6_thumbnail.png',
        alt: 'Dining Area',
        width: 400,
        height: 300,
        spanClass: 'span-wide'
    },
    {
        url: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_7.png',
        thumbnail: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_7_thumbnail.png',
        alt: 'Dining Area',
        width: 300,
        height: 400,
        spanClass: 'span-tall'
    },
    {
        url: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_8.png',
        thumbnail: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_8_thumbnail.png',
        alt: 'TV Area',
        width: 400,
        height: 300,
        spanClass: 'span-wide'
    },
    {
        url: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_9.png',
        thumbnail: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_9_thumbnail.png',
        alt: 'Mid-house Bedrooms',
        width: 400,
        height: 300,
        spanClass: 'span-wide'
    },
    {
        url: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_10.png',
        thumbnail: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_10_thumbnail.png',
        alt: 'Mid-house Left Bedroom',
        width: 400,
        height: 300,
        spanClass: 'span-wide'
    },
    {
        url: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_11.png',
        thumbnail: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_11_thumbnail.png',
        alt: 'Mid-house Bathroom',
        width: 300,
        height: 400,
        spanClass: 'span-tall'
    },
    {
        url: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_12.png',
        thumbnail: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_12_thumbnail.png',
        alt: 'Mid-house Right Bedroom',
        width: 400,
        height: 300,
        spanClass: 'span-wide'
    },
    {
        url: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_13.png',
        thumbnail: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_13_thumbnail.png',
        alt: 'Master Bedroom',
        width: 400,
        height: 300,
        spanClass: 'span-wide'
    },
    {
        url: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_14.png',
        thumbnail: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_14_thumbnail.png',
        alt: 'Master Bedroom',
        width: 400,
        height: 300,
        spanClass: 'span-wide'
    },
    {
        url: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_15.png',
        thumbnail: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_15_thumbnail.png',
        alt: 'Master Bedroom',
        width: 400,
        height: 300,
        spanClass: 'span-wide'
    },
    {
        url: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_16.png',
        thumbnail: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_16_thumbnail.png',
        alt: 'Master Bathroom',
        width: 300,
        height: 400,
        spanClass: 'span-tall'
    },
    {
        url: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_17.png',
        thumbnail: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_17_thumbnail.png',
        alt: 'Pool Area',
        width: 400,
        height: 300,
        spanClass: 'span-wide'
    },
    {
        url: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_18.png',
        thumbnail: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_18_thumbnail.png',
        alt: 'Pool',
        width: 400,
        height: 300,
        spanClass: 'span-wide'
    },
    {
        url: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_19.png',
        thumbnail: 'https://raw.githubusercontent.com/MontesOwn/main/refs/heads/main/images/montvilla_19_thumbnail.png',
        alt: 'Pool Area',
        width: 400,
        height: 300,
        spanClass: 'span-wide'
    },
];