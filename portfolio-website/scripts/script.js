let footer = document.querySelector('.footer');
document.querySelector('.home-nav-contact-button').addEventListener('click', function () {
    footer.scrollIntoView({
        behavior: 'smooth'
    });
});
document.querySelector('.home-nav-about-button').addEventListener('click', function () {
    footer.scrollIntoView({
        behavior: 'smooth'
    });
});

// const projectsButton = document.querySelector('.projects-button')
// const dropdown = document.querySelector('.dropdown')
// projectsButton.addEventListener('click', () => {
//     dropdown.classList.toggle('show-dropdown')
// })
// window.addEventListener('click', (event) => {
//     if (!dropdown.contains(event.target) && !projectsButton.contains(event.target)) {
//         dropdown.classList.remove('show-dropdown');
//     }
// });

/*call related functions*/
// projectTitleScroll()

const imgContainers = document.querySelectorAll('.img-container');
imgContainers.forEach(carouselScroll);


// /*functions */
// function projectTitleScroll() {
//     const floatingParagraph = document.querySelector('.projects-title');
//     const projectsSection = document.querySelector('.projects');
//     const footerSection = document.querySelector('.footer');
//     window.addEventListener('scroll', function () {
//         // when scroll position is between top of projectsSection annd middle of windowpage, projectsTitle appears. i.e, when projectsSection peaks, projectsTitle appear
//         const scrollThreshold1 = projectsSection.offsetTop - window.innerHeight / 2;
//         const scrollThreshold2 = footerSection.offsetTop - window.innerHeight / 2;
//         if (window.scrollY > scrollThreshold1 && window.scrollY < scrollThreshold2) {
//             floatingParagraph.style.opacity = '1';
//         } else {
//             floatingParagraph.style.opacity = '0';
//         }
//     });
// }

function carouselScroll(imgContainer) {
    const images = imgContainer.querySelectorAll('.img');
    let currentIndex = 0;

    // Clone the first image and append it to the end
    const firstImageClone = images[0].cloneNode(true);
    imgContainer.appendChild(firstImageClone);

    setInterval(() => {
        currentIndex = (currentIndex + 1) % (images.length + 1);
        const newTransformValue = -currentIndex * 100 + '%';
        imgContainer.style.transform = 'translateX(' + newTransformValue + ')';

        // Check if the last cloned image is reached, reset to the first image
        if (currentIndex === images.length) {
            setTimeout(() => {
                imgContainer.style.transition = 'none';
                currentIndex = 0;
                imgContainer.style.transform = 'translateX(0)';
                setTimeout(() => {
                    imgContainer.style.transition = 'transform 0.5s ease-in-out'; // Restore transition
                }, 50);
            }, 500);
        }
    }, 3000);
}


let header_projects_title = document.getElementsByClassName('home-nav-projects-button')[0]
let header_projects_dropdown = document.getElementsByClassName('home-nav-projects-dropdown')[0]

console.log(header_projects_dropdown)
/* drop down show-hide function - on clicking on projects title*/
header_projects_title.addEventListener('click', () => {
    if (header_projects_dropdown.classList.contains('hide')) header_projects_dropdown.classList.remove('hide')
    else header_projects_dropdown.classList.add('hide')
})

/* drop down show-hide function - on clicking outside*/
document.body.addEventListener('click', function (event) {
    // Check if the clicked element is not myDiv or a descendant of myDiv
    if (!header_projects_dropdown.contains(event.target) && !header_projects_title.contains(event.target)) {
        // If not, remove the 'active' class from myDiv
        header_projects_dropdown.classList.add('hide');
    }
});


document.getElementsByClassName('footer-inner-contact-form')[0].addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    let recipient = 'secretadmirer2411994@gmail.com';
    let subject = `Message from Portfolio from ${name}`;
    let body = message;

    console.log(name, message)

    // URL encode the subject and body
    subject = encodeURIComponent(subject);
    body = encodeURIComponent(body);

    // Construct the mailto link
    let mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // Open the link
    window.location.href = mailtoLink;
});
