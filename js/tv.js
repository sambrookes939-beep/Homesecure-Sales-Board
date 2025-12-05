// =======================================
//  TV MODE — Fullscreen + Cursor Hide
//  (Auto-scroll removed completely)
// =======================================

// FULLSCREEN BUTTON
const fullscreenBtn = document.getElementById("fullscreen-btn");

fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

// =======================================
//  KIOSK MODE — HIDE CURSOR AFTER 10 SEC
// =======================================

let cursorTimer;

function resetCursorTimer() {
    clearTimeout(cursorTimer);
    document.body.classList.remove("hide-cursor");

    cursorTimer = setTimeout(() => {
        document.body.classList.add("hide-cursor");
    }, 10000); // 10 seconds
}

window.addEventListener("mousemove", resetCursorTimer);
window.addEventListener("keydown", resetCursorTimer);

// Start immediately
resetCursorTimer();

console.log("TV mode active — fullscreen + cursor hide. No auto-scroll.");
