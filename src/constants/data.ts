export interface Benefit {
  id: number;
  title: string;
  description: string;
  img: string;
  promo: string;
  address: string;
}

export interface Mark {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
  benefits: Benefit[];
}

export const data: Mark[] = [
  {
    id: 'pizza',
    title: 'Pizza',
    latitude: 37.763007,
    longitude: -122.417370,
    benefits: [
      {
        id: 1,
        title: 'El Rincón de la Pizza',
        description: 'Obtén un 20% de descuento en tu próxima comida.',
        img: 'https://res.cloudinary.com/dramvpuct/image/upload/v1723320994/marketing-pizzeria_v1opgu.png',
        promo: '20% de descuento',
        address: 'Avenida de la Alegría 78, Barcelona, España',
      },
      {
        id: 2,
        title: 'Pizzería Bella Italia',
        description: 'Compra 1 pizza mediana recibe 2 refrescos gratis.',
        img: 'https://res.cloudinary.com/dramvpuct/image/upload/v1723321082/cibo-rustico-pizzeria-2017-web-sr_dnclfn.jpg',
        promo: '1 x 2 bebidas',
        address: 'Paseo del Aroma 88, Murcia, España',
      },
    ],
  },
  {
    id: 'burger',
    title: 'Burger',
    latitude: 37.761722,
    longitude: -122.421608,
    benefits: [
      {
        id: 3,
        title: 'El Horno de la Burguer',
        description: 'Todos los viernes obtén un 15% de descuento en hamburguesas seleccionadas.',
        img: 'https://res.cloudinary.com/dramvpuct/image/upload/v1723321577/hamburguesería-big-js-burger-barcelona-mejores-hamburguesas_a3siyj.jpg',
        promo: '15% Viernes',
        address: 'Calle del Encuentro 21, Salamanca, España',
      },
      {
        id: 4,
        title: 'Longos burger',
        description: 'Paga 2 hamburguesas y lleva 3.',
        img: 'https://res.cloudinary.com/dramvpuct/image/upload/v1723321581/disfruta-las-mejores_ngnzbi.jpg',
        promo: 'Paga 2 lleva 3',
        address: 'Plaza del Gourmet 33, Granada, España',
      },
    ],
  },
  {
    id: 'tacos',
    title: 'Tacos',
    latitude: 37.763771,
    longitude: -122.421793,
    benefits: [
      {
        id: 5,
        title: 'Taquería El Farolito',
        description: 'Obtén un 20% de descuento en tus burritos los sabados.',
        img: 'https://res.cloudinary.com/dramvpuct/image/upload/v1723322039/image_2024-08-10_153357853_jxgzwk.png',
        promo: 'Burros 20%',
        address: 'Ciudad de México, México',
      },
    ],
  },
  {
    id: 'italiano',
    title: 'Italiano',
    latitude: 37.766700,
    longitude: -122.419347,
    benefits: [
      {
        id: 6,
        title: 'Ristorante Il Forno',
        description: 'Paga 1 lleva 2 en pastas seleccionadas.',
        img: 'https://res.cloudinary.com/dramvpuct/image/upload/v1723322134/Cómo-montar-una-cantina-italiana_opt_qiopas.jpg',
        promo: 'Paga 1 lleva 2',
        address: 'Guadalajara, México',
      },
      {
        id: 7,
        title: 'Trattoria Toscana',
        description: 'Obtén un 25% de descuento en tu cuenta los miercoles.',
        img: 'https://res.cloudinary.com/dramvpuct/image/upload/v1723322138/port.prosecco_oasis_grupo-hunan_finales_rdlc_0_2.jpg_i8zlay.jpg',
        promo: '25% miercoles',
        address: 'Cancún, México',
      },
    ],
  },
];
