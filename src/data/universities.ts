export interface University {
  id: number;
  name: string;
  shortName: string;
  lat: number;
  lng: number;
  description: string;
  fullDescription: string;
  address: string;
  website: string;
  careers: string[];
  contact: string;
  type: 'public' | 'private';
}

export const universities: University[] = [
  {
    id: 1,
    name: 'Universidad de la República - Sede Central',
    shortName: 'UdelaR Central',
    lat: -34.9024,
    lng: -56.1767,
    description: 'La principal universidad pública del Uruguay, gratuita y de calidad. Ofrece carreras en todas las áreas del conocimiento.',
    fullDescription: 'La Universidad de la República (UdelaR) es la institución de educación superior pública más importante de Uruguay. Fundada en 1849, es autónoma y cogobernada por docentes, estudiantes y egresados. Ofrece educación gratuita de calidad y es la principal opción para quienes vienen del interior del país a estudiar.',
    address: 'Av. 18 de Julio 1824, Montevideo',
    website: 'https://www.universidad.edu.uy',
    careers: ['Derecho', 'Ciencias Económicas', 'Humanidades', 'Ciencias Sociales', 'Bellas Artes', 'Arquitectura'],
    contact: '(+598) 2408 4301',
    type: 'public',
  },
  {
    id: 2,
    name: 'Facultad de Ingeniería - UdelaR',
    shortName: 'FING UdelaR',
    lat: -34.9076,
    lng: -56.1598,
    description: 'Ingeniería eléctrica, mecánica, civil, computación y más.',
    fullDescription: 'La Facultad de Ingeniería de la UdelaR es una de las más importantes de la región. Forma ingenieros en diversas especialidades con alta demanda en el mercado laboral uruguayo e internacional. Cuenta con laboratorios modernos y convenios con empresas tecnológicas.',
    address: 'Julio Herrera y Reissig 565, Montevideo',
    website: 'https://www.fing.edu.uy',
    careers: ['Ingeniería Eléctrica', 'Ingeniería Mecánica', 'Ingeniería Civil', 'Ingeniería en Computación', 'Ingeniería Química', 'Ingeniería de Producción'],
    contact: '(+598) 2711 0524',
    type: 'public',
  },
  {
    id: 3,
    name: 'Facultad de Medicina - UdelaR',
    shortName: 'Medicina UdelaR',
    lat: -34.8983,
    lng: -56.1833,
    description: 'Medicina, Nutrición, Enfermería, Tecnología Médica.',
    fullDescription: 'La Facultad de Medicina de la UdelaR forma profesionales de la salud desde 1875. Es la principal escuela de medicina pública del país, con hospitales universitarios como el Hospital de Clínicas. Tiene un modelo de formación integral con énfasis en la salud pública.',
    address: 'Av. General Flores 2125, Montevideo',
    website: 'https://www.medicina.edu.uy',
    careers: ['Medicina', 'Nutrición', 'Enfermería', 'Tecnología Médica', 'Partera', 'Psicomotricidad'],
    contact: '(+598) 2924 9990',
    type: 'public',
  },
  {
    id: 4,
    name: 'Universidad ORT Uruguay',
    shortName: 'ORT Uruguay',
    lat: -34.9039,
    lng: -56.1906,
    description: 'Universidad privada líder en tecnología, diseño y negocios.',
    fullDescription: 'La Universidad ORT Uruguay es una institución privada de reconocido prestigio, especialmente en las áreas de tecnología, diseño y negocios. Pertenece a la red ORT World Union y tiene excelentes vínculos con el sector empresarial uruguayo e internacional. Sus graduados tienen alta empleabilidad.',
    address: 'Cuareim 1451, Montevideo',
    website: 'https://www.ort.edu.uy',
    careers: ['Ingeniería en Sistemas', 'Diseño de Comunicación Visual', 'Administración de Empresas', 'Arquitectura', 'Contador Público', 'Marketing'],
    contact: '(+598) 2902 1505',
    type: 'private',
  },
  {
    id: 5,
    name: 'Universidad Católica del Uruguay',
    shortName: 'UCU',
    lat: -34.8886,
    lng: -56.1593,
    description: 'Ciencias empresariales, derecho, psicología, comunicación.',
    fullDescription: 'La Universidad Católica del Uruguay "Dámaso Antonio Larrañaga" es una institución privada con valores humanistas y católicos. Ofrece formación de calidad con énfasis en valores éticos y compromiso social. Tiene convenios internacionales con universidades de Europa y América.',
    address: 'Av. 8 de Octubre 2738, Montevideo',
    website: 'https://www.ucu.edu.uy',
    careers: ['Derecho', 'Psicología', 'Comunicación', 'Ciencias Empresariales', 'Educación', 'Teología'],
    contact: '(+598) 2487 2717',
    type: 'private',
  },
  {
    id: 6,
    name: 'Universidad de Montevideo',
    shortName: 'UM',
    lat: -34.8900,
    lng: -56.0593,
    description: 'Humanidades, ingenierías, medicina, empresas.',
    fullDescription: 'La Universidad de Montevideo es una institución privada de carácter laico con enfoque en la excelencia académica. Ofrece una amplia gama de carreras y postgrados. Tiene campus en Montevideo y convenios con universidades internacionales de alto prestigio.',
    address: 'Prudencio de Pena 2440, Montevideo',
    website: 'https://www.um.edu.uy',
    careers: ['Medicina', 'Derecho', 'Ingeniería', 'Educación', 'Humanidades', 'Administración de Empresas'],
    contact: '(+598) 2707 1806',
    type: 'private',
  },
  {
    id: 7,
    name: 'Instituto de Profesores Artigas (IPA)',
    shortName: 'IPA',
    lat: -34.8939,
    lng: -56.1885,
    description: 'Formación docente para enseñanza secundaria.',
    fullDescription: 'El IPA es la institución pública de referencia para la formación de profesores de enseñanza secundaria en Uruguay. Depende del Consejo de Formación en Educación (CFE) y ofrece una sólida formación pedagógica y disciplinar. Los estudios son gratuitos y de alta calidad.',
    address: 'Av. Libertador Brig. Gral. Lavalleja 2025, Montevideo',
    website: 'https://www.ipa.edu.uy',
    careers: ['Profesorado de Matemática', 'Profesorado de Historia', 'Profesorado de Literatura', 'Profesorado de Biología', 'Profesorado de Física', 'Profesorado de Química', 'Profesorado de Inglés'],
    contact: '(+598) 2400 4348',
    type: 'public',
  },
  {
    id: 8,
    name: 'UTU - Sede Central',
    shortName: 'UTU',
    lat: -34.9116,
    lng: -56.1787,
    description: 'Universidad del Trabajo del Uruguay - formación técnica y tecnológica.',
    fullDescription: 'La Universidad del Trabajo del Uruguay (UTU) es la institución pública de educación técnica y tecnológica del país. Ofrece cursos técnicos, bachilleratos tecnológicos y carreras de nivel terciario. Es gratuita y tiene sedes en todo el país. Ideal para quien busca formación práctica y salida laboral rápida.',
    address: 'San Salvador 1674, Montevideo',
    website: 'https://www.utu.edu.uy',
    careers: ['Técnico en Informática', 'Técnico en Electrónica', 'Técnico en Administración', 'Gastronomía', 'Diseño de Indumentaria', 'Mecánica Automotriz', 'Electricidad'],
    contact: '(+598) 2400 7140',
    type: 'public',
  },
];
