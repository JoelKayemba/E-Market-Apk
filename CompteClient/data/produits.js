const produits = [
    { 
        id: '1', 
        nom: 'tacos', 
        prix: '10.00', 
        image: require('../../assets/Images/imagesProduits/food9.jpg'), 
        livraison: true, 
        description: 'Délicieux tacos au poulet, garnis de légumes frais et de sauce maison.' ,
        categorie:'Alimentation'
    },
    { 
        id: '2', 
        nom: 'Mac Book', 
        prix: '1200.00', 
        image: require('../../assets/Images/imagesProduits/accessoire1.jpg'), 
        livraison: true, 
        description: 'Ordinateur portable Mac Book, idéal pour le travail et le divertissement.',
        categorie:'Accesoires'
    },
    { 
        id: '3', 
        nom: 'manette', 
        prix: '30.00', 
        image: require('../../assets/Images/manette.jpg'), 
        livraison: false, 
        description: 'Manette de jeu sans fil, compatible avec plusieurs consoles et PC.' ,
        categorie:'Accessoires'
    },
    { 
        id: '4', 
        nom: 'sac', 
        prix: '40.00', 
        image: require('../../assets/Images/sac.jpg'), 
        livraison: true, 
        couleur: ['Noir', 'Marron'], 
        taille: ['Petit', 'Moyen', 'Grand'], 
        description: 'Sac en cuir élégant, disponible en plusieurs tailles et couleurs.' ,
        categorie:'Habillement'
    },
    { 
        id: '5', 
        nom: 'montre Rolex', 
        prix: '40.00', 
        image: require('../../assets/Images/montre.jpg'), 
        livraison: true, 
        couleur: ['Or', 'Argent'], 
        description: 'Montre Rolex de luxe, disponible en or et argent.',
        categorie:'Accessoires'
    },
    { 
        id: '6', 
        nom: 'chaussure Nike', 
        prix: '10.00', 
        image: require('../../assets/Images/produit1.jpg'), 
        livraison: false, 
        couleur: ['black', 'white'], 
        taille: ['38', '39', '40', '41', '42'], 
        description: 'Chaussures de sport Nike, disponibles en plusieurs tailles et couleurs.',
        categorie:'Habillement'
    },
    { 
        id: '7', 
        nom: 'chaussure addidas', 
        prix: '20.00', 
        image: require('../../assets/Images/produit2.jpg'), 
        livraison: true, 
        couleur: ['black', 'white'], 
        taille: ['38', '39', '40', '41', '42'], 
        description: 'Chaussures de sport Adidas, disponibles en plusieurs tailles et couleurs.',
        categorie:'Habillement'
    },
    { 
        id: '8', 
        nom: 'poulet', 
        prix: '25.39', 
        image: require('../../assets/Images/imagesProduits/food6.jpg'), 
        livraison: true, 
        description: 'Poulet rôti, assaisonné avec des épices spéciales.',
        categorie:'Alimentation'
    },
    { 
        id: '9', 
        nom: 'microonde', 
        prix: '40.00', 
        image: require('../../assets/Images/imagesProduits/electronic2.jpg'), 
        livraison: true, 
        description: 'Micro-ondes compact et puissant, idéal pour chauffer et cuisiner rapidement.',
        categorie:'Electronique' 
    },
    { 
        id: '10', 
        nom: 'Iphone xr', 
        prix: '400.00', 
        image: require('../../assets/Images/imagesProduits/accessoire2.jpg'), 
        livraison: true, 
        couleur: ['black', 'Black', 'Red'], 
        description: 'iPhone XR avec écran Retina, disponible en plusieurs couleurs.',
        categorie:'Accessoire' 
    },
    { 
        id: '11', 
        nom: 'botte', 
        prix: '100.00', 
        image: require('../../assets/Images/imagesProduits/fashion5.jpg'), 
        livraison: false, 
        couleur: ['black', 'yellow'], 
        taille: ['38', '39', '40', '41', '42'], 
        description: 'Bottes élégantes, disponibles en noir et marron, et en plusieurs tailles.',
        categorie:'Habillement' 
    },
    { 
        id: '12', 
        nom: 'chaussure', 
        prix: '29.00', 
        image: require('../../assets/Images/imagesProduits/fashion7.jpg'), 
        livraison: true, 
        couleur: ['black', 'white'], 
        taille: ['38', '39', '40', '41', '42'], 
        description: 'Chaussures décontractées, disponibles en plusieurs tailles et couleurs.',
        categorie:'Habillement' 
    },
    { 
        id: '13', 
        nom: 'hamburger', 
        prix: '15.00', 
        image: require('../../assets/Images/imagesProduits/food7.jpg'), 
        livraison: false, 
        description: 'Hamburger juteux avec viande de boeuf, légumes frais et sauce maison.',
        categorie:'Alimentation' 
    },
    { 
        id: '14', 
        nom: 'crayon+stylo', 
        prix: '20.00', 
        image: require('../../assets/Images/imagesProduits/papeterie2.jpg'), 
        livraison: true, 
        description: 'Ensemble de crayons et stylos de haute qualité, parfait pour le bureau ou l’école.',
        categorie:'Papeterie'
    },
    { 
        id: '15', 
        nom: 'paracetamol', 
        prix: '40.00', 
        image: require('../../assets/Images/imagesProduits/health2.jpg'), 
        livraison: true, 
        description: 'Paracetamol pour soulager les douleurs et la fièvre.',
        categorie:'Santé'
    },
    { 
        id: '16', 
        nom: 'meuble de cuisine', 
        prix: '4000.00', 
        image: require('../../assets/Images/imagesProduits/furniture1.jpg'), 
        livraison: true, 
        description: 'Meuble de cuisine moderne et fonctionnel, idéal pour toute cuisine.',
        categorie:'Habillement' 
    },
    { 
        id: '17', 
        nom: 'maquillage', 
        prix: '60.00', 
        image: require('../../assets/Images/imagesProduits/beauty1.jpg'), 
        livraison: true, 
        description: 'Game de beauté adaptée pour tout sorte de visage.',
        categorie:'Habillement' 
    },
];

export default produits;
