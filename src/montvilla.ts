import { initializeApp } from "./main";
import { GalleryImage } from "./models";

import { montvillaGallery } from "./modules/images";

function loadGallery() {

}

initializeApp("", "Montvilla").then(async () => {
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