/* ====================================
   🍒 CHERRY'S MAGICAL CURSOR ✨
==================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Respect reduced-motion preferences

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    const finePointer = window.matchMedia(
        "(pointer: fine)"
    );

    if (!finePointer.matches) return;

    // CREATE CHERRY CURSOR

    const cherry = document.createElement("div");

    cherry.className = "cherry-cursor";

    cherry.textContent = "🍒";

    cherry.setAttribute("aria-hidden", "true");

    document.body.appendChild(cherry);

    // SPARKLE SYMBOLS

    const symbols = [
        "✧",
        "✦",
        "♡",
        "⋆",
        "✿",
        "✨"
    ];

    const colors = [
        "#ff9eb5",
        "#ffd6e0",
        "#d6336c",
        "#ffffff",
        "#b84c6c"
    ];

    let lastSparkle = 0;

    // MOUSE MOVEMENT

    document.addEventListener("pointermove", (event) => {

        if (event.pointerType !== "mouse") return;

        cherry.style.left = event.clientX + "px";

        cherry.style.top = event.clientY + "px";

        cherry.style.opacity = "1";

        if (reducedMotion.matches) return;

        const now = performance.now();

        if (now - lastSparkle < 45) return;

        lastSparkle = now;

        createSparkle(event.clientX, event.clientY);

    });

    // HIDE CURSOR WHEN LEAVING WINDOW

    document.addEventListener("mouseout", (event) => {

        if (!event.relatedTarget) {
            cherry.style.opacity = "0";
        }

    });

    // CREATE SPARKLE

    function createSparkle(x, y) {

        const sparkle = document.createElement("span");

        sparkle.className = "cursor-sparkle";

        sparkle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        sparkle.style.color =
            colors[Math.floor(Math.random() * colors.length)];

        sparkle.style.left = x + "px";

        sparkle.style.top = y + "px";

        sparkle.style.setProperty(
            "--drift",
            (Math.random() * 50 - 25) + "px"
        );

        document.body.appendChild(sparkle);

        sparkle.addEventListener("animationend", () => {
            sparkle.remove();
        }, { once: true });

    }

});