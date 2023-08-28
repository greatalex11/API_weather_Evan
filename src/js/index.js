let settingIcon = document.querySelector("#setting_icon");
console.log(settingIcon);
let formulaireSetting = document.querySelector("#formulaire");
console.log(formulaireSetting);
let mainPage = document.querySelector("#mainPage");
console.log(mainPage);
let settingPage = document.querySelector(".ctn_setting_page");
console.log(settingPage);
let moreInfosPage = document.querySelector(".moreInfoPage");
console.log(moreInfosPage);
let moreInfosIcon = document.querySelector("#info") ; 
let ctnWiki = document.querySelector(".ctn_wiki") ; 
let weatherIcon = document.querySelector("#weatherIcon");
console.log(weatherIcon);
const weatherIcons = {
	Clear: "/src/assets/meteo/sun.svg",
	Clouds: "/src/assets/meteo/cloudy.svg",
	Rain: "/src/assets/meteo/rain-1.svg",
	Thunderstorm: "/src/assets/meteo/storm.svg",
	Snow: "/src/assets/meteo/snow.svg",
};



// En appuyant sur l'incone d'engrenage le main disparait en lui appliquant un display none et même temps la partie setting page qui est de base en display non apparait avec un display flex cela permet de mimer un changement de page en gardant un seul fichier html

settingIcon.addEventListener("click", function () {
    mainPage.classList.toggle('hidden') ;
    settingPage.classList.toggle('hidden') 
});

moreInfosIcon.addEventListener("click", function () {
    mainPage.classList.toggle('hidden');
    ctnWiki.classList.toggle('hidden') ; 
});

// Initialisation de la map OpenstreetMap

let map = L.map("map").setView([47.23, 6.024], 15);
// Inverser les deux chiffre par rapport à capitals_europe_master.json

//Geolocalisation à l'ouverture de l'application

map.locate({ setView: true, maxZoom: 16 });

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 19,
	attribution:
		'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

function onLocationFound(e) {
	var radius = e.accuracy;

	L.marker(e.latlng)
		.addTo(map)
		.bindPopup(" T'es ici " + e.latlng + " le sang")
		.openPopup();

	L.circle(e.latlng, radius).addTo(map);

}

map.on("locationfound", onLocationFound);

function onLocationError(e) {
	alert(e.message);
}

map.on("locationerror", onLocationError);

// Indique longitude et Latitude quanďla map est cliqué
let popup = L.popup();

function onMapClick(e) {
	popup
		.setLatLng(e.latlng)
		.setContent("Voici la zone ! " + e.latlng.toString())
		.openOn(map);
}

map.on("click", onMapClick);


//fonction principale d'appelle de l'api 
function searchInAPI (location) {

    rsltRech = location

    fetch(
        "http://api.openweathermap.org/geo/1.0/direct?q=" +
            rsltRech +
            "&limit=1&appid=308072db4828ee7f23b0fe63c3dd9918"
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data[0].lat);
            console.log(data[0].lon);

            //ajout d'un marqueur sur la zone de recherche avec une fenetre pop-up
            map.setView([data[0].lat, data[0].lon], 15);
            let markerRsltRech = L.marker([data[0].lat, data[0].lon]).addTo(map);
            markerRsltRech.bindPopup("T'es à " + rsltRech + " le sang").openPopup();
            // cercle de zone
            L.circle([data[0].lat, data[0].lon], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.2,
                radius: 1000
            }).addTo(map);


            fetch(
                "https://api.openweathermap.org/data/2.5/weather?lat=" +
                    data[0].lat +
                    "&lon=" +
                    data[0].lon +
                    "&units=metric&appid=308072db4828ee7f23b0fe63c3dd9918"
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);

                    // permet d'afficher la température sur un nombre entier
                    document.querySelector("#temp").innerHTML =
                        Math.round(data.main.temp) + "°C";
                    let temperature = Math.round(data.main.temp);
                    console.log(temperature);

                    // Affiche les icones selon le temps
                    const weatherMain = data.weather[0].main;
                    if (weatherIcons.hasOwnProperty(weatherMain)) {
                        weatherIcon.src = weatherIcons[weatherMain];
                    }

                    // change la couleur du dégradé selon la température
                    let ctnInfoMeteo = document.querySelector("#ctn_info_meteo");
                    if (temperature <= 6) {
                        ctnInfoMeteo.classList.replace(
                            "glass_filter",
                            "cold_temp_filter"
                        );
                    } else if (temperature >= 18) {
                        ctnInfoMeteo.classList.replace(
                            "glass_filter",
                            "hot_temp_filter"
                        );
                    }
                    
                });
        });

    //retour page d'accueil
    mainPage.classList.toggle("hidden");
    settingPage.classList.toggle("hidden");
    }


document
	.getElementById("validation")
	.addEventListener("click", function  (event) {
		// Empêche le comportement par défaut du bouton "submit" car sinon la page se rafraichit
		event.preventDefault();
		//recupere le rslt de la recherche          
        rsltRech = document.getElementById("recherche").value;  
        searchInAPI(rsltRech); 
    }); 


//fonctionnalité random 
    document
        .getElementById("random")
        .addEventListener("click" , function (event) {
            //recupérer le nom d'une ville au hasard via le tableau city.list.json

            fetch('./json/city.list.json')
                .then(reponse => reponse.json())
                .then(data => {

                    function getRandomCity(){
                        const randomIndex = Math.floor(Math.random() * data.length);
                        const randomCity = data[randomIndex].name; 
                        return randomCity ; 
                    }
                    const cityFromArray = getRandomCity() ; 
                    searchInAPI(cityFromArray) ; 
                    let nomVilleAleatoire = cityFromArray ; 
                    getWikiInfos(nomVilleAleatoire) ; 
                })

        }); 

// fonctionalité infos wikipédia 
async function  getWikiInfos (nomVilleAleatoire){
    const wikiApiLink = "https://fr.wikipedia.org/api/rest_v1/page/summary/";
    const wikiQuery = wikiApiLink + nomVilleAleatoire ;

    let reponseWiki = await fetch(wikiQuery) ; 
    let dataWiki = await reponseWiki.json() ; 
    console.log(dataWiki) ;

    let wikiText = dataWikipedia.extract;
    console.log(wikiText) ; 

    const ctnWiki = document.querySelector(".ctnTextFromWikiAPI") ; 
    ctnWiki.textContent = wikiText ; 

}



