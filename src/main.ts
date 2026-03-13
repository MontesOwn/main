import { loadFooter, loadHeader, loadNav } from "./modules/templates.js";
import { createMessage } from "./modules/utils.js";
import { Message } from "./models.js";

// let mobileNavToggle = document.getElementById("mobile-nav-toggle") as HTMLElement;
// let nav: HTMLElement;

export async function initializeApp(partentPage: string, currentPage: string) {
  console.log(partentPage);
  if (currentPage !== "") {
    //Set the page title
    document.title = `${currentPage} - Monte's Own`;
  }
  //Wait for the DOM to load
  await new Promise<void>(resolve => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => resolve(), { once: true });
    } else {
      resolve();
    }
  });
  loadHeader();
  loadNav();
  loadFooter();
  const nav = document.getElementById('main-nav') as HTMLElement
  const toggle = document.getElementById('mobile-nav-toggle') as HTMLElement;
  const icon = toggle.querySelector('.material-symbols-outlined') as HTMLElement;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');

    // Toggle between menu and close icons
    if (nav.classList.contains('open')) {
      icon.textContent = 'close';
      document.body.classList.add('noScroll'); // Prevents background scrolling
    } else {
      icon.textContent = 'menu';
      document.body.classList.remove('noScroll');
    }
  });

  // Close menu when a link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      icon.textContent = 'menu';
      document.body.classList.remove('noScroll');
    });
  });
  // nav = document.querySelector("nav") as HTMLElement;
  // //Mobile Nav toggle
  // mobileNavToggle.addEventListener("click", () => {
  //   //Toggle to class 'open' on nav's classList
  //   nav.classList.toggle("open");
  //   //Check if 'open' is in nav's classList
  //   const isOpen = nav.classList.contains("open");
  //   //Display proper icon in nav toggle button
  //   if (isOpen) {
  //     mobileNavToggle.innerText = "close";
  //     mobileNavToggle.style.color = "#fff";
  //   } else {
  //     mobileNavToggle.innerText = "menu";
  //     mobileNavToggle.style.color = "var(--main-color)";
  //   }
  // });

  const storedMessageString = sessionStorage.getItem("message");
  if (storedMessageString) {
    const storedMessage: Message = JSON.parse(storedMessageString);
    createMessage(storedMessage['message'], storedMessage['messageContainer'], storedMessage['icon']);
    sessionStorage.removeItem("message");
  }
}