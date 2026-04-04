import { navigateTo } from "./navigate.js";
import { createLink, makeElement } from "./utils.js";
import { auth } from "../firebase/firebase.js";
import { signOutUser } from "../firebase/authService.js";

export function loadHeader(partentPage: string) {
    const headerElement = document.querySelector("header") as HTMLElement;
    const h1Wrapper = makeElement("div", null, "h1-wrapper", null);
    const title = makeElement("h1", "title", null, partentPage);
    h1Wrapper.appendChild(title)
    headerElement.appendChild(h1Wrapper);
}

export function loadNav(partentPage: string) {
    const nav = document.querySelector("nav") as HTMLElement;
    const home = createLink("Home", "", false);
    home.addEventListener('click', () => navigateTo('/'));
    nav.appendChild(home);
    const montvilla = createLink("Montvilla", "", false);
    montvilla.addEventListener('click', () => navigateTo("/montvilla", { params: { tab: "overview" } }));
    nav.appendChild(montvilla);
    if (partentPage === "Monte's Own") {
        const beekeeping = createLink("Beekeeping", "", false);
        beekeeping.addEventListener('click', () => navigateTo('/beekeeping'));
        nav.appendChild(beekeeping);
        const maple = createLink("Maple Syrup", "", false);
        maple.addEventListener('click', () => navigateTo('/maple'));
        nav.appendChild(maple);
        const garden = createLink("Our Garden", "", false);
        garden.addEventListener('click', () => navigateTo('/garden'));
        nav.appendChild(garden);
        const chickens = createLink("Raising Chickens", "", false);
        chickens.addEventListener('click', () => navigateTo('/chickens'));
        nav.appendChild(chickens);
    } else if (partentPage === "Montvilla") {
        const montvillaGallery = createLink("Gallery", "", false);
        montvillaGallery.addEventListener('click', () => navigateTo("/montvilla", { params: { tab: "gallery" } }));
        nav.appendChild(montvillaGallery);
        const montvillaNearby = createLink("Nearby", "", false);
        montvillaNearby.addEventListener('click', () => navigateTo("/montvilla", { params: { tab: "nearby" } }));
        nav.appendChild(montvillaNearby);
        const viewAvailability = createLink("Calendar", "", false);
        viewAvailability.addEventListener('click', () => navigateTo("/calendar"));
        nav.appendChild(viewAvailability);
    }

    const logout = makeElement("a", "logout", "hide", "Log Out");
    logout.addEventListener('click', () => signOutUser());
    nav.appendChild(logout);
    auth.onAuthStateChanged((user) => {
        if (user) {
            logout.classList.remove("hide");
        }
    });
}

export function loadFooter() {
    const footerElement = document.querySelector("footer") as HTMLElement;
    const ul = document.createElement("ul");
    footerElement.appendChild(ul);

}
