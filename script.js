
// s3 bucket url to fetch from
const s3URL = "https://updated-flavors-gac.s3.us-west-2.amazonaws.com/";
 
// arrays of objects that will hold 
// Img object {urlForm: "image src url", displayForm: "display name"} pairs]
let allFlavors = [];
let veganFlavors = [];
let seasonalFlavors = [];

// categorized <ul> elements that will hold the displayed images/text
let allFlavorsList = document.querySelector('.image-list.all');
let seasonalFlavorsList = document.querySelector('.image-list.seasonal');
let veganFlavorsList = document.querySelector('.image-list.vegan');

// initial collection of unformatted data
let flavorObjects = [];

// loading animation
const loading = document.querySelector(".loader");

function Img(urlForm, displayForm, flavType) {
    this.urlForm = `${s3URL}${urlForm}`;
    this.displayForm = displayForm;
    this.flavType = flavType;
}

// fetch images from s3 bucket, send xml to be converted,
// then add event listeners to buttons
async function getImageURLs() {
    const request = new Request(s3URL);
    fetch(request)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Fetch failed.");
            } else {
                console.log("Fetch successful.");
                return response.text();
            }
        })
        .then((xmlString) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "text/xml");
            createList(xmlDoc);
        })
        .then(() => {
            const flavorBtns = document.querySelectorAll(".flavor-button");
            for (const btn of flavorBtns) {
                btn.addEventListener("click", (event) => {
                    toggleLists(event);
                });
            }
        });
}


// convert xml elements -> array 
function createList(xml) {
    let elements = xml.getElementsByTagName("Contents");
    const imgObjs = Array.from(elements);
    createListOfFlavors(imgObjs);
}


// get the image key and add to img object before further formatting
function createListOfFlavors(imgObjs) {
    let flavors = [];
    for (let i = 0; i < imgObjs.length; i++) {

        // original image's long name
        const flavor = imgObjs[i].childNodes[0].innerHTML;
        flavors.push(flavor);

        const imgObj = new Img(flavor);
        flavorObjects.push(imgObj);
    }
    parseFlavorNames(flavors);
}


// formatting for display, the data doesn't follow a super consistent format, some
// use underscores and some have multiple dashes that can be used as delimiters
function parseFlavorNames(flavorsBefore) {
    let formattedFlavors = [];

    for (let i = 0; i < flavorsBefore.length; i++) {
        if (flavorObjects[i].urlForm.includes("Seasonal")) {
            flavorObjects[i].flavType = "seasonal";
        }
        if (flavorObjects[i].urlForm.includes("OAT")) {
            flavorObjects[i].flavType = 'vegan';
        }
        if (flavorsBefore[i].includes("_")) {
            formattedFlavors.push(flavorsBefore[i].slice(0, flavorsBefore[i].indexOf('_')));
        } else {
            formattedFlavors.push(flavorsBefore[i].slice(0, flavorsBefore[i].lastIndexOf('-')));
        }
    }
    // regex to remove dashes and add spaces
    formattedFlavors = formattedFlavors.map((flavor) => flavor.replace(/(?<!-)([A-Z])/g, ' $1').trim().replace(/\s+/g, ' '));

    for (let i = 0; i < formattedFlavors.length; i++) {
        flavorObjects[i].displayForm = formattedFlavors[i];
    }
    sortFlavors(flavorObjects);
}


// sorts flavors into categories: All, Seasonal, and Vegan
function sortFlavors(flavorObjects) {
    const veganIdentifiers = ["Soy", "Sherbet", "Ice"];

    allFlavors = flavorObjects;

    for (let i = 0; i < veganIdentifiers.length; i++) {
        veganFlavors = allFlavors.filter((flavorObj) => 
            veganIdentifiers.some(identifier => flavorObj.displayForm.includes(identifier)) 
            || (flavorObj.flavType == 'vegan'));
    }   
    seasonalFlavors = allFlavors.filter((flavorObj) => 
        (flavorObj.flavType == 'seasonal'));

    createImageItems(allFlavors, 'all');
    createImageItems(seasonalFlavors, 'seasonal');
    createImageItems(veganFlavors, 'vegan');
}


// Create <li> elements and append <img> and <p> elements
// with their corresponding src attributes and text onto them.
function createImageItems(flavorObjects, flavorType) {
    console.log("Iterating through image objects.", flavorObjects);
    // if we're on the home page, just get the imgs for the marquee
    if (window.location.pathname.includes("flavors")) {
        for (let i = 0; i < flavorObjects.length; i++) {
            if (flavorType == 'all') {
                allFlavorsList.appendChild(getListItem(i, flavorObjects));
            } else if (flavorType == 'seasonal') {
                seasonalFlavorsList.appendChild(getListItem(i, flavorObjects));
            } else if (flavorType == 'vegan') {
                veganFlavorsList.appendChild(getListItem(i, flavorObjects));
            }
        }
    }
}

// Adds flavor <li> element to its corresponding <ul> and is displayed.
function getListItem(i, flavorObjects) {
        console.log("Creating image elements.");
        let listItem = document.createElement("li");
        listItem.classList.add('flavor-item');
        loading.classList.add("hide");

        let imgElement = document.createElement("img");
        imgElement.setAttribute('src', flavorObjects[i].urlForm);
        imgElement.setAttribute('loading', 'lazy');
        imgElement.setAttribute('class', 'flavor-img');
        imgElement.setAttribute('alt', `A scoop of ${flavorObjects[i].displayForm} icecream.`);

        let flavorCaption = document.createElement("p");
        flavorCaption.textContent = flavorObjects[i].displayForm;

        listItem.appendChild(imgElement);
        listItem.appendChild(flavorCaption);
        
        return listItem;
}   

// Only fetch + load images on Flavors page
window.onload = function() {
    if (window.location.pathname.includes("flavors")) {
        getImageURLs();
    }
};


// Toggle which lists is being displayed: All Flavors, Seasonal, Vegan
// + toggle styles on active list buttons
function toggleLists(event) { 
    
    // button's id (all, vegan, seasonal)
    let id = event.target.id; 

    const lists = document.querySelectorAll(".image-list");
    const btns = document.querySelectorAll(".flavor-button");

    // All, Vegan, Seasonal Lists of fbuttonsflavor images
    for (let i = 0; i < lists.length; i++) {
        lists[i].classList.toggle('active', (lists[i].id).slice(0, lists[i].id.indexOf("-")) === id);
    }

    // All, Vegan, Seasonal buttons
    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.toggle('button-active', btns[i].id === id);
    }
}






