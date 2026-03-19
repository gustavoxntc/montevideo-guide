export interface TouristPlace {
  id: number;
  name: string;
  description: string;
  fullDescription: string;
  category: 'historia' | 'naturaleza' | 'gastronomia' | 'cultura' | 'deporte';
  tips: string;
  hours?: string;
  price?: string;
}

export const touristPlaces: TouristPlace[] = [
  {
    id: 1,
    name: 'Ciudad Vieja',
    description: 'El casco histórico de Montevideo, con arquitectura colonial, museos y el famoso Mercado del Puerto.',
    fullDescription: 'La Ciudad Vieja es el barrio más antiguo de Montevideo, fundado en 1724. Recorrerla es hacer un viaje en el tiempo: sus calles empedradas, edificios coloniales, museos y galerías de arte conviven con bares, restaurantes y el bullicio del puerto. Imperdible la Plaza Independencia con el Palacio Salvo y el Mausoleo de Artigas.',
    category: 'historia',
    tips: 'Ideal recorrerla a pie. Los domingos hay menos tráfico y más ambiente bohemio. No te pierdas el Museo del Carnaval y la calle Peatonal Sarandi.',
    hours: 'Todo el día (museos horario variable)',
    price: 'Gratis (museos con entrada)',
  },
  {
    id: 2,
    name: 'Rambla de Montevideo',
    description: '22km de costa frente al Río de la Plata, perfecta para pasear, correr y disfrutar los atardeceres.',
    fullDescription: 'La Rambla de Montevideo es una de las más largas del mundo: 22 kilómetros que recorren la costa desde la Ciudad Vieja hasta Carrasco. Es el lugar de encuentro de los montevideanos para correr, andar en bicicleta, tomar mate frente al río, o simplemente disfrutar del atardecer sobre el Río de la Plata. Un símbolo de la ciudad.',
    category: 'naturaleza',
    tips: 'Los atardeceres desde la Rambla son espectaculares. En verano hay mucha actividad. Podés recorrerla en bicicleta alquilando en estaciones STM Bici.',
    hours: 'Todo el día',
    price: 'Gratis',
  },
  {
    id: 3,
    name: 'Mercado del Puerto',
    description: 'Mercado tradicional famoso por sus parrillas y el ambiente bohemio los fines de semana.',
    fullDescription: 'El Mercado del Puerto es un emblema gastronómico y cultural de Montevideo. Construido en 1868, su estructura de hierro alberga las mejores parrillas del país. Los fines de semana se transforma en un espectáculo: músicos callejeros, turistas, locales y el aroma inconfundible del asado uruguayo. Probá el chivito y el medio y medio.',
    category: 'gastronomia',
    tips: 'El ambiente es especialmente bueno los sábados al mediodía. Llegá temprano para conseguir mesa. Los precios son más altos que en otros lugares.',
    hours: 'Lun-Sáb: 12:00-16:00',
    price: 'Entrada gratis, comida de precio variable',
  },
  {
    id: 4,
    name: 'Palacio Salvo',
    description: 'Ícono arquitectónico de Montevideo, una de las construcciones más reconocidas del país.',
    fullDescription: 'El Palacio Salvo, inaugurado en 1928, fue durante años el edificio más alto de América del Sur. Diseñado por el arquitecto italiano Mario Palanti, es el símbolo arquitectónico más reconocible de Montevideo. Ubicado en la Plaza Independencia, es hoy un edificio de apartamentos y oficinas. Se pueden hacer visitas guiadas para conocer su interior y las vistas desde la cúpula.',
    category: 'historia',
    tips: 'Las visitas guiadas se hacen los fines de semana. Desde la cúpula la vista de Montevideo es increíble. Las fotos desde la Plaza Independencia son icónicas.',
    hours: 'Visitas guiadas: sábados y domingos',
    price: 'Visita guiada: aprox. $300 pesos',
  },
  {
    id: 5,
    name: 'Estadio Centenario y Museo del Fútbol',
    description: 'Estadio histórico donde se jugó la primera Copa del Mundo en 1930, hoy Museo del Fútbol.',
    fullDescription: 'El Estadio Centenario fue construido para la primera Copa del Mundo de 1930, que Uruguay ganó de local. Es Patrimonio de la Humanidad por la UNESCO y alberga el Museo del Fútbol, donde se puede ver la historia del deporte más popular del país. La Torre de los Homenajes es uno de los símbolos de la ciudad.',
    category: 'deporte',
    tips: 'El museo es muy completo e interesante incluso para quienes no son fanáticos del fútbol. Los partidos de la selección uruguaya son una experiencia única.',
    hours: 'Museo: Mar-Dom 10:00-17:00',
    price: 'Museo: $150 pesos',
  },
  {
    id: 6,
    name: 'Parque Rodó',
    description: 'El parque más querido de Montevideo con lago artificial, Jardín Botánico y el Parque de Atracciones.',
    fullDescription: 'El Parque Rodó es el parque urbano más emblemático de Montevideo. Tiene un lago artificial donde se puede remar, el histórico Parque de Atracciones, jardines, canchas de básquetbol y un ambiente familiar y relajado. Es el punto de reunión de familias, estudiantes y jóvenes los fines de semana soleados.',
    category: 'naturaleza',
    tips: 'Ideal para ir en familia o con amigos. Los fines de semana hay actividades culturales y deportivas. Cerca del parque hay muchos bares y restaurantes.',
    hours: 'Todo el día',
    price: 'Gratis (juegos del parque con costo)',
  },
  {
    id: 7,
    name: 'Feria Tristán Narvaja',
    description: 'La feria más tradicional de Montevideo, cada domingo en el Barrio Sur.',
    fullDescription: 'La Feria de Tristán Narvaja es una institución cultural de Montevideo que se realiza todos los domingos sobre la calle homónima y sus alrededores. Se vende de todo: libros usados, antigüedades, plantas, comida, artesanías, discos de vinilo y mucho más. Es un paseo imperdible que refleja el alma bohemia y cultural de la ciudad.',
    category: 'cultura',
    tips: 'Llegar antes del mediodía para ver más vendedores. Llevar efectivo porque la mayoría no acepta tarjeta. Ideal para encontrar libros y antigüedades a buen precio.',
    hours: 'Domingos: 8:00-15:00',
    price: 'Gratis (compras a precio variable)',
  },
  {
    id: 8,
    name: 'Intendencia de Montevideo',
    description: 'Edificio histórico en la Plaza Independencia, símbolo del gobierno departamental.',
    fullDescription: 'El Palacio Municipal de la Intendencia de Montevideo se ubica sobre la Plaza Independencia, el corazón simbólico de la ciudad. Construido en estilo neoclásico, es sede del gobierno departamental. La plaza que lo rodea alberga el Mausoleo de José Artigas, el prócer nacional, y es el punto de partida de la Avenida 18 de Julio, la arteria principal de Montevideo.',
    category: 'historia',
    tips: 'La Plaza Independencia es el punto de referencia de Montevideo. Imperdible el cambio de guardia en el mausoleo de Artigas. En el subsuelo está el mausoleo visitable.',
    hours: 'Plaza: Todo el día. Intendencia: Lun-Vie 9:00-17:00',
    price: 'Gratis',
  },
];
