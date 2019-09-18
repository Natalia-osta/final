// _________SLIDER___________

const menuButton = document.querySelector(".menu-btn ");
const menuNavigation = document.querySelector(".menu-nav");

menuButton.addEventListener("click", toogleMenu);
function toogleMenu(evt){
    menuButton.classList.toggle('menu-btn_active');
    menuNavigation.classList.toggle('menu-nav_active');
}

const header = document.querySelector("header");
const sliderNav = document.querySelector(".slider-nav");

sliderNav.addEventListener('click', numPressed);

function numPressed(ev) {
    if(ev.target.nodeName !== "LI"){
        return;
    }
    sliderNav.querySelectorAll('.slider-item').forEach(el => el.classList.remove("item-active"));
    switch(ev.target.dataset.bg) {
        case '1':
        header.style.background ="url('img/slider/1.jpg')";
        ev.target.classList.add("item-active");
        break;
    
        case '2': 
        header.style.background ="url('img/slider/2.jpg')";
        ev.target.classList.add("item-active");
        break;

        case '3':
        header.style.background ="url('img/slider/3.jpg')";
        ev.target.classList.add("item-active");
        break;
      }
    return;
    }
  

    setInterval(() =>{
        const newElem = sliderNav.querySelector('.item-active');
        switch(newElem.dataset.bg) {
            case '1': 

            header.style.background ="url('img/slider/2.jpg')";
            newElem.nextElementSibling.classList.add("item-active");
            newElem.classList.remove("item-active");
            break;
            case '2': 

            header.style.background ="url('img/slider/3.jpg')";
            newElem.nextElementSibling.classList.add("item-active");
            newElem.classList.remove("item-active");
            break;
            case '3':

            header.style.background ="url('img/slider/1.jpg')";
            newElem.previousElementSibling.previousElementSibling.classList.add("item-active");
            newElem.classList.remove("item-active");
            break;
        }
    },3000)


// _________ANCHORS___________
// собираем все якоря; устанавливаем время анимации и количество кадров
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
    animationTime = 300,
    framesCount = 20;

for (let anchor of anchors) {
    anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const blockID = anchor.getAttribute('href');

    document.querySelector('' + blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
});
}

// _________LOAD MORE___________

const GALLERY = [
    {image: "img/foto-product/product5.jpg", title: "TEAK FLOORING S334dS"},
    {image: "img/foto-product/product6.jpg", title: "TEAK WALL S3dsdS"},
    {image: "img/foto-product/product7.jpg", title: "TEAK ROOF dsWED"},
    {image: "img/foto-product/product8.jpg", title: "TEAK BURATINO"},
    {image: "img/foto-product/product9.jpg", title: "TEAK FLOORING red"},
    {image: "img/foto-product/product10.jpg", title: "TEAK WALL blue"},
    {image: "img/foto-product/product11.jpg", title: "TEAK ROOF green"},
    {image: "img/foto-product/product12.jpg", title: "TEAK yellow"}
]

const pdoductGallery = document.querySelector(".gallery-index-wrap");
const galleryButton = document.querySelector(".gallery-button");
const spinner = document.querySelector('.spinner-overlay');

const toggleSpinner = () => spinner.classList.toggle('visible');
galleryButton.addEventListener("click", loadMore);

const createGalleryItems = items => {
    const galleryArr = [];
    const [a, b, c, d, ...oters] = items;
    if(!galleryArr.includes(d)){
        galleryArr.push(a, b, c, d)
        GALLERY.splice(0, 4);
    }
    return galleryArr.reduce(
    (markup, item) =>
        markup +
        `<div class="gallery-index-block"><div class="block"><img src="${item.image}" alt="Merbau Decking"></div><p class="index-gllr-title">${item.title}</p><a class="index-gllr-rm" href="#">read-more ...</a></div>`,'',);
    };
    const updateGallery = markup => {
    pdoductGallery.insertAdjacentHTML('beforeend', markup);
};

function loadMore(ev){
    toggleSpinner()
    setTimeout(()=> {
        const markup = createGalleryItems(GALLERY);
        updateGallery(markup);
        toggleSpinner()
        if(GALLERY.length === 0){
            galleryButton.classList.add("hide")
        }
    }, 2000);
    
}

// _________READ MORE___________
const product = document.querySelector('.product-overlay');

const toggleProduct = () => product.classList.toggle('prodvisible');


galleryButton.addEventListener("click", loadMore);
pdoductGallery.addEventListener("click", showMore)
function showMore(ev){
    if(ev.target.nodeName !== "A"){
        return
    }
    const parent = ev.target.parentNode;
    const image = parent.firstElementChild;
    const imageSrc = image.querySelector("img").getAttribute("src");
    const title = image.nextElementSibling.textContent;
    toggleSpinner()

    setTimeout(()=> {
        const markup = `
        <div class="product-info">
            <div class="inner-product">
                <img src="${imageSrc}" alt="prod">
                <h6 class="prod-title">${title}</h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea totam voluptatibus odit tenetur facere iure omnis consectetur, provident maiores aliquid, praesentium sed placeat modi dignissimos odio corporis quasi voluptas, necessitatibus consequuntur hic. Ad quae, unde blanditiis repellendus, fugit iure deleniti eum quis explicabo sint harum error recusandae commodi tenetur fugiat.</p>
            </div>
            <button class="close-btn">X</button>
        </div>`
        product.insertAdjacentHTML('beforeend', markup);
        toggleSpinner()
        toggleProduct()
        const buttonClose = document.querySelector(".close-btn");
        buttonClose.addEventListener("click", closeBlock)
    }, 2000);
}
function closeBlock(){
    const innerBlock = document.querySelector(".product-info");
    const buttonClose = document.querySelector(".close-btn");
    buttonClose.removeEventListener("click", closeBlock)
    toggleProduct();
    innerBlock.remove();
}