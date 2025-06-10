const promtbtn= document.querySelector('.prompt-btn');
const promptInput = document.querySelector('.prompt-input');
const promptForm = document.querySelector('.prompt-form');
const modelSelect = document.getElementById('model-select');
const countSelect = document.getElementById('count-select');
const ratioSelect = document.getElementById('ratio-select');
const gridGallery = document.querySelector('.gallery-grid');
const API_KEY =``;

const getImageDimensions = (aspectRatio) => {
    const [width,height]= aspectRatio.split(':').map(Number);
    const scaleFactor= 512/Math.sqrt(width*height);
    let calculatedWidth = Math.round(width * scaleFactor);
    let calculatedHeight = Math.round(height * scaleFactor);    

    calculatedWidth= Math.floor(calculatedWidth / 16) * 16; // Round down to nearest multiple of 64
    calculatedHeight= Math.floor(calculatedHeight / 16) * 16; // Round down to nearest multiple of 64

    return { width: calculatedWidth, height: calculatedHeight };
};

const updateImageCard = (index, imageUrl) => {
    const imgCard= document.getElementById(`image-card-${index}`);
    if(!imgCard) return;
    imgCard.innerHTML =`<img src="${imageUrl}" alt="test">
                        <div class="overlay">
                            <a href="${imageUrl}" class="download" download="image-${index}.png">
                                <i class="fa-solid fa-download"></i>
                                Download
                            </a>
                        </div>`
};
const generateImages = async (selectedModel, imageCount, aspectRatio, promptText) => {
    const MODEL_URL = `https://api-inference.huggingface.co/models/${selectedModel}`;
    const { width, height } = getImageDimensions(aspectRatio);

    const imagePromises = [...Array(imageCount)].map(async (_, i) => {
        try {
            const response = await fetch(MODEL_URL, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                    "x-use-cache": "false",
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: promptText,
                    parameters: { width, height },
                }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse?.error || "Unknown error");
            }

            const result = await response.blob();
            console.log("Image generated successfully:", result);
            updateImageCard(i, URL.createObjectURL(result));
        } catch (error) {
            console.error("Error generating images:", error);
        }
    });

    await Promise.all(imagePromises);
};

const createImageCards = (selectedModel, imageCount, aspectRatio, promptText) => {
    
    gridGallery.innerHTML = ''; // Clear previous images
    for (let i = 0; i < imageCount; i++) {
        gridGallery.innerHTML += `<div class="image-card" id="image-card-${i}" style="aspect-ratio: ${aspectRatio};">
        <img src="images.jpeg" alt="test">
    </div>`
    }

    generateImages(selectedModel, imageCount, aspectRatio, promptText);
};

const handleSubmit = (event) => {
    event.preventDefault(); 
    const selectedModel = modelSelect.value;
    const imageCount = parseInt(countSelect.value) || 1;
    const aspectRatio = ratioSelect.value || '1:1';    
    const promptText = promptInput.value.trim();

    createImageCards(selectedModel, imageCount, aspectRatio, promptText);
    if (!promptText) {
        alert("Please enter a prompt.");
        return;
    }
};

promptForm.addEventListener('submit', handleSubmit);

const examplePrompts = [
  "A magic forest with glowing plants and fairy homes among giant mushrooms",
  "An old steampunk airship floating through golden clouds at sunset",
  "A future Mars colony with glass domes and gardens against red mountains",
  "A dragon sleeping on gold coins in a crystal cave",
  "An underwater kingdom with merpeople and glowing coral buildings",
  "A floating island with waterfalls pouring into clouds below",
  "A witch's cottage in fall with magic herbs in the garden",
  "A robot painting in a sunny studio with art supplies around it",
  "A magical library with floating glowing books and spiral staircases",
  "A Japanese shrine during cherry blossom season with lanterns and misty mountains",
  "A cosmic beach with glowing sand and an aurora in the night sky",
  "A medieval marketplace with colorful tents and street performers",
  "A cyberpunk city with neon signs and flying cars at night",
  "A peaceful bamboo forest with a hidden ancient temple",
  "A giant turtle carrying a village on its back in the ocean",
];

promtbtn.addEventListener('click', () => {
    const prompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    promptInput.value = prompt;
    promptInput.focus();
});