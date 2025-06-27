# Posts Management App

Una aplicación de gestión de posts construida con Next.js 15 y HeroUI v2, que permite crear, editar, eliminar y visualizar posts con un sistema de notificaciones integrado.

## 🚀 Características Principales

- **Gestión completa de posts**: Crear, editar, eliminar y visualizar posts
- **Editor de texto enriquecido**: Utilizando TipTap para formateo avanzado de contenido
- **Sistema de notificaciones**: Notificaciones toast y drawer para feedback del usuario
- **Interfaz moderna**: Diseño responsivo con HeroUI y Tailwind CSS
- **Gestión de estado**: Redux Toolkit para manejo centralizado del estado
- **API Integration**: Integración con JSONPlaceholder para operaciones CRUD
- **Soporte de temas**: Tema claro/oscuro con next-themes
- **TypeScript**: Completamente tipado para mejor desarrollo

## 🛠️ Tecnologías Utilizadas

### Frontend Core
- [Next.js 15](https://nextjs.org/docs/getting-started) - Framework de React con App Router
- [HeroUI v2](https://heroui.com/) - Biblioteca de componentes UI moderna
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS utilitario
- [Framer Motion](https://www.framer.com/motion/) - Animaciones

### Estado y Datos
- [Redux Toolkit](https://redux-toolkit.js.org/) - Gestión de estado
- [React Redux](https://react-redux.js.org/) - Integración de Redux con React
- [Axios](https://axios-http.com/) - Cliente HTTP para API calls

### Editor de Texto
- [TipTap](https://tiptap.dev/) - Editor de texto enriquecido
- [React Hook Form](https://react-hook-form.com/) - Manejo de formularios

### UI y UX
- [React Quill](https://github.com/zenoamaro/react-quill) - Editor de texto adicional
- [next-themes](https://github.com/pacocoursey/next-themes) - Gestión de temas

## 📂 Estructura del Proyecto

```
├── app/                      # App Router de Next.js
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página home
│   └── providers.tsx        # Providers de la app
├── components/              # Componentes React
│   ├── HomePage.tsx         # Componente principal de la página
│   ├── TablePost.tsx        # Tabla de posts
│   ├── ModalAddPost.tsx     # Modal para crear/editar posts
│   ├── ModalViewPost.tsx    # Modal para visualizar posts
│   ├── DrawerNotification.tsx # Drawer de notificaciones
│   ├── RichTextEditor.tsx   # Editor de texto enriquecido
│   ├── ToolBarRichText.tsx  # Barra de herramientas del editor
│   └── icons.tsx            # Iconos personalizados
├── lib/                     # Lógica de negocio y utilidades
│   ├── hooks/               # Custom hooks
│   │   ├── store.ts         # Hook del store Redux
│   │   ├── useNotifications.ts # Hook para notificaciones
│   │   └── useProductAction.ts # Hook para acciones de posts
│   ├── service/             # Servicios de API
│   │   ├── axios.ts         # Configuración de Axios
│   │   ├── conf.ts          # Configuración de API
│   │   └── post.ts          # Servicios de posts
│   └── store/               # Redux store
│       ├── index.ts         # Configuración del store
│       ├── notifications/   # Slice de notificaciones
│       └── posts/           # Slice de posts
├── types/                   # Definiciones de TypeScript
│   └── index.ts             # Tipos de la aplicación
├── config/                  # Configuraciones
│   └── fonts.ts             # Configuración de fuentes
└── styles/                  # Estilos globales
    └── globals.css          # CSS global
```

## 🔧 Funcionalidades Detalladas

### 1. Gestión de Posts
- **Crear Posts**: Modal con formulario y editor de texto enriquecido
- **Editar Posts**: Posibilidad de modificar título y contenido
- **Eliminar Posts**: Eliminación con confirmación
- **Visualizar Posts**: Modal de lectura con contenido formateado

### 2. Editor de Texto Enriquecido
- Formateo de texto (negrita, cursiva, subrayado, tachado)
- Listas ordenadas y desordenadas
- Interfaz intuitiva con barra de herramientas
- Soporte para contenido HTML

### 3. Sistema de Notificaciones
- Notificaciones toast para acciones inmediatas
- Drawer de notificaciones para historial
- Diferentes tipos de notificaciones (success, warning, error, etc.)
- Gestión de estado con Redux

### 4. Tabla de Posts
- Visualización paginada de posts
- Acciones inline (editar, eliminar, ver)
- Diseño responsivo
- Integración con HeroUI Table component

## 🚀 Instalación y Uso

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd technical_test
```

### 2. Instalar dependencias

Puedes usar cualquiera de estos gestores de paquetes:

```bash
# Con npm
npm install

# Con yarn
yarn install

# Con pnpm
pnpm install

# Con bun
bun install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# API URL (opcional, por defecto usa JSONPlaceholder)
API_URL=https://jsonplaceholder.typicode.com
```

### 4. Ejecutar en modo desarrollo

```bash
# Con npm
npm run dev

# Con yarn
yarn dev

# Con pnpm
pnpm dev

# Con bun
bun dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### 5. Construir para producción

```bash
# Construir la aplicación
npm run build

# Ejecutar en producción
npm run start
```

## 🏗️ Arquitectura de la Aplicación

### Estado Global (Redux)
La aplicación utiliza Redux Toolkit para gestionar el estado global:

- **Posts Slice**: Maneja el estado de los posts (crear, editar, eliminar)
- **Notifications Slice**: Gestiona las notificaciones del usuario

### Servicios de API
Todos los servicios de API están centralizados en `lib/service/`:

- **GetPostRequest**: Obtiene todos los posts
- **GetPostByIdRequest**: Obtiene un post específico
- **AddPostRequest**: Crea un nuevo post
- **UpdatePostRequest**: Actualiza un post existente
- **DeletePostRequest**: Elimina un post

### Hooks Personalizados
- **usePostActions**: Hook para acciones de posts (crear, editar, eliminar)
- **useNotifications**: Hook para gestionar notificaciones
- **store**: Hook para acceder al store de Redux

## 🎨 Componentes Principales

### HomePage
Componente principal que orquesta toda la funcionalidad:
- Gestiona modals y drawers
- Carga inicial de posts
- Coordinación entre componentes

### TablePost
Tabla responsiva que muestra los posts:
- Paginación integrada
- Acciones por fila (ver, editar, eliminar)
- Diseño responsivo

### ModalAddPost
Modal para crear y editar posts:
- Formulario con validación
- Editor de texto enriquecido
- Gestión de estado local y global

### RichTextEditor
Editor de texto basado en TipTap:
- Barra de herramientas personalizable
- Formateo de texto avanzado
- Output en HTML

### DrawerNotification
Panel lateral para notificaciones:
- Lista de notificaciones
- Diferentes tipos de notificación
- Gestión de estado con Redux

## 🛡️ Tipos TypeScript

La aplicación está completamente tipada con las siguientes interfaces principales:

```typescript
interface Post {
  title: string;
  body: string;
  userId: number;
}

interface PostWithId extends Post {
  id: PostId;
}

interface Notification {
  type: "success" | "default" | "primary" | "secondary" | "warning" | "danger";
  message: string;
}
```

## 📱 Características de UI/UX

- **Diseño Responsivo**: Funciona en dispositivos móviles y desktop
- **Animaciones**: Transiciones suaves con Framer Motion
- **Accesibilidad**: Componentes accesibles con HeroUI
- **Feedback Visual**: Notificaciones y estados de carga

## 🧪 Scripts Disponibles

```bash
# Desarrollo con Turbopack
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm run start

# Linter con corrección automática
npm run lint
```

## 🔗 API Integration

La aplicación se integra con [JSONPlaceholder](https://jsonplaceholder.typicode.com/), una API REST falsa para testing y prototyping:

- **Base URL**: `https://jsonplaceholder.typicode.com`
- **Endpoints utilizados**:
  - `GET /posts` - Obtener todos los posts
  - `GET /posts/:id` - Obtener un post específico
  - `POST /posts` - Crear un nuevo post
  - `PUT /posts/:id` - Actualizar un post
  - `DELETE /posts/:id` - Eliminar un post

## 🚦 Estado de Desarrollo

### Características Implementadas ✅
- [x] Gestión completa de posts (CRUD)
- [x] Editor de texto enriquecido
- [x] Sistema de notificaciones
- [x] Interfaz responsiva
- [x] Gestión de estado con Redux
- [x] Integración con API
- [x] TypeScript completo

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

## 🙏 Reconocimientos

- [HeroUI](https://heroui.com/) - Por los componentes UI
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Por la API de testing
- [TipTap](https://tiptap.dev/) - Por el editor de texto enriquecido
- [Redux Toolkit](https://redux-toolkit.js.org/) - Por la gestión de estado
