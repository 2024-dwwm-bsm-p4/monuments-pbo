// Données des monuments
const monuments = {
    "monuments": [
        {
            "id": 1,
            "name": "Arc de Triomphe",
            "city": "Paris",
            "state": "France",
            "latitude": 48.8738,
            "longitude": 2.2950,
            "description": "Un monument emblématique de Paris, honorant ceux qui ont combattu pour la France.",
            "img": "images/arc_de_triomphe.webp"
        },
        {
            "id": 2,
            "name": "Mont Saint-Michel",
            "city": "Normandie",
            "state": "France",
            "latitude": 48.6361,
            "longitude": -1.5115,
            "description": "Un îlot rocheux avec une abbaye médiévale, un des sites touristiques les plus visités de France.",
            "img": "images/mont_saint_michel.webp"
        },
        {
            "id": 3,
            "name": "Notre-Dame",
            "city": "Paris",
            "state": "France",
            "latitude": 48.852968,
            "longitude": 2.349902,
            "description": "Cathédrale gothique du XIIe siècle, connue pour son architecture et son histoire.",
            "img": "images/notre_dame.webp"
        },
        {
            "id": 4,
            "name": "Tour Eiffel",
            "city": "Paris",
            "state": "France",
            "latitude": 48.8584,
            "longitude": 2.2945,
            "description": "Le monument le plus célèbre de Paris, construit pour l'Exposition universelle de 1889.",
            "img": "images/tour_eiffel.webp"
        },
        {
            "id": 5,
            "name": "Versailles",
            "city": "Versailles",
            "state": "France",
            "latitude": 48.804865,
            "longitude": 2.120355,
            "description": "Ancienne résidence royale, célèbre pour ses jardins et son architecture.",
            "img": "images/versailles.webp"
        }
    ]
};

// Initialisation de la carte Leaflet
var map = L.map('map').setView([48.8584, 2.2945], 5); // Centrer la carte sur Paris

// Ajouter un layer de fond (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Créer des boutons pour chaque monument
const navbarDiv = document.querySelector('.navbar');
monuments.monuments.forEach(function (monument) {
    // Créer un bouton pour chaque monument
    const button = document.createElement('button');
    button.textContent = monument.name; // Nom du monument
    button.setAttribute('data-id', monument.id); // Ajouter l'id
    button.addEventListener('click', function () {
        displayDescription(monument.id); // Afficher la description
        showMonumentOnMap(monument); // Afficher le monument sur la carte
    });
    navbarDiv.appendChild(button); // Ajouter le bouton à la navbar
});

// Fonction pour afficher la description du monument
function displayDescription(id) {
    const monument = monuments.monuments.find(m => m.id === id);
    const nameElement = document.getElementById('monument-name');
    const cityElement = document.getElementById('monument-city');
    const descriptionElement = document.getElementById('monument-description');
    const stateElement = document.getElementById('monument-state');

    if (monument) {
        nameElement.textContent = monument.name; // Mettre à jour le nom
        cityElement.textContent = `${monument.city}, `; // Mettre à jour la ville
        descriptionElement.textContent = monument.description; // Mettre à jour la description
        stateElement.textContent = monument.state;
        applyGrayscale(monument.id);
    } else {
        nameElement.textContent = "Nom non trouvé.";
        cityElement.textContent = "";
        descriptionElement.textContent = "Description non trouvée.";
        stateElement.textContent = "Région non trouvée.";
    }
}

// Fonction pour afficher le monument sur la carte
function showMonumentOnMap(monument) {
    // Vider les marqueurs existants (s'il y en a)
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Ajouter un marqueur pour le monument sélectionné
    const marker = L.marker([monument.latitude, monument.longitude]).addTo(map);
    marker.bindPopup(monument.name).openPopup(); // Lier le marqueur au nom et l'ouvrir
    map.setView([monument.latitude, monument.longitude], 13); // Centrer la carte sur le monument
}

// Gestion de l'affichage de la carte avec le bouton "Afficher la carte"
const showMapButton = document.getElementById('show-map-button'); // Sélectionner le bouton
const mapDiv = document.getElementById('map'); // Sélectionner le div de la carte

// Masquer la carte par défaut
mapDiv.style.display = 'none';

showMapButton.addEventListener('click', function () {
    // Vérifier l'état d'affichage de la carte
    if (mapDiv.style.display === 'none' || mapDiv.style.display === '') {
        mapDiv.style.display = 'block'; // Afficher la carte
        map.invalidateSize(); // Ajuster la taille de la carte
        showMapButton.textContent = 'Masquer la carte'; // Mettre à jour le texte du bouton
    } else {
        mapDiv.style.display = 'none'; // Cacher la carte si déjà affichée
        showMapButton.textContent = 'Afficher la carte'; // Remettre le texte d'origine
    }
});

// Fonction pour afficher les images des monuments
function displayMonumentImages() {
    const imgContainer = document.querySelector('.img-container');
    imgContainer.innerHTML = ''; // Vider le conteneur avant d'ajouter les images

    monuments.monuments.forEach(function (monument) {
        const imgElement = document.createElement('img');
        imgElement.src = monument.img; // Chemin de l'image corrigé
        imgElement.alt = monument.name; // Texte alternatif

        // Ajouter un événement click sur l'image
        imgElement.addEventListener('click', function () {
            displayDescription(monument.id); // Appeler la fonction avec l'ID du monument
            showMonumentOnMap(monument); // Afficher le monument sur la carte
        });

        imgContainer.appendChild(imgElement); // Ajouter l'image au conteneur
    });
}

// Appliquer du noir et blanc aux images sauf celle cliquée
function applyGrayscale(selectedId) {
    const images = document.querySelectorAll('.img-container img');

    images.forEach(image => {
        // Comparaison du nom de fichier uniquement (sans le chemin absolu)
        const imgName = image.src.split('/').pop(); // Récupère uniquement le nom de fichier
        const monument = monuments.monuments.find(m => m.img.includes(imgName)); // Comparaison avec le chemin relatif

        if (monument && monument.id === selectedId) {
            image.classList.remove('grayscale'); // Retirer l'effet noir et blanc de l'image cliquée
        } else {
            image.classList.add('grayscale'); // Appliquer l'effet noir et blanc aux autres images
        }
    });
}

// Enlever l'effet noir et blanc après le rafraîchissement de la page
window.addEventListener('load', function () {
    const images = document.querySelectorAll('.img-container img');
    images.forEach(image => {
        image.classList.remove('grayscale'); // Retirer l'effet noir et blanc de toutes les images
    });
});

// Appeler la fonction pour afficher les images des monuments
displayMonumentImages();
