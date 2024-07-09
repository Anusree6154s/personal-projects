/* post.html */

// let passwordButton = document.querySelector('.password-button')
// let passwordInput = document.querySelector('.password-input')
// let passwordDiv = document.querySelector('.password')
// passwordButton.addEventListener('click', () => {
//     if (passwordInput.value === 'ticktock2') {
//         passwordDiv.style.opacity = 0;
//     }
// })

const imageInput = document.querySelector('.image-input')
imageInput.addEventListener('change', (event) => {
    const fileInput = event.target;
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            document.querySelector('.image-preview').src = e.target.result
        };
    }
});

async function fetchData() {
    const res = await fetch("/data.json");
    return res.json();
}
const jsonData = await fetchData();
const toolsContainer = document.querySelector(".tools-container");
for (const category in jsonData) {
    const innerContainer = document.createElement("div");
    innerContainer.classList.add(`${category.toLowerCase()}-container`);
    jsonData[category].tools.forEach((tool) => {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "content-tools";
        checkbox.value = tool;


        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(tool));
        innerContainer.appendChild(label);
    });
    toolsContainer.appendChild(innerContainer);
}

const contentCategory = document.querySelector(".content-category")
hideContainer('Design') //soon after loading page
contentCategory.addEventListener('change', (e) => { //upon click
    hideContainer(e.target.value)
})
function hideContainer(value) {
    switch (value) {
        case "Design":
            document.querySelector(".designs-container").style.display = "block";
            document.querySelector(".websites-container").style.display = "none";
            document.querySelector(".illustrations-container").style.display = "none";
            break;
        case "Dev":
            document.querySelector(".designs-container").style.display = "none";
            document.querySelector(".websites-container").style.display = "block";
            document.querySelector(".illustrations-container").style.display = "none";
            break;
        case "Illustration":
            document.querySelector(".designs-container").style.display = "none";
            document.querySelector(".websites-container").style.display = "none";
            document.querySelector(".illustrations-container").style.display = "block";
            break;
        default:
            break;
    }
}
