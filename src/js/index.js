let settingIcon = document.querySelector('#setting_icon') ; 
let formulaireSetting = document.querySelector('#formulaireSettings')
let mainPage = document.querySelector('#mainPage') ; 
let settingPage =  document.querySelector('.ctn_setting_page') ;
console.log('settingIcon') ;
console.log('formulaireSetting') ; 
console.log('mainPage') ; 
console.log('settingPage') ; 


settingIcon.addEventListener('click', function (){
    mainPage.style.display = "none" ;
    settingPage.style.display = "flex" ; 
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


// //desactive submit 
 formulaireSetting.addEventListener("submit", function(event) {
     // Empêche le comportement par défaut du bouton "submit" car sinon la page se rafraichit
    event.preventDefault(); 
});


