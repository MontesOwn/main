export interface GalleryImage {
    url: string;
    thumbnail: string;
    alt: string;
    width: number;
    height: number;
    spanClass: 'span-wide' | 'span-tall' | 'span-standard';
}

export const montvillaGallery: GalleryImage[] = [
    {
        url: '',
        thumbnail: '',
        alt: 'Front room with desk and sofa/bed',
        width: 400,
        height: 300,
        spanClass: 'span-wide'
    },
    {
        url: '',
        thumbnail: '',
        alt: 'Front bathroom',
        width: 300,
        height: 400,
        spanClass: 'span-tall'
    },
    {
        url: '',
        thumbnail: '',
        alt: 'Kitchen',
        width: 400,
        height: 300,
        spanClass: 'span-wide'
    },
    {
        url: '',
        thumbnail: '',
        alt: 'Kitchen',
        width: 400,
        height: 300,
        spanClass: 'span-wide'
    },
    {
        url: '',
        thumbnail: '',
        alt: 'Breakfast Nook',
        width: 400,
        height: 300,
        spanClass: 'span-wide'
    },
];