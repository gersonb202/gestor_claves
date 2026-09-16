# Gestor de Claves — Cliente

Interfaz web para el gestor de claves personales, construida con **Next.js 16**, **React 19**, **TypeScript** y **Tailwind CSS**.

---

## Requisitos previos

| Herramienta | Versión mínima |
|-------------|----------------|
| [Node.js](https://nodejs.org/) | 20 LTS |
| [Bun](https://bun.sh/) | 1.3.6 |

> [!NOTE]
> El proyecto usa **Bun** como gestor de paquetes. Asegúrate de tenerlo instalado antes de continuar.
>
> ```bash
> curl -fsSL https://bun.sh/install | bash
> ```

---

## Instalación

```bash
# 1. Clona el repositorio
git clone <url-del-repositorio>
cd manejo_claves/client

# 2. Instala las dependencias
bun install
```

---

## Uso

### Modo desarrollo

```bash
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Compilar para producción

```bash
bun run build
```

### Iniciar en producción

```bash
bun start
```

### Lint

```bash
bun run lint
```

---

## Estructura del proyecto

```
client/
├── app/               # Rutas y layout de Next.js (App Router)
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/            # Componentes de interfaz
├── lib/               # Utilidades y helpers
├── public/            # Archivos estáticos
├── next.config.ts
└── package.json
```

---

## Stack tecnológico

- **Next.js 16** — Framework de React con App Router
- **React 19** — Librería de UI
- **TypeScript 5** — Tipado estático
- **Tailwind CSS 4** — Estilos utilitarios
- **shadcn/ui** — Componentes accesibles
- **Lucide React** — Iconos
