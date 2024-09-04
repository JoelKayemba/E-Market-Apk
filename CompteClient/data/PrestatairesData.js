const prestataires = [
  {
      id: '1',
      nom: 'Will Wash',
      service: 'Designer',
      experience: '5 ans',
      mail: 'willwash@gmail.com',
      telephone: '+1 8976547683',
      linkedin:'@wiilwah25',
      description: 'Spécialisée dans l\'art performance, Tania combine art et activisme. Utilisant son art pour aborder des questions sociales et politiques.',
      imageUrl: require('../../assets/prestataire/pres1.jpg'),
      education: [
        { ecole: 'École Nationale Supérieure des Beaux-Arts', diplome: 'Master en Beaux-Arts', annee: '2002' },
        { ecole: 'Institut d\'art de Chicago', diplome: 'BFA en Art Performance', annee: '1999' }
      ],
      projets: [
        { titre: 'Projet A', description: 'Une série d\'installations publiques abordant les droits humains.', image: require('../../assets/prestataire/projetA.jpg') },
        { titre: 'Projet B', description: 'Une performance interactive dans un espace urbain.', image: require('../../assets/prestataire/projetB.jpg') }
      ]
    },
    {
      id: '2',
      nom: 'Christian moyindo',
      service: 'Programmeur',
      experience: '8 ans',
      mail:'Christian2@gmail.com',
      telephone:'+242 8007654763',
      linkedin:'@Christian',
      imageUrl: require('../../assets/prestataire/pres2.jpg'),
      description: 'Développeur full-stack passionné par les technologies front-end et l\'expérience utilisateur.',
      education: [
        { ecole: 'Université de Californie, Berkeley', diplome: 'BS en Informatique', annee: '2010' }
      ],
      projets: [
        { titre: 'Site E-commerce', description: 'Développement d\'une plateforme e-commerce pour une startup locale.', image: require('../../assets/prestataire/projetC.jpg') },
        { titre: 'Application mobile', description: 'Création d\'une application pour la gestion de tâches quotidienne.', image: require('../../assets/prestataire/projetD.jpg') }
      ]
    },
    {
      id: '3',
      nom: 'Josh Ntalemwa',
      service: 'Architecte',
      experience: '10 ans',
      mail:'NtalemwaJosah@gmail.com',
      telephone:'+243 897654763',
      linkedin:'@ntalemwaJosh',
      imageUrl: require('../../assets/prestataire/pres3.jpg'),
      description: 'Architecte primée, intéressée par les designs durables et écologiques.',
      education: [
        { ecole: 'MIT, Massachusetts Institute of Technology', diplome: 'Master en Architecture', annee: '2012' }
      ],
      projets: [
        { titre: 'Projet résidentiel durable', description: 'Conception d\'une résidence éco-responsable à faible impact environnemental.', image: require('../../assets/prestataire/projetE.jpg') },
        { titre: 'Rénovation d\'espace commercial', description: 'Transformation d\'un espace commercial en un lieu moderne et éco-énergétique.', image: require('../../assets/prestataire/projetF.jpg') }
      ]
    },
    {
      id: '4',
      nom: 'Elie Kayemba',
      service: 'Photographe',
      experience: '1 ans',
      mail:'eliekayemba@gmail.com',
      telephone:'+243 897654763',
      linkedin:'@eliekayemba',
      imageUrl: require('../../assets/prestataire/pres4.jpg'),
      description: 'Photographe de paysages qui capture les merveilles naturelles à travers le monde.',
      education: [
        { ecole: 'École Nationale Supérieure de la Photographie', diplome: 'Diplôme en Photographie', annee: '2008' }
      ],
      projets: [
        { titre: 'Lumières du Nord', description: 'Une collection de photos des aurores boréales en Scandinavie.', image: require('../../assets/prestataire/projetG.jpg') },
        { titre: 'Déserts du monde', description: 'Une exposition photo explorant les vastes déserts de la planète.', image: require('../../assets/prestataire/projetH.jpg') }
      ]
    },
    {
      id: '5',
      nom: 'Josiane Efofo',
      service: 'Coiffeuse',
      experience: '3 ans',
      mail:'efofojosiane@gmail.com',
      telephone:'+123 97654763',
      linkedin:'@josianeefofo',
      imageUrl: require('../../assets/prestataire/pres5.jpg'),
      description: 'Experte en coiffure avec une grande attention aux détails et aux dernières tendances.',
      education: [
        { ecole: 'Académie de Coiffure de Paris', diplome: 'Certificat de Coiffure Avancée', annee: '2014' }
      ],
      projets: [
        { titre: 'Fashion Hair Show', description: 'Création de coiffures innovantes pour un défilé de mode.', image: require('../../assets/prestataire/projetI.jpg') }
      ]
    },
    {
      id: '6',
      nom: 'Jeanne d\'Arc',
      service: 'Cuisinière',
      experience: '2 ans',
      mail:'jeanne@gmail.com',
      telephone:'+243 897654763',
      linkedin:'@jeannedarc',
      imageUrl: require('../../assets/prestataire/pres6.jpg'),
      description: 'Chef cuisinière spécialisée dans la cuisine fusion, combinant tradition et innovation.',
      education: [
        { ecole: 'École Culinaire de Lyon', diplome: 'Diplôme en Arts Culinaires', annee: '2016' }
      ],
      projets: [
        { titre: 'Gourmet Gala', description: 'Préparation de plats signature pour un événement de gala.', image: require('../../assets/prestataire/projetJ.jpg') }
      ]
    },
    {
      id: '7',
      nom: 'Eliane Both',
      service: 'Architecte',
      experience: '2 ans',
      mail:'elianeboth@gmail.com',
      telephone:'+243 897654763',
      linkedin:'@elianeboth',
      imageUrl: require('../../assets/prestataire/pres7.jpg'),
      description: 'Conception architecturale axée sur l\'innovation et l\'utilisation de matériaux durables.',
      education: [
        { ecole: 'Université d\'Architecture de Berlin', diplome: 'Master en Conception Durable', annee: '2015' }
      ],
      projets: [
        { titre: 'Éco-Quartier', description: 'Développement d\'un quartier résidentiel éco-responsable.', image: require('../../assets/prestataire/projetK.jpg') }
      ]
    },
    {
      id: '8',
      nom: 'Emmanuella watson',
      service: 'Business Woman',
      experience: '2 ans',
      mail:'emmanuielwatson@gmail.com',
      telephone:'+243 897654763',
      linkedin:'@emmanuelwatson',
      imageUrl: require('../../assets/prestataire/pres8.jpg'),
      description: 'Entrepreneure innovante dans le domaine de la technologie, fondatrice de plusieurs startups à succès.',
      education: [
        { ecole: 'École de Commerce de Harvard', diplome: 'MBA', annee: '2012' }
      ],
      projets: [
        { titre: 'Tech Startup', description: 'Lancement d\'une startup technologique révolutionnaire.', image: require('../../assets/prestataire/projetL.jpg') }
      ]
    }
];

export default prestataires;
