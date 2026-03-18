import { initializeApp } from "./main";
import { signInWithGooglePopup } from "./firebase/authService";
import { createMessage, storeMessage } from "./modules/utils";
import { navigateTo } from "./modules/navigate";
import { getRedirectResult } from "firebase/auth";
import { auth } from "./firebase/firebase";

initializeApp("Monte's Own", "Log in").then(async () => {
    try {
        const redirectResult = await getRedirectResult(auth);
        if (redirectResult && redirectResult.user) {
            const userDisplayName = redirectResult.user.displayName;
            storeMessage(`Welcome ${userDisplayName}`, "main-message", "check_circle");
            navigateTo("/index");
            return;
        }
    } catch (redirectError: any) {
        console.error("Redirect result error:", redirectError);
    }

    createMessage("Opening Google window...", "main-message", "info");
    
    try {
        const userDisplayName = await signInWithGooglePopup();
        if (userDisplayName) {
            storeMessage(
                `Welcome ${userDisplayName}`,
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
        } else if (error.code === "auth/popup-blocked") {
             errorMessage = "Redirecting to secure sign-in...";
        } else {
            errorMessage = `Error: ${error.message}`;
        }
        createMessage(errorMessage, "main-message", "error");
        console.error("Google sign-in error details:", error);
    }
});