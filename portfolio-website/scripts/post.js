/* post.html */


// let passwordButton = document.querySelector('.password-button')
// let passwordInput = document.querySelector('.password-input')
// let passwordDiv = document.querySelector('.password')
// passwordButton.addEventListener('click', () => {
//     if (passwordInput.value === 'ticktock2') {
//         passwordDiv.style.opacity = 0;
//     } 
// })

// document.querySelector('.image-input').addEventListener('change', (event) => {
//     const fileInput = event.target;
//     const file = fileInput.files[0];
// if (file) {
//     const reader = new FileReader();

//     reader.onload = function (e) {
//         const previewImage = document.querySelector('.image-preview');
//         previewImage.src = e.target.result;
//     };

//     reader.readAsDataURL(file);
// }
// });

/* add new tools */
import * as data from '../data.json';

const toolsCategory = document.querySelector('.tools-category')
const toolsInput = document.querySelector('.tools-input')
const toolsButton = document.querySelector('.tools-button')
toolsCategory.addEventListener('change', (e) => {
    toolsCategory.value = e.target.value
})
toolsInput.addEventListener('input', (e) => {
    toolsInput.value = e.target.value
})
toolsButton.addEventListener('click', (e) => {
    switch (toolsCategory.value) {
        case 'Design':
            console.log('value: ' + toolsInput.value)
            console.log('tools0: ' + designs.tools[0])
            designs.tools.push(toolsInput.value)
            console.log('tools0: ' + designs.tools[0])
            console.log('tools1: ' + designs.tools[1])
            console.log('tools2: ' + designs.tools[2])
            console.log('tools3: ' + designs.tools[3])

            break;

        default:
            break;
    }
})

