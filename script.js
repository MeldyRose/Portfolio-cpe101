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
        body.style.color = "beige";
        
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
        item.classList.remove('active');
        item.style.color = 'beige';
    });
    menuItems[currentIndex].classList.add('active');
    menuItems[currentIndex].style.color = 'yellow';
    document.querySelector('.menu-container').style.transform = `translateX(-${(currentIndex * 100) / menuItems.length}%)`;
    updateArrows();
}
function showPrevious() {
    if (currentIndex === 0) {
        currentIndex = menuItems.length - 1;
    } else {
        currentIndex--;
    }
    showMenuItems(); 
    scrollToSection(currentIndex);
}

function showNext() {
    if (currentIndex === menuItems.length - 1) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    showMenuItems();
    scrollToSection(currentIndex);
}

function scrollToSection(index) {
    const section = document.getElementById(`section${index + 1}`);
    section.scrollIntoView({ behavior: 'smooth' });
}
function updateArrows() {
    const leftArrow = document.getElementById('prev');
    const rightArrow = document.getElementById('next');

    if (currentIndex === 0) {
        leftArrow.style.opacity = 1; 
    } else {
        leftArrow.style.opacity = 1;
    }
    if (currentIndex === menuItems.length - 1) {
        rightArrow.style.opacity = 1;
    } else {
        rightArrow.style.opacity = 1;
    }
}

let lastScrollY = window.scrollY;
let navbar = document.getElementById('navbar');
let navbarHeight = navbar.offsetHeight; 
let isScrollingUp = false;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollDifference = currentScrollY - lastScrollY;

    if (scrollDifference > 0 && isScrollingUp) {
        
        isScrollingUp = false;
        navbar.style.transition = 'transform 0.3s ease';
        navbar.style.transform = `translateY(-${navbarHeight}px)`;
    } else if (scrollDifference < 0 && !isScrollingUp) {
        
        isScrollingUp = true;
        navbar.style.transition = 'transform 0.3s ease';
        navbar.style.transform = `translateY(0)`;
    }

    lastScrollY = currentScrollY; 

    updateCurrentIndexBasedOnScroll();
});


function updateCurrentIndexBasedOnScroll() {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentIndex = index; 
            showMenuItems(); 
        }
    });
}


const menuItems = document.querySelectorAll('.menu-item');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let currentIndex = 0;

prevButton.addEventListener('click', showPrevious);
nextButton.addEventListener('click', showNext);

disappearTextAndChangeBackground(3000);
AfterLoadingPage();
showMenuItems();

function changeImage(imageNumber) {
    let currentImage = 1;
    const images = {
        1: "Picture/Picture0.png",
        2: "Picture/Picture2.png",
        3: "Picture/Picture1.png"
    };
    const img = document.getElementById('displayImage');

    img.src = images[imageNumber];
    
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
document.addEventListener("DOMContentLoaded", function() {
    const content = document.querySelector('.content');
    const button = document.createElement('button');
    button.innerText = "Change Scrollbar Color";
    document.body.prepend(button);

    button.addEventListener('click', function() {
        content.style.setProperty('--scrollbar-thumb-color', '#ff5733');
    });
});



