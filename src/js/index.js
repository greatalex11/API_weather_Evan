let settingIcon = document.querySelector('#setting_icon') ; console.log(settingIcon) ;
let formulaireSetting = document.querySelector('#formulaireSettings') ; console.log(formulaireSetting) ;
let mainPage = document.querySelector('#mainPage') ; console.log(mainPage) ;
let settingPage =  document.querySelector('.ctn_setting_page') ; console.log(settingPage) ; 
let moreInfosPage = document.querySelector('.moreInfoPage') ; console.log(moreInfosPage)
let weatherIcon = document.querySelector('.weatherIcon') ; console.log(weatherIcon) ;

 
// En appuyant sur l'incone d'engrenage le main disparait en lui appliquant un display none et même temps la partie setting page qui est de base en display non apparait avec un display flex cela permet de mimer un changement de page en gardant un seul fichier html

settingIcon.addEventListener('click', function() {
    mainPage.classList.toggle('hidden');
    settingPage.classList.toggle('visible');

  });

weatherIcon.addEventListener('click', function () {
    weatherIcon.classList.toggle('visible');
    mainPage.classList.toggle('hidden');
})


// Initialisation de la map OpenstreetMap
let map = L.map('map').setView([51.505, -0.09], 13);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// Indique longitude et Latitude quanďla map est cliqué
let popup = L.popup();


function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);


// Geolocalisation 
map.locate({setView: true, maxZoom: 16});

function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("Vous êtes ici " + radius).openPopup();

    L.circle(e.latlng, radius).addTo(map);
}
map.on('locationfound', onLocationFound);

//Message d'erreur Geolocalisation 
function onLocationError(e) {
    alert(e.message);
}
map.on('locationerror', onLocationError);


//Initialisation et geocalisation pour map2

let map2 = L.map('map2').setView([51.505, -0.09], 13);
    // add the same OpenStreetMap tile layer to the second map
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map2);


function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map2);
}

map2.on('click', onMapClick);

    // Geolocalisation 
map2.locate({setView: true, maxZoom: 16});

function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map2)
        .bindPopup("Vous êtes ici " + radius).openPopup();

    L.circle(e.latlng, radius).addTo(map2);
}
map2.on('locationfound', onLocationFound);

    //Message d'erreur Geolocalisation 
function onLocationError(e) {
    alert(e.message);
}
map2.on('locationerror', onLocationError);




// //desactive submit 
//  formulaireSetting.addEventListener("submit", function(event) {
//      // Empêche le comportement par défaut du bouton "submit" car sinon la page se rafraichit
//     // event.preventDefault(); 
   
// });
