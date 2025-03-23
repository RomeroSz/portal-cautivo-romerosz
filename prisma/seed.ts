import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedAds() {
  const ads = [
    {
      title: 'VenElectronics - Ofertas en Electrónica',
      description: 'Encuentra los mejores electrodomésticos y aparatos electrónicos con descuentos exclusivos. ¡Compra ahora!',
      imageUrl: 'https://venelectronics.com/cdn/shop/files/aqui_es_donde_es_1944x.png?v=1733833870',
      targetUrl: 'https://venelectronics.com',
    },
    {
      title: 'Ridery - Tu Transporte Seguro',
      description: 'Movilízate de manera rápida y segura con Ridery. Solicita un taxi o vehículo privado en minutos.',
      imageUrl: 'https://latamobility.com/wp-content/uploads/2022/03/Ridery_oficial.jpg',
      targetUrl: 'https://ridery.app',
    },
    {
      title: 'Yummy - Delivery de Comida',
      description: 'Pide tus platillos favoritos desde la comodidad de tu hogar. ¡Entrega rápida y sabores increíbles!',
      imageUrl: 'https://sitaramagazine.com.ve/wp-content/uploads/2022/03/k1.jpg',
      targetUrl: 'https://www.yummysuperapp.com/',
    },
    {
      title: 'PedidosYa - Comida a Tu Puerta',
      description: 'Disfruta de una amplia variedad de restaurantes y platos. ¡Pide ahora y recibe en minutos!',
      imageUrl: 'https://static.mercadonegro.pe/wp-content/uploads/2021/03/26093457/18-03_restaurantestop_1080x1080.jpg',
      targetUrl: 'https://pedidosya.com',
    },
    {
      title: 'Cashea - Créditos sin Intereses',
      description: 'Obtén créditos rápidos y sin intereses para tus necesidades financieras. ¡Solicita ahora!',
      imageUrl: 'https://ciudadccs.info/gestor/archivos/imagenes/19623/fileblob240707051530.webp',
      targetUrl: 'https://www.cashea.app/',
    },
  ];

  try {
    for (const ad of ads) {
      await prisma.ad.create({
        data: ad,
      });
    }
    console.log('Anuncios insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar anuncios:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAds();