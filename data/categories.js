// category index starts from 0 i.e. index('Feste e sagre') = 0

const CATEGORIES = [
  {
    id: '0',
    mainCategory: 'GUSTO E DIVERTIMENTO',
    subCategories: [
      'Feste e sagre',
      'Street food',
      'Vino',
      'Ristoranti',
      'Disco & Club',
    ],
  },

  {
    id: '5',
    mainCategory: 'CULTURA E SPETTACOLO',
    subCategories: [
      'Musica',
      'Spettacolo',
      'Arte',
      'Teatro',
      'Danza',
      'Cinema',
      'Libri',
      'Corsi',
    ],
  },

  {
    id: '13',
    mainCategory: 'SPORT E NATURA',
    subCategories: [
      'Escursioni e trekking',
      'Bici',
      'Avventura',
      'In acqua',
      'In aria',
      'Gare e tornei',
      'Motori',
    ],
  },

  {
    id: '20',
    mainCategory: 'EXPO E ACQUISTI',
    subCategories: [
      'Fiere tradizionali',
      'Mercatini',
      'Esposizioni',
      'Centri commerciali',
      'Negozi',
    ],
  },
];

export default CATEGORIES;
