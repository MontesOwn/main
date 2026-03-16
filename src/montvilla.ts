import { initializeApp } from "./main";
import { montvillaGallery, type GalleryImage, calculateSpan } from "./modules/images";
import { createButton, makeElement } from "./modules/utils";

function openImageViewer(imageIndex: number) {
    const galleryLength = montvillaGallery.length;
    let currentIndex = imageIndex;
    const imageViewer = document.getElementById("image-viewer") as HTMLElement;
    imageViewer.innerHTML = '';
    imageViewer.classList.remove("hide");
    document.body.classList.add('noScroll');
    const closeButton = createButton("", "button", "", "close-button", "close");
    const previousButton = createButton("", "button", "previous-button", "", "arrow_back_ios");
    const nextButton = createButton("", "button", "next-button", "", "arrow_forward_ios");
    const imageContainer = makeElement("div", "image-container", null, null);
    const currentImageElement = document.createElement("img") as HTMLImageElement;
    const imageCaption = makeElement("p", "image-caption", null, "");

    imageContainer.appendChild(currentImageElement);
    imageContainer.appendChild(imageCaption);
    const updateUI = () => {
        const currentImageObj = montvillaGallery[currentIndex];
        currentImageElement.src = currentImageObj["url"];
        currentImageElement.alt = currentImageObj["alt"];
        imageCaption.textContent = currentImageObj["alt"];
    };
    closeButton.addEventListener('click', () => {
        imageViewer.classList.add("hide");
        document.body.classList.remove('noScroll');
    });
    previousButton.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? galleryLength - 1 : currentIndex - 1;
        updateUI();
    });
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex === galleryLength - 1) ? 0 : currentIndex + 1;
        updateUI();
    });
    imageViewer.append(closeButton, previousButton, nextButton, imageContainer);
    updateUI();
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            imageViewer.classList.add("hide");
            document.body.classList.remove('noScroll');
            document.removeEventListener("keydown", handleKeyDown); 
        } else if (e.key === "ArrowRight") {
            currentIndex = (currentIndex === galleryLength - 1) ? 0 : currentIndex + 1;
            updateUI();
        } else if (e.key === "ArrowLeft") {
            currentIndex = (currentIndex === 0) ? galleryLength - 1 : currentIndex - 1;
            updateUI();
        }
    };
    document.addEventListener("keydown", handleKeyDown);
}

function loadGallery() {
    const gallerySection = document.getElementById("gallery-section") as HTMLElement;
    const galleryContainer = montvillaGallery.reduce((acc: HTMLElement, currentPhoto: GalleryImage, index) => {
        const imgDiv = document.createElement("div");
        const nextImage = document.createElement("img") as HTMLImageElement;
        nextImage.src = currentPhoto["thumbnail"];
        nextImage.alt = currentPhoto["alt"];
        nextImage.classList.add(calculateSpan(currentPhoto["width"], currentPhoto["height"]));
        nextImage.addEventListener('click', () => {
            openImageViewer(index);
        });
        imgDiv.appendChild(nextImage);
        acc.appendChild(imgDiv);
        return acc;
    }, document.createElement("div"));
    galleryContainer.setAttribute("id", "gallery-container");
    gallerySection.appendChild(galleryContainer);
}

initializeApp("Montvilla", "Montvilla").then(async () => {
    loadGallery();
    const overviewButton = document.getElementById("overview-button") as HTMLElement;
    const galleryButton = document.getElementById("gallery-button") as HTMLElement;
    const thingsButton = document.getElementById("things-button") as HTMLElement;
    const overviewSection = document.getElementById("overview-section") as HTMLElement;
    const gallerySection = document.getElementById("gallery-section") as HTMLElement;
    const thingsSection = document.getElementById("things-section") as HTMLElement;

    const urlParams = new URLSearchParams(window.location.search);
    const tab: string | null = urlParams.get("tab");
    if (tab) {
        if (tab==="overview") {
            overviewSection.classList.remove("hide");
            overviewButton.classList.add("active");
        } else if (tab==="gallery") {
            gallerySection.classList.remove("hide");
            galleryButton.classList.add("active");
        } else if (tab==="nearby") {
            thingsSection.classList.remove("hide");
            thingsButton.classList.add("active");
        } else {
            overviewSection.classList.remove("hide");
            overviewButton.classList.add("active");
        }
    } else {
        overviewSection.classList.remove("hide");
        overviewButton.classList.add("active");
    }

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