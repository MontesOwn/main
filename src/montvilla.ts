import { initializeApp } from "./main";
import { montvillaGallery, type GalleryImage } from "./modules/images";

function loadGallery() {
    const gallerySection = document.getElementById("gallery-section") as HTMLElement;
    const galleryContainer = montvillaGallery.reduce((acc: HTMLElement, currentPhoto: GalleryImage) => {
        const imgDiv = document.createElement("div");
        const nextImage = document.createElement("img") as HTMLImageElement ;
        nextImage.src = currentPhoto["thumbnail"];
        nextImage.alt = currentPhoto["alt"];
        nextImage.addEventListener('click', () => {
            alert(currentPhoto["url"]);
        })
        imgDiv.appendChild(nextImage);
        acc.appendChild(imgDiv);
        return acc;
    }, document.createElement("div"));
    galleryContainer.setAttribute("id", "gallery-container");
    gallerySection.appendChild(galleryContainer);
}

initializeApp("", "Montvilla").then(async () => {
    loadGallery();
    const overviewButton = document.getElementById("overview-button") as HTMLElement;
    const galleryButton = document.getElementById("gallery-button") as HTMLElement;
    const thingsButton = document.getElementById("things-button") as HTMLElement;
    const overviewSection = document.getElementById("overview-section") as HTMLElement;
    const gallerySection = document.getElementById("gallery-section") as HTMLElement;
    const thingsSection = document.getElementById("things-section") as HTMLElement;

    overviewButton.addEventListener('click', () => {
        overviewButton.classList.add("active");
        galleryButton.classList.remove("active");
        thingsButton.classList.remove("active");
        overviewSection.classList.remove("hide");
        gallerySection.classList.add("hide");
        thingsSection.classList.add("hide");
    });
    galleryButton.addEventListener('click', () => {
        overviewButton.classList.remove("active");
        galleryButton.classList.add("active");
        thingsButton.classList.remove("active");
        gallerySection.classList.remove("hide");
        overviewSection.classList.add("hide");
        thingsSection.classList.add("hide");
    });
    thingsButton.addEventListener('click', () => {
        overviewButton.classList.remove("active");
        galleryButton.classList.remove("active");
        thingsButton.classList.add("active");
        thingsSection.classList.remove("hide");
        overviewSection.classList.add("hide");
        gallerySection.classList.add("hide");
    });
});