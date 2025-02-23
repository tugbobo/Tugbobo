// Rotating dynamic text
const textElement = document.getElementById("dynamic-text");
const texts = [
    "Discover the secrets within...",
    "A mosaic of digital thoughts.",
    "Unravel the hidden wonders...",
    "Each journey unveils a new adventure.",
    "Dive into the unknown...",
    "A tapestry of digital dreams.",
    "Unfold the mysteries...",
    "Every path leads to discovery.",
    "Explore the unseen realms...",
    "A canvas of virtual imagination.",
];
let index = 0;
setInterval(() => {
    textElement.textContent = texts[index];
    index = (index + 1) % texts.length;
}, 2000);

// Define a safe zone for the central text (in percentages)
// Icons will not be placed where centerX is between 20% and 80% AND centerY is between 30% and 70%
const safeZone = { top: 30, left: 20, bottom: 70, right: 80 };

// Array of available symbol IDs from the sprite
const iconCount = 12; // desired number of icons
const symbolIds = Array.from({ length: iconCount }, (_, i) => `iconAsset${i + 1}`);
const bgContainer = document.querySelector(".bg-icons");

// Create a grid of 4 rows x 4 columns to avoid overlap
const rows = 4,
    cols = 4;
const cellWidth = 100 / cols; // in percentage
const cellHeight = 100 / rows; // in percentage

// Generate list of valid cell indices that do not fall in the safe zone
const validIndices = [];
for (let i = 0; i < rows * cols; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const centerTop = row * cellHeight + cellHeight / 2;
    const centerLeft = col * cellWidth + cellWidth / 2;
    // Exclude cells where the center is inside the safe zone
    if (
        !(
            centerTop >= safeZone.top &&
            centerTop <= safeZone.bottom &&
            centerLeft >= safeZone.left &&
            centerLeft <= safeZone.right
        )
    ) {
        validIndices.push(i);
    }
}

// Shuffle the valid indices and select up to iconCount cells
validIndices.sort(() => Math.random() - 0.5);
const chosenIndices = validIndices.slice(
    0,
    Math.min(iconCount, validIndices.length)
);

chosenIndices.forEach((cellIndex, i) => {
    const row = Math.floor(cellIndex / cols);
    const col = cellIndex % cols;
    const baseTop = row * cellHeight;
    const baseLeft = col * cellWidth;
    // Place the icon near the center of its cell with a small random offset
    const centerTop = baseTop + cellHeight / 2;
    const centerLeft = baseLeft + cellWidth / 2;
    const offsetRange = cellHeight / 4;
    const offsetTop = (Math.random() * 2 - 1) * offsetRange;
    const offsetLeft = (Math.random() * 2 - 1) * offsetRange;
    const finalTop = centerTop + offsetTop;
    const finalLeft = centerLeft + offsetLeft;

    // Create the icon container
    const iconDiv = document.createElement("div");
    iconDiv.classList.add("bg-icon");
    iconDiv.style.top = `${finalTop}%`;
    iconDiv.style.left = `${finalLeft}%`;
    // Use a narrow size range (e.g., between 2.5rem and 3.5rem)
    const size = 2.5 + Math.random(); // rem units
    iconDiv.style.width = `${size}rem`;

    // Create the SVG element using the symbol
    const svgElem = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );
    svgElem.setAttribute(
        "class",
        "w-full h-auto fill-current"
    );
    const useElem = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "use"
    );
    const symbolId =
        symbolIds[Math.floor(Math.random() * symbolIds.length)];
    useElem.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        `#${symbolId}`
    );
    svgElem.appendChild(useElem);
    iconDiv.appendChild(svgElem);
    bgContainer.appendChild(iconDiv);

    // GSAP onload animation: randomly choose one effect
    const animTypes = ["slideUp", "slideDown", "rotateIn"];
    const animType =
        animTypes[Math.floor(Math.random() * animTypes.length)];
    const animConfig = { duration: 1, delay: i * 0.2, ease: "power3.out" };

    if (animType === "slideUp") {
        gsap.from(iconDiv, { ...animConfig, y: 50, opacity: 0 });
    } else if (animType === "slideDown") {
        gsap.from(iconDiv, { ...animConfig, y: -50, opacity: 0 });
    } else if (animType === "rotateIn") {
        gsap.from(iconDiv, { ...animConfig, rotation: 45, opacity: 0 });
    }

    gsap.fromTo(
        "#logo",
        { scale: 0, opacity: 0, rotation: -45 }, // Start values
        {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1,
            ease: "elastic.out(1, 0.6)",
        } // End values
    );
});
