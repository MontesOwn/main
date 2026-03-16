import { loadFooter, loadHeader, loadNav } from "./modules/templates.js";
import { createMessage } from "./modules/utils.js";
import { Message } from "./models.js";

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
  loadHeader(partentPage);
  loadNav(partentPage);
  loadFooter();
  const nav = document.getElementById('main-nav') as HTMLElement
  const toggle = document.getElementById('mobile-nav-toggle') as HTMLElement;
  const icon = toggle.querySelector('.material-symbols-outlined') as HTMLElement;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    if (nav.classList.contains('open')) {
      icon.textContent = 'close';
      document.body.classList.add('noScroll');
    } else {
      icon.textContent = 'menu';
      document.body.classList.remove('noScroll');
    }
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      icon.textContent = 'menu';
      document.body.classList.remove('noScroll');
    });
  });

  const storedMessageString = sessionStorage.getItem("message");
  if (storedMessageString) {
    const storedMessage: Message = JSON.parse(storedMessageString);
    createMessage(storedMessage['message'], storedMessage['messageContainer'], storedMessage['icon']);
    sessionStorage.removeItem("message");
  }
}