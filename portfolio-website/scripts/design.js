let header_projects_title = document.getElementsByClassName('header-projects-title')[0]
let header_projects_dropdown = document.getElementsByClassName('header-projects-dropdown')[0]

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


/*to match text to carousel image */
let carouselExampleIndicators = document.getElementById('carouselExampleIndicators');
document.querySelector('.item-1').classList.remove('hide')
carouselExampleIndicators.addEventListener('slid.bs.carousel', () => {
  let activeElement = document.querySelector('.carousel-item.active');

  if (activeElement) {
    let activeId = activeElement.id;

    // Hide all text elements first
    document.querySelectorAll('.featured-text').forEach(item => {
      item.classList.add('hide');
    });

    // Show the text element matching the active slide
    let matchingText = document.querySelector(`.${activeId}`);
    if (matchingText) {
      matchingText.classList.remove('hide');
    }
  }

});