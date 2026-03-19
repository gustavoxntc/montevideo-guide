export interface WorkZone {
  id: number;
  name: string;
  shortName: string;
  lat: number;
  lng: number;
  description: string;
  fullDescription: string;
  address: string;
  website: string;
  sectors: string[];
  tips: string;
}

export const workZones: WorkZone[] = [
  {
    id: 1,
    name: 'Zonamerica',
    shortName: 'Zonamerica',
    lat: -34.7870,
    lng: -56.0733,
    description: 'Zona franca con más de 500 empresas multinacionales. Hub tecnológico y de servicios.',
    fullDescription: 'Zonamerica es el parque de negocios más importante de Uruguay, ubicado en zona franca. Alberga más de 500 empresas de tecnología, servicios financieros, logística y farmacéutica. Empresas como Tata Consultancy, Cognizant, Sabre y muchas otras tienen operaciones aquí. Es el lugar ideal para buscar trabajo en tecnología y servicios.',
    address: 'Ruta 8, km 17.500, Montevideo',
    website: 'https://www.zonamerica.com',
    sectors: ['Tecnología', 'Servicios Financieros', 'Logística', 'Farmacéutica', 'Consultoría', 'Call Centers'],
    tips: 'Llegar en bus desde el centro (líneas 391, 392). Muchas empresas publican vacantes en LinkedIn y en el portal de Zonamerica.',
  },
  {
    id: 2,
    name: 'World Trade Center Montevideo',
    shortName: 'WTC',
    lat: -34.9053,
    lng: -56.1363,
    description: 'Centro de negocios premium con oficinas corporativas y empresas internacionales.',
    fullDescription: 'El World Trade Center de Montevideo es un complejo de torres de oficinas de primer nivel, ubicado en el corredor empresarial de Luis Alberto de Herrera. Alberga multinacionales, estudios jurídicos, consultoras y empresas de servicios de alto valor agregado. La zona tiene excelente conectividad y servicios.',
    address: 'Luis Alberto de Herrera 1248, Montevideo',
    website: 'https://www.wtcmontevideo.com.uy',
    sectors: ['Finanzas', 'Derecho Corporativo', 'Consultoría', 'Tecnología', 'Seguros', 'Comercio Internacional'],
    tips: 'Zona de fácil acceso en transporte público. Muchas empresas aquí tienen programas de pasantías para estudiantes universitarios.',
  },
  {
    id: 3,
    name: 'Centro de Montevideo',
    shortName: 'Centro',
    lat: -34.9058,
    lng: -56.1925,
    description: 'El corazón comercial de Montevideo con bancos, comercios y oficinas gubernamentales.',
    fullDescription: 'El Centro de Montevideo es el corazón administrativo y comercial de la ciudad. Aquí se encuentran los principales bancos (BROU, Santander, Itaú, BBVA), organismos del Estado, comercios minoristas, restaurantes y servicios. Es la zona con mayor concentración de empleo público y comercial del país.',
    address: 'Av. 18 de Julio, Montevideo',
    website: 'https://montevideo.gub.uy',
    sectors: ['Comercio', 'Banca', 'Administración Pública', 'Gastronomía', 'Educación', 'Salud'],
    tips: 'La zona más accesible en transporte público. Ideal para buscar trabajo en comercio y administración pública. Revisar el portal de empleos del Estado: empleate.gub.uy',
  },
  {
    id: 4,
    name: 'LATU - Parque Tecnológico',
    shortName: 'LATU',
    lat: -34.8789,
    lng: -56.0769,
    description: 'Laboratorio Tecnológico del Uruguay - incubadora de empresas y startups.',
    fullDescription: 'El LATU es el Laboratorio Tecnológico del Uruguay, un organismo público que promueve la innovación y el desarrollo tecnológico. Su Parque Tecnológico alberga empresas emergentes, startups y emprendimientos tecnológicos. También ofrece servicios de laboratorio, certificación y capacitación.',
    address: 'Av. Italia 6201, Montevideo',
    website: 'https://www.latu.org.uy',
    sectors: ['Tecnología', 'Innovación', 'Startups', 'Biotecnología', 'I+D', 'Emprendimiento'],
    tips: 'Excelente lugar para conectar con el ecosistema emprendedor de Uruguay. Ofrece programas de incubación y aceleración para emprendedores.',
  },
  {
    id: 5,
    name: 'Aguada Park',
    shortName: 'Aguada Park',
    lat: -34.8912,
    lng: -56.1948,
    description: 'Parque empresarial con empresas de tecnología y servicios.',
    fullDescription: 'Aguada Park es un moderno parque empresarial ubicado en el barrio Aguada, muy cerca del centro de Montevideo. Alberga empresas de tecnología, consultoras y servicios profesionales. Cuenta con espacios de coworking y es parte del ecosistema tecnológico de la ciudad.',
    address: 'Paraguay 2141, Montevideo',
    website: 'https://www.aguadapark.com',
    sectors: ['Tecnología', 'Servicios Profesionales', 'Consultoría', 'Coworking', 'Marketing Digital'],
    tips: 'Zona bien conectada con el centro. Muchas empresas jóvenes buscan talento en LinkedIn y en Buscojobs.',
  },
  {
    id: 6,
    name: 'Tres Cruces - Zona Comercial',
    shortName: 'Tres Cruces',
    lat: -34.8938,
    lng: -56.1663,
    description: 'Zona comercial y de servicios cerca del terminal de ómnibus.',
    fullDescription: 'La zona de Tres Cruces, alrededor del Terminal de Ómnibus, es un importante nodo comercial y de servicios. El Shopping Tres Cruces es uno de los más concurridos de Montevideo y genera cientos de empleos en retail, gastronomía y servicios. Es también un punto de conexión de transporte clave.',
    address: 'Bulevar General Artigas 1825, Montevideo',
    website: 'https://www.trescruces.com.uy',
    sectors: ['Retail', 'Gastronomía', 'Servicios', 'Transporte', 'Turismo', 'Hotelería'],
    tips: 'El shopping Tres Cruces publica empleos en su web oficial. Zona ideal para primer empleo en gastronomía y retail.',
  },
  {
    id: 7,
    name: 'Buceo / Pocitos - Zona Empresarial',
    shortName: 'Pocitos',
    lat: -34.9080,
    lng: -56.1520,
    description: 'Barrio empresarial con muchas agencias de recursos humanos y oficinas.',
    fullDescription: 'Los barrios Pocitos y Buceo conforman una de las zonas residenciales y empresariales más dinámicas de Montevideo. Aquí se concentran numerosas agencias de recursos humanos (Manpower, Adecco, Kelly Services), empresas de tecnología, agencias de publicidad y estudios profesionales. También tiene excelente oferta gastronómica y de servicios.',
    address: 'Av. Brasil / Bulevar España, Montevideo',
    website: '',
    sectors: ['Recursos Humanos', 'Publicidad', 'Tecnología', 'Inmobiliaria', 'Gastronomía', 'Educación'],
    tips: 'Visitar las agencias de RRHH (Manpower, Adecco) que tienen oficinas en la zona. Excelente punto de partida para buscar trabajo calificado.',
  },
];
