// Function to make text disappear and change background color
function disappearTextAndChangeBackground(duration) {
    const text = document.getElementById("text");
    const description = document.getElementById("description");
    const body = document.body;
    const arrow = document.getElementById("arrow");
    const overlay = document.getElementById("overlay");
    const whiteOverlay = document.getElementById("white-overlay");
    whiteOverlay.style.opacity=1;
    const purpleOverlay=document.getElementById("purple-overlay");
    purpleOverlay.style.opacity=0;
    const blackOverlay=document.getElementById("black-overlay");
    blackOverlay.style.opacity=0;
    setTimeout(() => {
        whiteOverlay.style.transition='opacity 1s ease';
        whiteOverlay.style.opacity = 0;
        body.style.overflow = 'hidden';
        document.body.style.transition='opacity 1s ease';
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundImage = "url('Picture/BG5 remake.png')";
        document.body.style.width = `${window.innerWidth}px`;
        document.body.style.height = `${window.innerHeight}px`;
        body.style.color = "beige"; // Change text color
        
        setTimeout(() => {
            text.style.transition = 'opacity 1s ease'; 
            description.style.transition = 'opacity 1s ease';
            purpleOverlay.style.transition='opacity 0.5s ease';
            purpleOverlay.style.opacity = 1; 
            blackOverlay.style.opacity=1;
            text.style.opacity = 0; 
            description.style.opacity = 0; 
            setTimeout(()=>{
                purpleOverlay.style.transition='opacity 1s ease';
                purpleOverlay.style.opacity = 0; 
                blackOverlay.style.transition='opacity 2s ease';
                blackOverlay.style.opacity = 0; 
                body.style.overflow='hidden';
            },1000);
            setTimeout(() => {
                setTimeout(() => {body.style.overflowY = 'auto';},500);
                setTimeout(()=>{ 
                    purpleOverlay.style.transition='opacity 0.5s ease';
                    purpleOverlay.style.opacity = 0; 
                    blackOverlay.style.transition='opacity 0.5s ease';
                    blackOverlay.style.opacity = 0;
                    whiteOverlay.classList.add("hidden");
                    purpleOverlay.classList.add("hidden");
                    blackOverlay.classList.add("hidden");},500)
                    document.body.style.backgroundColor="black";
                text.remove(); 
                description.remove(); 
                overlay.remove();
                arrow.remove();
            }, 1000);
        }, 2000);
    }, duration);
}

function AfterLoadingPage() {
    const enter = document.getElementById("enter");
    enter.remove();
    setTimeout(() => {
        document.body.insertAdjacentElement('beforeend', enter);
    }, 6200);
}

function showMenuItems() {
    // Reset all items
    menuItems.forEach((item) => {
        item.classList.remove('active'); // Remove active class
        item.style.color = 'beige'; // Reset color
    });
    // Show current item
    menuItems[currentIndex].classList.add('active'); // Add active class to current item
    menuItems[currentIndex].style.color = 'yellow'; // Highlight active item
    // Sync with scrolling
    document.querySelector('.menu-container').style.transform = `translateX(-${(currentIndex * 100) / menuItems.length}%)`;
    // Update arrows
    updateArrows();
}
// Functions to navigate through menu items
function showPrevious() {
    if (currentIndex === 0) {
        currentIndex = menuItems.length - 1; // Wrap to last menu
    } else {
        currentIndex--; // Go back one menu
    }
    showMenuItems(); // Refresh the displayed items
    scrollToSection(currentIndex); // Scroll to section
}

function showNext() {
    if (currentIndex === menuItems.length - 1) {
        currentIndex = 0; // Wrap to first menu
    } else {
        currentIndex++; // Move to the next menu
    }
    showMenuItems(); // Refresh the displayed items
    scrollToSection(currentIndex); // Scroll to section
}

// Function to scroll to a specific section
function scrollToSection(index) {
    const section = document.getElementById(`section${index + 1}`);
    section.scrollIntoView({ behavior: 'smooth' }); // Scroll smoothly to the section
}
// Update arrow visibility based on current index
function updateArrows() {
    const leftArrow = document.getElementById('prev');
    const rightArrow = document.getElementById('next');

    // Show left arrow for first section and last section
    if (currentIndex === 0) {
        leftArrow.style.opacity = 1; // Show left arrow
    } else {
        leftArrow.style.opacity = 1; // Always show left arrow
    }

    // Show right arrow for last section and first section
    if (currentIndex === menuItems.length - 1) {
        rightArrow.style.opacity = 1; // Show right arrow
    } else {
        rightArrow.style.opacity = 1; // Always show right arrow
    }
}

// Navbar scroll behavior
let lastScrollY = window.scrollY; // Track last scroll position
let navbar = document.getElementById('navbar');
let navbarHeight = navbar.offsetHeight; // Get the navbar height
let isScrollingUp = false;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY; // Current scroll position
    const scrollDifference = currentScrollY - lastScrollY; // Calculate the difference

    if (scrollDifference > 0 && isScrollingUp) {
        // Scrolling down
        isScrollingUp = false;
        navbar.style.transition = 'transform 0.3s ease';
        navbar.style.transform = `translateY(-${navbarHeight}px)`; // Move navbar off the screen
    } else if (scrollDifference < 0 && !isScrollingUp) {
        // Scrolling up
        isScrollingUp = true;
        navbar.style.transition = 'transform 0.3s ease';
        navbar.style.transform = `translateY(0)`; // Bring navbar back into view
    }

    lastScrollY = currentScrollY; // Update last scroll position

    // Update current index based on scroll position
    updateCurrentIndexBasedOnScroll();
});

// Function to update current index based on scroll position
function updateCurrentIndexBasedOnScroll() {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentIndex = index; // Update current index
            showMenuItems(); // Refresh menu items
        }
    });
}

// Initialize menu items and set up event listeners
const menuItems = document.querySelectorAll('.menu-item');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let currentIndex = 0;

// Event listeners for arrows
prevButton.addEventListener('click', showPrevious);
nextButton.addEventListener('click', showNext);

// Initialize functions on page load
disappearTextAndChangeBackground(3000);
AfterLoadingPage();
showMenuItems(); // Call this to display the first items when the page loads

function changeImage(imageNumber) {
    let currentImage = 1;
    const images = {
        1: "Picture/Picture0.png",
        2: "Picture/Picture2.png",
        3: "Picture/Picture1.png"
    };
    // Update image source (using placeholder images for demonstration)
    const img = document.getElementById('displayImage');

    img.src = images[imageNumber];
    
    // Update active button state
    const buttons = document.querySelectorAll('button');
    buttons.forEach((btn, index) => {
        if (index + 1 === imageNumber) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    currentImage = imageNumber;
}

// Other existing code for scrolling and loading
document.addEventListener("DOMContentLoaded", function() {
    const content = document.querySelector('.content');

    // Example of changing the scrollbar color on a button click
    const button = document.createElement('button');
    button.innerText = "Change Scrollbar Color";
    document.body.prepend(button);

    button.addEventListener('click', function() {
        content.style.setProperty('--scrollbar-thumb-color', '#ff5733');
    });
});



