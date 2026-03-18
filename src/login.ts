import { initializeApp } from "./main";
import { signInWithGooglePopup } from "./firebase/authService";
import { createMessage, storeMessage } from "./modules/utils";
import { navigateTo } from "./modules/navigate";

initializeApp("Monte's Own", "Log in").then(async () => {
    createMessage("Opening Google window...", "main-message", "info");
    try {
        const result = await signInWithGooglePopup();
        //If sucessful sign in with Google, close the modal and display the message
        const user = result.user;
        if (user) {
            storeMessage(
                `Welcome ${user.displayName}`,
                "main-message",
                "check_circle",
            );
            navigateTo("/index");
        }
    } catch (error: any) {
        let errorMessage = "Sign-In failed.";
        if (error.code === "auth/popup-closed-by-user") {
            errorMessage = "Sign-In window closed.";
        } else if (error.code === "auth/cancelled-popup-request") {
            errorMessage = "Sign-In request already in progress.";
        } else {
            errorMessage = `Error: ${error.message}`;
        }
        createMessage(errorMessage, "main-message", "error");
        console.error("Google sign-in error details:", error);
    }
});