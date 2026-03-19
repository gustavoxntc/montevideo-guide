# Guía de Desarrollo — Montevideo Guide

## Coordenadas GPS en Montevideo: reglas críticas

### Geografía de Montevideo
- El **Río de la Plata** está al **SUR** de la ciudad (lat más negativa ~-34.92 a -34.95)
- La **Bahía de Montevideo** está al **NORTE/NOROESTE** del centro, donde está el puerto
- El barrio **Cerro** está al **NOROESTE** de Ciudad Vieja, cruzando la bahía por tierra
- **Nunca trazar rutas en línea recta** entre dos puntos si hay agua en medio

### Coordenadas de referencia por zona
| Zona | Lat | Lng |
|------|-----|-----|
| Ciudad Vieja (centro) | -34.906 | -56.214 |
| Centro / 18 de Julio | -34.906 | -56.190 |
| Plaza Independencia | -34.906 | -56.196 |
| Puerto / Aduana | -34.905 | -56.208 |
| Tres Cruces terminal | -34.897 | -56.178 |
| Parque Batlle | -34.893 | -56.168 |
| Paso Molino terminal | -34.875 | -56.213 |
| Barrio Goes | -34.899 | -56.189 |
| Pocitos (Rambla) | -34.918 | -56.157 |
| Buceo | -34.901 | -56.128 |
| Malvín | -34.901 | -56.113 |
| Punta Gorda | -34.895 | -56.093 |
| Carrasco | -34.888 | -56.060 |
| Reducto | -34.882 | -56.190 |
| Estadio Centenario | -34.888 | -56.183 |
| **Cerro** (barrio) | **-34.893** | **-56.257** |
| **Villa del Cerro** | **-34.906** | **-56.278** |

### Rutas de ómnibus: coordenadas de paradas
- Cada punto del recorrido **debe ser una parada real** en una esquina de calle
- Las coordenadas deben seguir el trazado de calles reales, **nunca línea recta**
- Para ir de Centro a **Cerro**: la ruta va hacia el norte/noroeste por Av. Agraciada o Av. Carlos María Ramírez (NO al sur)
- Para ir de Centro a **Malvín/Carrasco**: la ruta va hacia el este por Av. Italia o la Rambla
- La **Rambla** (costa sur) corre de este a oeste a lat ~-34.916 a -34.921

### Fuente de datos reales STM
Si en el futuro se necesita integrar datos reales:
- Portal de datos abiertos: https://ckan.montevideo.gub.uy
- Dataset paradas: `v_uptu_paradas` (Shapefile, WGS84 UTM21S)
- Dataset recorridos: `v_uptu_lsv` (Shapefile)
- Horarios por parada: https://ckan.montevideo.gub.uy/dataset/horarios-de-omnibus-urbanos-por-parada-stm
