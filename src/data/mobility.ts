export interface MobilityApp {
  id: number;
  name: string;
  type: 'taxi' | 'remise' | 'scooter' | 'bike' | 'bus';
  description: string;
  features: string[];
  availability: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  color: string;
}

export interface STMInfo {
  title: string;
  description: string;
  howToGet: string[];
  reloadPoints: string[];
  price: string;
  busPrice: string;
  appInfo: string;
  tips: string[];
}

export const mobilityApps: MobilityApp[] = [
  {
    id: 1,
    name: 'Uber',
    type: 'remise',
    description: 'La app de viajes más usada del mundo está disponible en Montevideo. Ideal para viajes puntuales con precio estimado antes de viajar.',
    features: ['Precio fijo antes de viajar', 'Pago con tarjeta o efectivo', 'Calificación de conductores', 'Historial de viajes', 'Compartir ruta en tiempo real'],
    availability: 'Disponible 24/7 en toda la ciudad',
    color: '#000000',
  },
  {
    id: 2,
    name: 'Cabify',
    type: 'remise',
    description: 'Alternativa a Uber con buena cobertura en Montevideo. Destaca por su servicio de calidad y conductores verificados.',
    features: ['Vehículos de alta gama disponibles', 'Precio cerrado antes de viajar', 'Conductores profesionales', 'Factura electrónica', 'Servicios corporativos'],
    availability: 'Disponible 24/7 en toda la ciudad',
    color: '#7c3aed',
  },
  {
    id: 3,
    name: 'InDriver',
    type: 'remise',
    description: 'App donde podés proponer el precio del viaje y negociar con el conductor. Popular entre quienes buscan tarifas más económicas.',
    features: ['Propone tu propio precio', 'Negociación directa con conductores', 'Sin precio fijo', 'Pago en efectivo', 'Más opciones de conductores'],
    availability: 'Disponible en toda la ciudad',
    color: '#16a34a',
  },
  {
    id: 4,
    name: 'Easy Taxi',
    type: 'taxi',
    description: 'App para pedir taxis oficiales de Montevideo. Conecta con los taxímetros tradicionales pero con la comodidad de una app.',
    features: ['Taxis con taxímetro oficial', 'Factura de taxi', 'Conductores licenciados', 'Pago en efectivo o tarjeta', 'Seguimiento en tiempo real'],
    availability: 'Disponible 24/7',
    color: '#f59e0b',
  },
  {
    id: 5,
    name: 'Scootin',
    type: 'scooter',
    description: 'Servicio de scooters eléctricos para moverse por el centro de Montevideo. Económico y ecológico para trayectos cortos.',
    features: ['Scooters eléctricos', 'Por minuto de uso', 'Sin registro previo en punto', 'App para desbloquear', 'Ideal para el centro'],
    availability: 'Zona centro y barrios cercanos',
    color: '#0ea5e9',
  },
];

export const stmInfo: STMInfo = {
  title: 'Tarjeta STM - Transporte Público',
  description: 'La tarjeta STM (Sistema de Transporte Metropolitano) es la tarjeta inteligente para usar el transporte público de Montevideo. Con ella pagás el boleto de ómnibus con descuento en todas las líneas de la ciudad.',
  howToGet: [
    'Ir a cualquier Punto STM (Terminal de Tres Cruces, Aguada, Reducto)',
    'Presentar cédula de identidad uruguaya o documento de identidad',
    'Completar el formulario de alta',
    'La tarjeta se entrega en el momento (gratuita)',
    'Cargar saldo mínimo para empezar a usarla',
  ],
  reloadPoints: [
    'Terminales de STM (Tres Cruces, Aguada, Reducto)',
    'Abitab (toda la ciudad)',
    'RedPagos (toda la ciudad)',
    'Antel (sucursales)',
    'App STM (con tarjeta de crédito/débito)',
  ],
  price: 'La tarjeta es gratuita',
  busPrice: 'Aprox. $43 pesos uruguayos por viaje (con tarjeta STM)',
  appInfo: 'La app STM está disponible para iOS y Android. Permite ver saldos, consultar recorridos, horarios y planificar viajes. También muestra la ubicación de los ómnibus en tiempo real.',
  tips: [
    'El precio sin tarjeta STM es más caro: aprox. $50 pesos',
    'Podés transferir en hasta 2 ómnibus con el mismo boleto pagando un pequeño adicional',
    'Los estudiantes tienen tarifa especial (verificar requisitos en STM)',
    'Las líneas del 100 al 200 van al centro; del 300 al 400 a zonas más alejadas',
    'Hay 180 líneas de ómnibus cubriendo toda la ciudad',
    'Las paradas tienen QR para ver en tiempo real cuándo llega el próximo bus',
  ],
};
