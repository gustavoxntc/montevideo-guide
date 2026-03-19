export interface BusStop {
  id: string
  name: string
  lat: number
  lng: number
}

export interface BusSchedule {
  frequency: string
  firstBus: string
  lastBus: string
  weekdayTimes: string[]
  saturdayTimes: string[]
  sundayTimes: string[]
}

export interface BusLine {
  id: string
  number: string
  name: string
  color: string
  from: string
  to: string
  route: [number, number][]
  stops: BusStop[]
  schedule: BusSchedule
}

export const busLines: BusLine[] = [
  {
    id: '117',
    number: '117',
    name: 'Tres Cruces – Ciudad Vieja (vía Rambla)',
    color: '#e11d48',
    from: 'Tres Cruces',
    to: 'Ciudad Vieja',
    route: [
      [-34.897, -56.178], // Tres Cruces
      [-34.901, -56.163], // Bulevar España / Pocitos norte
      [-34.916, -56.157], // Rambla Pocitos (baja a la costa)
      [-34.920, -56.167], // Rambla Rep. de Francia
      [-34.921, -56.178], // Rambla Punta Trouville
      [-34.920, -56.190], // Rambla Gandhi
      [-34.917, -56.200], // Rambla 25 de Agosto
      [-34.910, -56.208], // Puerto / Rambla Portuaria
      [-34.906, -56.214], // Ciudad Vieja – Sarandí
    ],
    stops: [
      { id: '117-1', name: 'Terminal Tres Cruces', lat: -34.897, lng: -56.178 },
      { id: '117-2', name: 'Bulevar España – Pocitos', lat: -34.901, lng: -56.163 },
      { id: '117-3', name: 'Rambla Pocitos', lat: -34.916, lng: -56.157 },
      { id: '117-4', name: 'Rambla Rep. de Francia', lat: -34.920, lng: -56.167 },
      { id: '117-5', name: 'Rambla Punta Trouville', lat: -34.921, lng: -56.178 },
      { id: '117-6', name: 'Rambla Gandhi', lat: -34.920, lng: -56.190 },
      { id: '117-7', name: 'Rambla 25 de Agosto', lat: -34.917, lng: -56.200 },
      { id: '117-8', name: 'Puerto – Rambla Portuaria', lat: -34.910, lng: -56.208 },
      { id: '117-9', name: 'Ciudad Vieja – Sarandí', lat: -34.906, lng: -56.214 },
    ],
    schedule: {
      frequency: 'Cada 10–15 min (hora pico), cada 20 min (fuera de pico)',
      firstBus: '05:30',
      lastBus: '23:30',
      weekdayTimes: ['05:30','05:45','06:00','06:15','06:30','06:45','07:00','07:15','07:30','07:45','08:00','08:15','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:15','17:30','17:45','18:00','18:15','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00','23:30'],
      saturdayTimes: ['06:00','06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00'],
      sundayTimes: ['07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30'],
    },
  },
  {
    // Punta Gorda → Av. Italia → Tres Cruces → Goes → 18 de Julio →
    // Plaza Independencia → Av. Agraciada al norte → noroeste → Cerro
    id: '121',
    number: '121',
    name: 'Punta Gorda – Cerro (vía 18 de Julio)',
    color: '#2563eb',
    from: 'Punta Gorda',
    to: 'Cerro',
    route: [
      [-34.895, -56.093], // Punta Gorda
      [-34.897, -56.116], // Buceo – Av. Rivera
      [-34.897, -56.135], // Malvín Norte
      [-34.895, -56.156], // Parque Batlle – Av. Italia
      [-34.897, -56.178], // Tres Cruces
      [-34.899, -56.189], // Barrio Goes
      [-34.906, -56.190], // 18 de Julio – Centro
      [-34.906, -56.196], // Plaza Independencia
      [-34.898, -56.203], // Av. Agraciada norte
      [-34.887, -56.211], // Bella Vista / Bvar. Batlle
      [-34.882, -56.224], // Paso de la Arena / acceso Cerro
      [-34.893, -56.244], // Av. Carlos María Ramírez
      [-34.893, -56.257], // Terminal Cerro
    ],
    stops: [
      { id: '121-1', name: 'Punta Gorda – Av. Brasil', lat: -34.895, lng: -56.093 },
      { id: '121-2', name: 'Buceo – Av. Rivera', lat: -34.897, lng: -56.116 },
      { id: '121-3', name: 'Malvín Norte', lat: -34.897, lng: -56.135 },
      { id: '121-4', name: 'Parque Batlle – Av. Italia', lat: -34.895, lng: -56.156 },
      { id: '121-5', name: 'Terminal Tres Cruces', lat: -34.897, lng: -56.178 },
      { id: '121-6', name: 'Barrio Goes', lat: -34.899, lng: -56.189 },
      { id: '121-7', name: '18 de Julio – Centro', lat: -34.906, lng: -56.190 },
      { id: '121-8', name: 'Plaza Independencia', lat: -34.906, lng: -56.196 },
      { id: '121-9', name: 'Av. Agraciada – Cuareim', lat: -34.898, lng: -56.203 },
      { id: '121-10', name: 'Bella Vista – Bvar. Batlle', lat: -34.887, lng: -56.211 },
      { id: '121-11', name: 'Av. Carlos María Ramírez', lat: -34.893, lng: -56.244 },
      { id: '121-12', name: 'Terminal Cerro', lat: -34.893, lng: -56.257 },
    ],
    schedule: {
      frequency: 'Cada 12–18 min (días hábiles), cada 25 min (fines de semana)',
      firstBus: '05:15',
      lastBus: '23:00',
      weekdayTimes: ['05:15','05:30','05:50','06:10','06:30','06:50','07:10','07:30','07:50','08:10','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00'],
      saturdayTimes: ['06:00','06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
      sundayTimes: ['07:00','07:30','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00'],
    },
  },
  {
    // Paso Molino (noroeste) → Bvar. Batlle y Ordóñez → Tres Cruces → Av. Italia → Malvín (este)
    id: '103',
    number: '103',
    name: 'Paso Molino – Malvín',
    color: '#16a34a',
    from: 'Paso Molino',
    to: 'Malvín',
    route: [
      [-34.875, -56.213], // Paso Molino terminal
      [-34.879, -56.200], // Barrio Prado
      [-34.882, -56.190], // Reducto – Bvar. Batlle y Ordóñez
      [-34.888, -56.183], // Estadio Centenario
      [-34.892, -56.173], // Parque Batlle Norte
      [-34.897, -56.178], // Tres Cruces
      [-34.895, -56.165], // Parque Batlle Sur – Av. Italia
      [-34.897, -56.149], // Av. Italia – Comercio
      [-34.901, -56.128], // Buceo – Rambla
      [-34.901, -56.113], // Terminal Malvín
    ],
    stops: [
      { id: '103-1', name: 'Terminal Paso Molino', lat: -34.875, lng: -56.213 },
      { id: '103-2', name: 'Barrio Prado', lat: -34.879, lng: -56.200 },
      { id: '103-3', name: 'Reducto – Bvar. Batlle y Ordóñez', lat: -34.882, lng: -56.190 },
      { id: '103-4', name: 'Estadio Centenario', lat: -34.888, lng: -56.183 },
      { id: '103-5', name: 'Parque Batlle Norte', lat: -34.892, lng: -56.173 },
      { id: '103-6', name: 'Terminal Tres Cruces', lat: -34.897, lng: -56.178 },
      { id: '103-7', name: 'Av. Italia – Parque Batlle Sur', lat: -34.895, lng: -56.165 },
      { id: '103-8', name: 'Av. Italia – Comercio', lat: -34.897, lng: -56.149 },
      { id: '103-9', name: 'Buceo – Rambla', lat: -34.901, lng: -56.128 },
      { id: '103-10', name: 'Terminal Malvín', lat: -34.901, lng: -56.113 },
    ],
    schedule: {
      frequency: 'Cada 15–20 min',
      firstBus: '05:45',
      lastBus: '22:45',
      weekdayTimes: ['05:45','06:05','06:25','06:45','07:05','07:25','07:45','08:05','08:25','08:45','09:15','09:45','10:15','10:45','11:15','11:45','12:15','12:45','13:15','13:45','14:15','14:45','15:15','15:45','16:15','16:45','17:15','17:45','18:15','18:45','19:15','19:45','20:15','20:45','21:15','21:45','22:15','22:45'],
      saturdayTimes: ['06:15','06:45','07:15','07:45','08:15','08:45','09:15','09:45','10:15','10:45','11:15','11:45','12:15','12:45','13:15','13:45','14:15','14:45','15:15','15:45','16:15','16:45','17:15','17:45','18:15','18:45','19:15','19:45','20:15','20:45','21:15','21:45','22:15'],
      sundayTimes: ['07:00','07:45','08:30','09:15','10:00','10:45','11:30','12:15','13:00','13:45','14:30','15:15','16:00','16:45','17:30','18:15','19:00','19:45','20:30','21:15','22:00'],
    },
  },
  {
    // Cerro (noroeste) → Av. C.M. Ramírez → Av. Agraciada → Centro →
    // 18 de Julio → Av. Italia → Buceo → Punta Gorda (este)
    id: 'G',
    number: 'G',
    name: 'Cerro – Punta Gorda',
    color: '#7c3aed',
    from: 'Cerro',
    to: 'Punta Gorda',
    route: [
      [-34.893, -56.257], // Cerro terminal
      [-34.893, -56.244], // Av. Carlos María Ramírez
      [-34.882, -56.224], // Paso de la Arena
      [-34.887, -56.211], // Bella Vista
      [-34.898, -56.203], // Av. Agraciada
      [-34.906, -56.196], // Plaza Independencia
      [-34.906, -56.190], // 18 de Julio – Centro
      [-34.899, -56.189], // Barrio Goes
      [-34.897, -56.178], // Tres Cruces
      [-34.895, -56.156], // Parque Batlle – Av. Italia
      [-34.897, -56.135], // Malvín Norte
      [-34.897, -56.116], // Buceo – Av. Rivera
      [-34.895, -56.093], // Punta Gorda
    ],
    stops: [
      { id: 'G-1', name: 'Terminal Cerro', lat: -34.893, lng: -56.257 },
      { id: 'G-2', name: 'Av. Carlos María Ramírez', lat: -34.893, lng: -56.244 },
      { id: 'G-3', name: 'Bella Vista', lat: -34.887, lng: -56.211 },
      { id: 'G-4', name: 'Av. Agraciada – Cuareim', lat: -34.898, lng: -56.203 },
      { id: 'G-5', name: 'Plaza Independencia', lat: -34.906, lng: -56.196 },
      { id: 'G-6', name: '18 de Julio – Florida', lat: -34.906, lng: -56.190 },
      { id: 'G-7', name: 'Barrio Goes', lat: -34.899, lng: -56.189 },
      { id: 'G-8', name: 'Terminal Tres Cruces', lat: -34.897, lng: -56.178 },
      { id: 'G-9', name: 'Parque Batlle – Av. Italia', lat: -34.895, lng: -56.156 },
      { id: 'G-10', name: 'Buceo – 26 de Marzo', lat: -34.897, lng: -56.116 },
      { id: 'G-11', name: 'Punta Gorda – Av. Brasil', lat: -34.895, lng: -56.093 },
    ],
    schedule: {
      frequency: 'Cada 15–25 min',
      firstBus: '05:30',
      lastBus: '23:15',
      weekdayTimes: ['05:30','05:55','06:20','06:45','07:10','07:35','08:00','08:25','08:50','09:20','09:50','10:20','10:50','11:20','11:50','12:20','12:50','13:20','13:50','14:20','14:50','15:20','15:50','16:20','16:50','17:20','17:50','18:20','18:50','19:20','19:50','20:20','20:50','21:20','21:50','22:20','22:50','23:15'],
      saturdayTimes: ['06:00','06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00'],
      sundayTimes: ['07:00','07:45','08:30','09:15','10:00','10:45','11:30','12:15','13:00','13:45','14:30','15:15','16:00','16:45','17:30','18:15','19:00','19:45','20:30','21:15','22:00','22:45'],
    },
  },
  {
    // Villa del Cerro (extremo noroeste) → Cerro → Av. C.M. Ramírez →
    // Puerto/Aduana → Plaza Independencia → 18 de Julio
    id: '180',
    number: '180',
    name: 'Villa del Cerro – Centro',
    color: '#f59e0b',
    from: 'Villa del Cerro',
    to: 'Centro',
    route: [
      [-34.906, -56.278], // Villa del Cerro terminal
      [-34.906, -56.264], // Cerro norte
      [-34.893, -56.257], // Cerro – Av. Carlos María Ramírez inicio
      [-34.900, -56.240], // Av. Carlos María Ramírez central
      [-34.905, -56.225], // Aguada oeste
      [-34.906, -56.214], // Ciudad Vieja – Reconquista
      [-34.906, -56.204], // Aduana / Puerto
      [-34.906, -56.196], // Plaza Independencia
      [-34.905, -56.189], // 18 de Julio – Ejido
      [-34.905, -56.183], // 18 de Julio – Uruguay
    ],
    stops: [
      { id: '180-1', name: 'Terminal Villa del Cerro', lat: -34.906, lng: -56.278 },
      { id: '180-2', name: 'Cerro – Av. Carlos María Ramírez', lat: -34.893, lng: -56.257 },
      { id: '180-3', name: 'Av. Carlos María Ramírez central', lat: -34.900, lng: -56.240 },
      { id: '180-4', name: 'Aguada – Goes', lat: -34.905, lng: -56.225 },
      { id: '180-5', name: 'Ciudad Vieja – Reconquista', lat: -34.906, lng: -56.214 },
      { id: '180-6', name: 'Puerto / Aduana', lat: -34.906, lng: -56.204 },
      { id: '180-7', name: 'Plaza Independencia', lat: -34.906, lng: -56.196 },
      { id: '180-8', name: '18 de Julio – Ejido', lat: -34.905, lng: -56.189 },
      { id: '180-9', name: '18 de Julio – Uruguay', lat: -34.905, lng: -56.183 },
    ],
    schedule: {
      frequency: 'Cada 20–30 min',
      firstBus: '06:00',
      lastBus: '22:30',
      weekdayTimes: ['06:00','06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30'],
      saturdayTimes: ['06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00'],
      sundayTimes: ['07:30','08:30','09:30','10:30','11:30','12:30','13:30','14:30','15:30','16:30','17:30','18:30','19:30','20:30','21:30'],
    },
  },
  {
    // Paso Molino (noroeste) → Av. Agraciada hacia el sur → Plaza Independencia → Ciudad Vieja
    id: '183',
    number: '183',
    name: 'Paso Molino – Ciudad Vieja (vía Agraciada)',
    color: '#0891b2',
    from: 'Paso Molino',
    to: 'Ciudad Vieja',
    route: [
      [-34.875, -56.213], // Terminal Paso Molino
      [-34.879, -56.211], // Prado – Av. Millán
      [-34.884, -56.210], // Reducto Sur
      [-34.890, -56.207], // Bella Vista Norte
      [-34.896, -56.205], // Av. Agraciada – Paraguay
      [-34.900, -56.203], // Av. Agraciada – Colonia
      [-34.906, -56.196], // Plaza Independencia
      [-34.905, -56.208], // Ciudad Vieja – Buenos Aires
      [-34.906, -56.214], // Ciudad Vieja – Sarandí
    ],
    stops: [
      { id: '183-1', name: 'Terminal Paso Molino', lat: -34.875, lng: -56.213 },
      { id: '183-2', name: 'Prado – Av. Millán', lat: -34.879, lng: -56.211 },
      { id: '183-3', name: 'Reducto Sur', lat: -34.884, lng: -56.210 },
      { id: '183-4', name: 'Bella Vista Norte', lat: -34.890, lng: -56.207 },
      { id: '183-5', name: 'Av. Agraciada – Paraguay', lat: -34.896, lng: -56.205 },
      { id: '183-6', name: 'Av. Agraciada – Colonia', lat: -34.900, lng: -56.203 },
      { id: '183-7', name: 'Plaza Independencia', lat: -34.906, lng: -56.196 },
      { id: '183-8', name: 'Ciudad Vieja – Buenos Aires', lat: -34.905, lng: -56.208 },
      { id: '183-9', name: 'Ciudad Vieja – Sarandí', lat: -34.906, lng: -56.214 },
    ],
    schedule: {
      frequency: 'Cada 12–15 min (hora pico), cada 20 min (fuera de pico)',
      firstBus: '05:40',
      lastBus: '23:00',
      weekdayTimes: ['05:40','06:00','06:20','06:40','07:00','07:15','07:30','07:45','08:00','08:20','08:40','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:15','17:30','17:45','18:00','18:20','18:40','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00'],
      saturdayTimes: ['06:00','06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30'],
      sundayTimes: ['07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30'],
    },
  },
  {
    // Goes (oeste del centro) → 18 de Julio → Tres Cruces → Bulevar España → Pocitos (sureste)
    id: '405',
    number: '405',
    name: 'Goes – Pocitos',
    color: '#ec4899',
    from: 'Goes',
    to: 'Pocitos',
    route: [
      [-34.899, -56.195], // Goes – Propios
      [-34.904, -56.192], // 18 de Julio – Cuareim
      [-34.906, -56.190], // 18 de Julio – Florida
      [-34.901, -56.183], // Jackson / norte Tres Cruces
      [-34.897, -56.178], // Tres Cruces
      [-34.903, -56.170], // Bulevar España
      [-34.910, -56.163], // Pocitos norte
      [-34.916, -56.157], // Rambla Pocitos
    ],
    stops: [
      { id: '405-1', name: 'Goes – Propios', lat: -34.899, lng: -56.195 },
      { id: '405-2', name: '18 de Julio – Cuareim', lat: -34.904, lng: -56.192 },
      { id: '405-3', name: '18 de Julio – Florida', lat: -34.906, lng: -56.190 },
      { id: '405-4', name: 'Jackson – Tres Cruces Norte', lat: -34.901, lng: -56.183 },
      { id: '405-5', name: 'Terminal Tres Cruces', lat: -34.897, lng: -56.178 },
      { id: '405-6', name: 'Bulevar España', lat: -34.903, lng: -56.170 },
      { id: '405-7', name: 'Pocitos – 26 de Marzo', lat: -34.910, lng: -56.163 },
      { id: '405-8', name: 'Rambla Pocitos', lat: -34.916, lng: -56.157 },
    ],
    schedule: {
      frequency: 'Cada 15–20 min',
      firstBus: '06:00',
      lastBus: '22:45',
      weekdayTimes: ['06:00','06:20','06:40','07:00','07:20','07:40','08:00','08:20','08:40','09:00','09:20','09:45','10:15','10:45','11:15','11:45','12:15','12:45','13:15','13:45','14:15','14:45','15:15','15:45','16:15','16:45','17:15','17:35','17:55','18:15','18:35','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:45'],
      saturdayTimes: ['06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00'],
      sundayTimes: ['07:30','08:15','09:00','09:45','10:30','11:15','12:00','12:45','13:30','14:15','15:00','15:45','16:30','17:15','18:00','18:45','19:30','20:15','21:00','21:45'],
    },
  },
  {
    // Carrasco (este) → Av. Italia → Malvín → Buceo → Parque Batlle → Tres Cruces → Centro
    id: '104',
    number: '104',
    name: 'Carrasco – Centro (vía Av. Italia)',
    color: '#ea580c',
    from: 'Carrasco',
    to: 'Centro',
    route: [
      [-34.888, -56.060], // Carrasco terminal
      [-34.891, -56.079], // Cantegril – Av. Italia
      [-34.895, -56.098], // Punta Gorda – Av. Italia
      [-34.899, -56.118], // Buceo – Av. Italia
      [-34.897, -56.135], // Unión – Av. Italia
      [-34.895, -56.156], // Parque Batlle – Av. Italia
      [-34.897, -56.178], // Tres Cruces
      [-34.906, -56.190], // 18 de Julio – Centro
      [-34.906, -56.196], // Plaza Independencia
    ],
    stops: [
      { id: '104-1', name: 'Terminal Carrasco', lat: -34.888, lng: -56.060 },
      { id: '104-2', name: 'Cantegril – Av. Italia', lat: -34.891, lng: -56.079 },
      { id: '104-3', name: 'Punta Gorda – Av. Italia', lat: -34.895, lng: -56.098 },
      { id: '104-4', name: 'Buceo – Av. Italia', lat: -34.899, lng: -56.118 },
      { id: '104-5', name: 'Unión – Av. Italia', lat: -34.897, lng: -56.135 },
      { id: '104-6', name: 'Parque Batlle – Av. Italia', lat: -34.895, lng: -56.156 },
      { id: '104-7', name: 'Terminal Tres Cruces', lat: -34.897, lng: -56.178 },
      { id: '104-8', name: '18 de Julio – Centro', lat: -34.906, lng: -56.190 },
      { id: '104-9', name: 'Plaza Independencia', lat: -34.906, lng: -56.196 },
    ],
    schedule: {
      frequency: 'Cada 10–15 min (hora pico), cada 20 min (fuera de pico)',
      firstBus: '05:20',
      lastBus: '23:15',
      weekdayTimes: ['05:20','05:40','06:00','06:20','06:40','07:00','07:15','07:30','07:45','08:00','08:15','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:15','17:30','17:45','18:00','18:20','18:40','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00','23:15'],
      saturdayTimes: ['06:00','06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00'],
      sundayTimes: ['07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30'],
    },
  },
  {
    // Carrasco (este) → Rambla costera → Pocitos → Puerto → Ciudad Vieja
    id: '174',
    number: '174',
    name: 'Carrasco – Ciudad Vieja (vía Rambla)',
    color: '#0d9488',
    from: 'Carrasco',
    to: 'Ciudad Vieja',
    route: [
      [-34.888, -56.060], // Carrasco terminal
      [-34.904, -56.078], // Rambla Carrasco
      [-34.909, -56.095], // Rambla Punta Gorda
      [-34.916, -56.118], // Rambla Buceo
      [-34.916, -56.139], // Rambla Pocitos este
      [-34.916, -56.157], // Rambla Pocitos
      [-34.921, -56.178], // Rambla Punta Trouville
      [-34.920, -56.190], // Rambla Gandhi
      [-34.917, -56.200], // Rambla 25 de Agosto
      [-34.910, -56.208], // Puerto – Rambla Portuaria
      [-34.906, -56.214], // Ciudad Vieja – Sarandí
    ],
    stops: [
      { id: '174-1', name: 'Terminal Carrasco', lat: -34.888, lng: -56.060 },
      { id: '174-2', name: 'Rambla Carrasco', lat: -34.904, lng: -56.078 },
      { id: '174-3', name: 'Rambla Punta Gorda', lat: -34.909, lng: -56.095 },
      { id: '174-4', name: 'Rambla Buceo', lat: -34.916, lng: -56.118 },
      { id: '174-5', name: 'Rambla Pocitos', lat: -34.916, lng: -56.157 },
      { id: '174-6', name: 'Rambla Punta Trouville', lat: -34.921, lng: -56.178 },
      { id: '174-7', name: 'Rambla Gandhi', lat: -34.920, lng: -56.190 },
      { id: '174-8', name: 'Rambla 25 de Agosto', lat: -34.917, lng: -56.200 },
      { id: '174-9', name: 'Puerto – Rambla Portuaria', lat: -34.910, lng: -56.208 },
      { id: '174-10', name: 'Ciudad Vieja – Sarandí', lat: -34.906, lng: -56.214 },
    ],
    schedule: {
      frequency: 'Cada 15–20 min',
      firstBus: '05:30',
      lastBus: '23:00',
      weekdayTimes: ['05:30','05:50','06:10','06:30','06:50','07:10','07:30','07:50','08:10','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00'],
      saturdayTimes: ['06:00','06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30'],
      sundayTimes: ['07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30'],
    },
  },
  {
    // Colón (noroeste lejano) → Av. Millán → Paso Molino → Prado → Centro
    id: '186',
    number: '186',
    name: 'Colón – Centro (vía Millán)',
    color: '#4f46e5',
    from: 'Colón',
    to: 'Centro',
    route: [
      [-34.867, -56.232], // Colón terminal
      [-34.870, -56.225], // Colón – Av. Millán
      [-34.873, -56.218], // Millán – Grecia
      [-34.875, -56.213], // Paso Molino
      [-34.879, -56.206], // Prado – Millán central
      [-34.882, -56.198], // Reducto
      [-34.888, -56.196], // Goes norte
      [-34.897, -56.192], // Ejido – Goes
      [-34.906, -56.190], // 18 de Julio – Centro
    ],
    stops: [
      { id: '186-1', name: 'Terminal Colón', lat: -34.867, lng: -56.232 },
      { id: '186-2', name: 'Colón – Av. Millán', lat: -34.870, lng: -56.225 },
      { id: '186-3', name: 'Millán – Grecia', lat: -34.873, lng: -56.218 },
      { id: '186-4', name: 'Paso Molino', lat: -34.875, lng: -56.213 },
      { id: '186-5', name: 'Prado – Millán', lat: -34.879, lng: -56.206 },
      { id: '186-6', name: 'Reducto – Bulevar Batlle', lat: -34.882, lng: -56.198 },
      { id: '186-7', name: 'Goes Norte', lat: -34.888, lng: -56.196 },
      { id: '186-8', name: 'Ejido – Goes', lat: -34.897, lng: -56.192 },
      { id: '186-9', name: '18 de Julio – Centro', lat: -34.906, lng: -56.190 },
    ],
    schedule: {
      frequency: 'Cada 20–25 min',
      firstBus: '05:50',
      lastBus: '22:30',
      weekdayTimes: ['05:50','06:15','06:40','07:05','07:30','07:55','08:20','08:45','09:10','09:40','10:10','10:40','11:10','11:40','12:10','12:40','13:10','13:40','14:10','14:40','15:10','15:40','16:10','16:40','17:10','17:35','18:00','18:25','18:50','19:15','19:45','20:15','20:45','21:15','21:45','22:15','22:30'],
      saturdayTimes: ['06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00'],
      sundayTimes: ['08:00','08:45','09:30','10:15','11:00','11:45','12:30','13:15','14:00','14:45','15:30','16:15','17:00','17:45','18:30','19:15','20:00','20:45','21:30'],
    },
  },
  {
    // Malvín Norte → Buceo → Parque Batlle → Tres Cruces → Goes → Centro → Ciudad Vieja
    id: '146',
    number: '146',
    name: 'Malvín Norte – Ciudad Vieja',
    color: '#65a30d',
    from: 'Malvín Norte',
    to: 'Ciudad Vieja',
    route: [
      [-34.893, -56.120], // Malvín Norte terminal
      [-34.897, -56.135], // Malvín – Av. Italia
      [-34.897, -56.148], // Buceo – Av. Italia
      [-34.895, -56.156], // Parque Batlle – Av. Italia
      [-34.897, -56.178], // Tres Cruces
      [-34.899, -56.189], // Goes
      [-34.906, -56.190], // 18 de Julio
      [-34.906, -56.196], // Plaza Independencia
      [-34.905, -56.208], // Ciudad Vieja – Buenos Aires
      [-34.906, -56.214], // Ciudad Vieja – Sarandí
    ],
    stops: [
      { id: '146-1', name: 'Terminal Malvín Norte', lat: -34.893, lng: -56.120 },
      { id: '146-2', name: 'Malvín – Av. Italia', lat: -34.897, lng: -56.135 },
      { id: '146-3', name: 'Buceo – Av. Italia', lat: -34.897, lng: -56.148 },
      { id: '146-4', name: 'Parque Batlle – Av. Italia', lat: -34.895, lng: -56.156 },
      { id: '146-5', name: 'Terminal Tres Cruces', lat: -34.897, lng: -56.178 },
      { id: '146-6', name: 'Barrio Goes', lat: -34.899, lng: -56.189 },
      { id: '146-7', name: '18 de Julio – Centro', lat: -34.906, lng: -56.190 },
      { id: '146-8', name: 'Plaza Independencia', lat: -34.906, lng: -56.196 },
      { id: '146-9', name: 'Ciudad Vieja – Buenos Aires', lat: -34.905, lng: -56.208 },
      { id: '146-10', name: 'Ciudad Vieja – Sarandí', lat: -34.906, lng: -56.214 },
    ],
    schedule: {
      frequency: 'Cada 15–20 min',
      firstBus: '06:00',
      lastBus: '22:30',
      weekdayTimes: ['06:00','06:20','06:40','07:00','07:20','07:40','08:00','08:20','08:40','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:20','17:40','18:00','18:20','18:40','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30'],
      saturdayTimes: ['06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00'],
      sundayTimes: ['07:30','08:15','09:00','09:45','10:30','11:15','12:00','12:45','13:30','14:15','15:00','15:45','16:30','17:15','18:00','18:45','19:30','20:15','21:00','21:45'],
    },
  },
  {
    // Servicio Diferencial: Centro → Av. Italia (expreso) → Malvín → Punta Gorda → Carrasco
    id: 'D5',
    number: 'D5',
    name: 'Centro – Carrasco (Diferencial)',
    color: '#db2777',
    from: 'Centro',
    to: 'Carrasco',
    route: [
      [-34.906, -56.196], // Plaza Independencia (origen)
      [-34.906, -56.190], // 18 de Julio
      [-34.897, -56.178], // Tres Cruces
      [-34.895, -56.156], // Parque Batlle – Av. Italia
      [-34.897, -56.135], // Unión – Av. Italia
      [-34.897, -56.116], // Buceo – Av. Italia
      [-34.895, -56.095], // Punta Gorda – Av. Italia
      [-34.888, -56.060], // Carrasco terminal
    ],
    stops: [
      { id: 'D5-1', name: 'Plaza Independencia', lat: -34.906, lng: -56.196 },
      { id: 'D5-2', name: 'Terminal Tres Cruces', lat: -34.897, lng: -56.178 },
      { id: 'D5-3', name: 'Parque Batlle – Av. Italia', lat: -34.895, lng: -56.156 },
      { id: 'D5-4', name: 'Unión – Av. Italia', lat: -34.897, lng: -56.135 },
      { id: 'D5-5', name: 'Buceo – Av. Italia', lat: -34.897, lng: -56.116 },
      { id: 'D5-6', name: 'Punta Gorda – Av. Italia', lat: -34.895, lng: -56.095 },
      { id: 'D5-7', name: 'Terminal Carrasco', lat: -34.888, lng: -56.060 },
    ],
    schedule: {
      frequency: 'Cada 10–12 min (hora pico), cada 15 min (fuera de pico)',
      firstBus: '06:00',
      lastBus: '23:30',
      weekdayTimes: ['06:00','06:12','06:24','06:36','06:48','07:00','07:10','07:20','07:30','07:40','07:50','08:00','08:10','08:20','08:35','08:50','09:10','09:30','09:50','10:10','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:10','17:20','17:30','17:40','17:50','18:00','18:15','18:30','18:45','19:00','19:20','19:40','20:00','20:30','21:00','21:30','22:00','22:30','23:00','23:30'],
      saturdayTimes: ['06:30','07:00','07:15','07:30','07:45','08:00','08:15','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00','23:30'],
      sundayTimes: ['07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00'],
    },
  },
  {
    // Punta Carretas (sur) → Pocitos → Bulevar España → Tres Cruces → 18 de Julio → Centro
    id: '125',
    number: '125',
    name: 'Punta Carretas – Centro',
    color: '#6b7280',
    from: 'Punta Carretas',
    to: 'Centro',
    route: [
      [-34.921, -56.157], // Punta Carretas terminal
      [-34.916, -56.157], // Rambla Pocitos
      [-34.910, -56.163], // Pocitos norte
      [-34.903, -56.170], // Bulevar España
      [-34.897, -56.178], // Tres Cruces
      [-34.906, -56.185], // 18 de Julio – Yaguarón
      [-34.906, -56.190], // 18 de Julio – Florida
      [-34.906, -56.196], // Plaza Independencia
    ],
    stops: [
      { id: '125-1', name: 'Terminal Punta Carretas', lat: -34.921, lng: -56.157 },
      { id: '125-2', name: 'Rambla Pocitos', lat: -34.916, lng: -56.157 },
      { id: '125-3', name: 'Pocitos – 26 de Marzo', lat: -34.910, lng: -56.163 },
      { id: '125-4', name: 'Bulevar España', lat: -34.903, lng: -56.170 },
      { id: '125-5', name: 'Terminal Tres Cruces', lat: -34.897, lng: -56.178 },
      { id: '125-6', name: '18 de Julio – Yaguarón', lat: -34.906, lng: -56.185 },
      { id: '125-7', name: '18 de Julio – Florida', lat: -34.906, lng: -56.190 },
      { id: '125-8', name: 'Plaza Independencia', lat: -34.906, lng: -56.196 },
    ],
    schedule: {
      frequency: 'Cada 12–18 min',
      firstBus: '05:50',
      lastBus: '23:00',
      weekdayTimes: ['05:50','06:08','06:26','06:44','07:02','07:20','07:38','07:56','08:14','08:32','08:50','09:15','09:45','10:15','10:45','11:15','11:45','12:15','12:45','13:15','13:45','14:15','14:45','15:15','15:45','16:15','16:45','17:15','17:33','17:51','18:09','18:27','18:50','19:20','19:50','20:20','20:50','21:20','21:50','22:20','22:50','23:00'],
      saturdayTimes: ['06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30'],
      sundayTimes: ['07:30','08:15','09:00','09:45','10:30','11:15','12:00','12:45','13:30','14:15','15:00','15:45','16:30','17:15','18:00','18:45','19:30','20:15','21:00','21:45','22:30'],
    },
  },
  {
    // La Teja (oeste) → Paso Molino Sur → Reducto → Goes → Av. Agraciada → Centro
    id: '190',
    number: '190',
    name: 'La Teja – Centro',
    color: '#9333ea',
    from: 'La Teja',
    to: 'Centro',
    route: [
      [-34.890, -56.228], // La Teja terminal
      [-34.887, -56.220], // La Teja – Ferreira Aldunate
      [-34.882, -56.215], // Paso Molino Sur
      [-34.879, -56.210], // Prado
      [-34.882, -56.198], // Reducto
      [-34.888, -56.196], // Goes Norte
      [-34.900, -56.203], // Av. Agraciada – Colonia
      [-34.906, -56.196], // Plaza Independencia
      [-34.906, -56.190], // 18 de Julio – Centro
    ],
    stops: [
      { id: '190-1', name: 'Terminal La Teja', lat: -34.890, lng: -56.228 },
      { id: '190-2', name: 'La Teja – Ferreira Aldunate', lat: -34.887, lng: -56.220 },
      { id: '190-3', name: 'Paso Molino Sur', lat: -34.882, lng: -56.215 },
      { id: '190-4', name: 'Prado', lat: -34.879, lng: -56.210 },
      { id: '190-5', name: 'Reducto – Bulevar Batlle', lat: -34.882, lng: -56.198 },
      { id: '190-6', name: 'Goes Norte', lat: -34.888, lng: -56.196 },
      { id: '190-7', name: 'Av. Agraciada – Colonia', lat: -34.900, lng: -56.203 },
      { id: '190-8', name: 'Plaza Independencia', lat: -34.906, lng: -56.196 },
      { id: '190-9', name: '18 de Julio – Centro', lat: -34.906, lng: -56.190 },
    ],
    schedule: {
      frequency: 'Cada 20–30 min',
      firstBus: '06:10',
      lastBus: '22:00',
      weekdayTimes: ['06:10','06:40','07:10','07:40','08:10','08:40','09:10','09:40','10:10','10:40','11:10','11:40','12:10','12:40','13:10','13:40','14:10','14:40','15:10','15:40','16:10','16:40','17:10','17:40','18:10','18:40','19:10','19:40','20:10','20:40','21:10','21:40','22:00'],
      saturdayTimes: ['07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30'],
      sundayTimes: ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'],
    },
  },
  {
    // Tres Cruces → Goes → Av. Agraciada → Bella Vista → Av. C.M. Ramírez → Cerro
    id: '107',
    number: '107',
    name: 'Tres Cruces – Cerro (vía Propios)',
    color: '#b45309',
    from: 'Tres Cruces',
    to: 'Cerro',
    route: [
      [-34.897, -56.178], // Tres Cruces
      [-34.897, -56.190], // Goes – Propios
      [-34.898, -56.203], // Av. Agraciada – Cuareim
      [-34.890, -56.207], // Bella Vista Norte
      [-34.884, -56.210], // Reducto norte / Paso de la Arena
      [-34.882, -56.220], // Acceso Cerro por tierra
      [-34.887, -56.233], // Cerro Sur
      [-34.893, -56.244], // Av. Carlos María Ramírez
      [-34.893, -56.257], // Terminal Cerro
    ],
    stops: [
      { id: '107-1', name: 'Terminal Tres Cruces', lat: -34.897, lng: -56.178 },
      { id: '107-2', name: 'Goes – Propios', lat: -34.897, lng: -56.190 },
      { id: '107-3', name: 'Av. Agraciada – Cuareim', lat: -34.898, lng: -56.203 },
      { id: '107-4', name: 'Bella Vista Norte', lat: -34.890, lng: -56.207 },
      { id: '107-5', name: 'Reducto Norte', lat: -34.884, lng: -56.210 },
      { id: '107-6', name: 'Acceso Cerro', lat: -34.882, lng: -56.220 },
      { id: '107-7', name: 'Cerro Sur', lat: -34.887, lng: -56.233 },
      { id: '107-8', name: 'Av. Carlos María Ramírez', lat: -34.893, lng: -56.244 },
      { id: '107-9', name: 'Terminal Cerro', lat: -34.893, lng: -56.257 },
    ],
    schedule: {
      frequency: 'Cada 20–25 min',
      firstBus: '06:00',
      lastBus: '22:00',
      weekdayTimes: ['06:00','06:25','06:50','07:15','07:40','08:05','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:25','17:50','18:15','18:40','19:05','19:30','20:00','20:30','21:00','21:30','22:00'],
      saturdayTimes: ['06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30'],
      sundayTimes: ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'],
    },
  },
]
