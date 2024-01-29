let footer = document.querySelector('.footer');
document.querySelector('.contact-button').addEventListener('click', function () {
  footer.scrollIntoView({
    behavior: 'smooth'
  });
});
document.querySelector('.about-button').addEventListener('click', function () {
  footer.scrollIntoView({
    behavior: 'smooth'
  });
});

document.querySelector('.top-button').addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const projectsButton = document.querySelector('.projects-button')
const dropdown = document.querySelector('.dropdown')
projectsButton.addEventListener('click', () => {
  dropdown.classList.toggle('show-dropdown')
})
window.addEventListener('click', (event) => {
  if (!dropdown.contains(event.target) && !projectsButton.contains(event.target)) {
    dropdown.classList.remove('show-dropdown');
  }
});

/*call related functions*/
projectTitleScroll()

const imgContainers = document.querySelectorAll('.img-container');
imgContainers.forEach(carouselScroll);


/*functions */
function projectTitleScroll() {
  const floatingParagraph = document.querySelector('.projects-title');
  const projectsSection = document.querySelector('.projects');
  const footerSection = document.querySelector('.footer');
  window.addEventListener('scroll', function () {
    // when scroll position is between top of projectsSection annd middle of windowpage, projectsTitle appears. i.e, when projectsSection peaks, projectsTitle appear
    const scrollThreshold1 = projectsSection.offsetTop - window.innerHeight / 2;
    const scrollThreshold2 = footerSection.offsetTop - window.innerHeight / 2;
    if (window.scrollY > scrollThreshold1 && window.scrollY < scrollThreshold2) {
      floatingParagraph.style.opacity = '1';
    } else {
      floatingParagraph.style.opacity = '0';
    }
  });
}

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
    console.log(currentIndex)

    // Check if the last cloned image is reached, reset to the first image
    if (currentIndex === images.length) {
      console.log("currentIndex: " + currentIndex)
      setTimeout(() => {
        imgContainer.style.transition = 'none';
        currentIndex = 0;
        imgContainer.style.transform = 'translateX(0)';
        setTimeout(() => {
          imgContainer.style.transition = 'transform 0.5s ease-in-out'; // Restore transition
        }, 50);
      }, 500);
    }
  }, 5000);
}