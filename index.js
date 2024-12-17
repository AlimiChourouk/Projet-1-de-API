const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // Permet de traiter les données JSON

// Accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API!');
});

// Tableau des restaurants
let restaurants = [
    {
        id: 1,
        nom: "Restaurant El Tangerino",
        adresse: "Ave Mohammed VI, Tanger, Maroc",
        specialite: "Cuisine espagnole et méditerranéenne",
        note: 4.5,
        telephone: "+212 539-941111",
        avis: "Excellent emplacement face à la mer, service impeccable, plats savoureux et ambiance chaleureuse."
    },
    {
        id: 2,
        nom: "Restaurant Le Saveur du Poisson",
        adresse: "Escalier Waller, Rue Ach-Chourafaa, Tanger, Maroc",
        specialite: "Fruits de mer et poisson",
        note: 4.6,
        telephone: null,
        avis: "Un concept unique avec un menu fixe, tout est délicieux et frais. Très apprécié des locaux et des touristes."
    },
    {
        id: 3,
        nom: "Restaurant Le Relais de Paris",
        adresse: "Hôtel Husa Solazur, Ave Mohammed VI, Tanger, Maroc",
        specialite: "Cuisine française",
        note: 4.3,
        telephone: "+212 539-348383",
        avis: "Cadre élégant, plats raffinés et un service de qualité. Idéal pour une soirée chic."
    },
    {
        id: 4,
        nom: "Restaurant Anna & Paolo",
        adresse: "Rue Ibn Rochd, Tanger, Maroc",
        specialite: "Cuisine italienne",
        note: 4.4,
        telephone: "+212 539-942845",
        avis: "Les meilleures pizzas et pâtes de Tanger, avec un accueil chaleureux et une atmosphère conviviale."
    },
    {
        id: 5,
        nom: "Restaurant Ch'hiwat L'Couple",
        adresse: "Place Riad Sultan, Médina, Tanger, Maroc",
        specialite: "Cuisine marocaine traditionnelle",
        note: 4.7,
        telephone: "+212 539-375345",
        avis: "Des saveurs marocaines authentiques, avec un excellent rapport qualité-prix dans un cadre traditionnel."
    },
    {
        id: 6,
        nom: "Restaurant Ô Saveur",
        adresse: "Route de Malabata, Tanger, Maroc",
        specialite: "Cuisine européenne et marocaine",
        note: 4.5,
        telephone: "+212 539-342123",
        avis: "Une fusion parfaite entre cuisine locale et internationale, service impeccable et vue magnifique."
    }
];

// Récupérer tous les restaurants
app.get('/restaurants', (req, res) => {
    res.json(restaurants);
});

// Ajouter un restaurant
app.post('/restaurants', (req, res) => {
    const nouveauRestaurant = {
        id: Date.now(),
        nom: req.body.nom,
        adresse: req.body.adresse,
        specialite: req.body.specialite,
        note: req.body.note,
        telephone: req.body.telephone,
        avis: req.body.avis
    };
    restaurants.push(nouveauRestaurant);
    res.status(201).json(nouveauRestaurant);
});

// Modifier un restaurant
app.put('/restaurants/:id', (req, res) => {
    const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
    if (!restaurant) return res.status(404).send('Restaurant non trouvé');

    // Mise à jour des champs
    restaurant.nom = req.body.nom || restaurant.nom;
    restaurant.adresse = req.body.adresse || restaurant.adresse;
    restaurant.specialite = req.body.specialite || restaurant.specialite;
    restaurant.note = req.body.note || restaurant.note;
    restaurant.telephone = req.body.telephone || restaurant.telephone;
    restaurant.avis = req.body.avis || restaurant.avis;

    res.json(restaurant);
});

// Supprimer un restaurant
app.delete('/restaurants/:id', (req, res) => {
    const index = restaurants.findIndex(r => r.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Restaurant non trouvé');
    restaurants.splice(index, 1);
    res.sendStatus(204);
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
