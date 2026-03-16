import { initializeApp } from "./main";
import { signInWithGooglePopup } from "./firebase/authService";
import { storeMessage } from "./modules/utils";
import { navigateTo } from "./modules/navigate";

initializeApp("Monte's Own", "Log in").then(async () => {
    let result = await signInWithGooglePopup();
    storeMessage(`Welcom ${result["user"]["displayName"]}`, "main-message", "check_circle");
    navigateTo("/index");
});