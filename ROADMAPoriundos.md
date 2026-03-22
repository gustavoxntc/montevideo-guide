# 🗺️ Roadmap — Implementación Oriundos en `montevideo-guide`

## Visión general

Landing page con identidad visual propia para **Oriundos · Del interior a Montevideo**.
Colores: Celeste `#71D8EE` · Marrón `#886739` · Amarillo `#FFBE04`

---

## Fase 1 — Setup & estructura base
**Prioridad: Alta · Estimado: 1–2 días**

- [ ] Clonar / abrir repo `montevideo-guide`
- [ ] Elegir stack (recomendado: **SvelteKit** o **Next.js App Router** si ya está definido)
- [ ] Crear carpeta `/src/routes/` (o `/pages/`) con ruta `/` para la landing
- [ ] Definir variables CSS globales en `app.css` o `globals.css`:

```css
:root {
  --celeste:   #71D8EE;
  --marron:    #886739;
  --amarillo:  #FFBE04;
  --dark:      #1a1208;
  --off-white: #f9f6f0;
}
```

- [ ] Instalar fuentes (Google Fonts o self-hosted):
  - `Playfair Display` → títulos y hero
  - `DM Sans` → cuerpo y UI

---

## Fase 2 — Componentes de la landing
**Prioridad: Alta · Estimado: 3–4 días**

Crear un componente por sección (separación de responsabilidades):

| Componente | Archivo sugerido | Descripción |
|---|---|---|
| `Navbar` | `Navbar.svelte` / `Navbar.tsx` | Fixed, transparente → glassmorphism al scroll |
| `Hero` | `Hero.svelte` | Imagen full-screen + título animado |
| `QuienesSomos` | `QuienesSomos.svelte` | Grid 2 col: texto + tarjetas de equipo |
| `Proposito` | `Proposito.svelte` | Fondo oscuro + 3 cards de pilares |
| `Contacto` | `Contacto.svelte` | Formulario sobre fondo celeste |
| `Footer` | `Footer.svelte` | Simple, fondo oscuro |

---

## Fase 3 — Navbar y rutas
**Prioridad: Media · Estimado: 1–2 días**

El menú tiene 5 secciones que serán páginas o rutas propias:

| Enlace | Ruta sugerida |
|---|---|
| Estudiar | `/estudiar` |
| Trabajar | `/trabajar` |
| ¿Qué hacer? | `/que-hacer` |
| Moverme | `/moverme` |
| Descubrir | `/descubrir` |

- [ ] Implementar navegación con scroll suave para anchors en la landing
- [ ] En mobile: menú hamburger con overlay o drawer lateral
- [ ] Highlight del link activo según la sección visible (IntersectionObserver)

---

## Fase 4 — Hero: imagen real
**Prioridad: Alta · Estimado: 0.5 días**

- [ ] Elegir/contratar imagen de Montevideo (Rambla, Ciudad Vieja, etc.)
  - Opción gratuita: Unsplash con búsqueda `Montevideo Uruguay`
  - Opción propia: fotografía original para identidad auténtica
- [ ] Optimizar imagen (WebP, 1600×900px, ~200KB máx)
- [ ] Colocar en `/static/images/hero.webp`
- [ ] Implementar `loading="eager"` y preload en `<head>`:
```html
<link rel="preload" as="image" href="/images/hero.webp" />
```

---

## Fase 5 — Sección "¿Quiénes somos?"
**Prioridad: Media · Estimado: 0.5 días**

- [ ] Agregar fotos reales de Josefina y Gustavo (formato cuadrado, ~400×400)
- [ ] Crear archivo de datos `/src/lib/team.js` con la info del equipo
- [ ] Animaciones de entrada con `IntersectionObserver` (o `motion` si usás Framer)

---

## Fase 6 — Sección Propósito
**Prioridad: Media · Estimado: 0.5 días**

- [ ] Definir los 3 pilares principales (Estudiar, Trabajar, Moverme sugeridos como inicio)
- [ ] Redactar copy de cada card
- [ ] Expandir a 5 si se quieren mostrar todos los links del menú

---

## Fase 7 — Formulario de contacto
**Prioridad: Media · Estimado: 1 día**

- [ ] Elegir backend para el form:
  - **Opción A (fácil):** [Formspree](https://formspree.io) — sin backend propio
  - **Opción B:** API Route en Next.js/SvelteKit con Nodemailer o Resend
  - **Opción C:** Supabase table `contacto` + trigger de email
- [ ] Validación client-side (required, email format)
- [ ] Estado de loading + success/error feedback
- [ ] Selector de departamento ya incluido en el diseño

---

## Fase 8 — SEO & metadata
**Prioridad: Media · Estimado: 0.5 días**

```html
<title>Oriundos – Del interior a Montevideo</title>
<meta name="description" content="Guía para quienes llegan del interior a vivir, estudiar y trabajar en Montevideo." />
<meta property="og:image" content="/images/og-oriundos.jpg" />
```

- [ ] Crear imagen OG (1200×630) con el logo y slogan
- [ ] Definir idioma `<html lang="es">`

---

## Fase 9 — Performance & deploy
**Prioridad: Alta · Estimado: 1 día**

- [ ] Auditoría Lighthouse (objetivo: Performance >90, Accesibilidad >95)
- [ ] Lazy load de imágenes no críticas
- [ ] Deploy en **Vercel** (recomendado para SvelteKit/Next.js)
  - Conectar repo de GitHub
  - Variables de entorno para el form si aplica
- [ ] Dominio: `oriundos.uy` o subdominio de `montevideo-guide`

---

## Resumen de prioridades

```
Fase 1 → Setup                [████████░░] Alta
Fase 2 → Componentes          [████████░░] Alta
Fase 3 → Navbar & rutas       [██████░░░░] Media
Fase 4 → Imagen real          [████████░░] Alta
Fase 5 → Equipo               [████░░░░░░] Media
Fase 6 → Propósito            [████░░░░░░] Media
Fase 7 → Formulario           [██████░░░░] Media
Fase 8 → SEO                  [████░░░░░░] Media
Fase 9 → Deploy               [████████░░] Alta
```

**Tiempo total estimado: 8–12 días de desarrollo** (trabajando a tiempo parcial)

---

## Archivos de referencia

| Recurso | Descripción |
|---|---|
| `oriundos.html` | Vista previa completa (este archivo) |
| `/src/lib/colors.css` | Variables CSS de la paleta |
| `ROADMAP.md` | Este documento |
