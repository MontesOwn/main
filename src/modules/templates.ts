import { navigateTo } from "./navigate.js";
import { createLink, makeElement } from "./utils.js";
import { auth } from "../firebase/firebase.js";

export function loadHeader() {
    const headerElement = document.querySelector("header") as HTMLElement;
    const h1Wrapper = makeElement("div", null, "h1-wrapper", null);
    const title = makeElement("h1", "title", null, "Monte's Own");
    h1Wrapper.appendChild(title)
    headerElement.appendChild(h1Wrapper);
}

export function loadNav() {
    const nav = document.querySelector("nav") as HTMLElement;
    const home = createLink("Home", "", false);
    home.addEventListener('click', () => navigateTo('/'));
    nav.appendChild(home);
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

function signOutUser(): any {
    throw new Error("Function not implemented.");
}
