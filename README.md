![](/docs/assets/transparent-logo+type-brand@512.png)

Fitnologym es una aplicación web de seguimiento de fitness construida con Next.js y MongoDB. La aplicación ayuda a los usuarios a rastrear sus actividades físicas, establecer metas y monitorear su progreso.

![](/docs/assets/fitnologym-loop.gif)

## Tabla de Contenidos

- [Características](#caracter%C3%ADsticas)
- [Demo](#demo)
- [Comenzando](#comenzando)
  - [Prerequisitos](#prerequisitos)
  - [Instalación](#instalaci%C3%B3n)
  - [Ejecutando el Proyecto](#ejecutando-el-proyecto)
- [Configuración](#configuraci%C3%B3n)

## Características

- Autenticación y autorización de usuarios
- Seguimiento de entrenamientos y ejercicios diarios
- Establecer y gestionar metas de fitness
- Ver informes y estadísticas de progreso

## Demo

Una demostración en vivo del proyecto está disponible [aquí](https://app.fitnologym.com.ar/).

## Comenzando

### Prerequisitos

Para ejecutar este proyecto localmente, necesitas tener instalado lo siguiente:

- Node.js (v18 o superior)
- npm
- MongoDB

### Instalación

1. Clona el repositorio:

   ```bash
   git clone <https://github.com/Kumo-Digital/fitnologym-app.git>
   cd fitnologym
   ```

2. Instala las dependencias:

```bash
npm install
```

### **Ejecutando el Proyecto**

1. Crea un archivo **`.env.local`** en el directorio raíz y agrega las variables de entorno necesarias (ver [Configuración](#configuraci%C3%B3n)).
2. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

3. Abre tu navegador y navega a **`http://localhost:3000`**.

## **Configuración**

Crea un archivo **`.env.local`** en el directorio raíz de tu proyecto y agrega las siguientes variables de entorno:

```env
NODE_ENV=development
MONGODB_URI=[MONGODB_URI]
DB_NAME=[DB_NAME]
API_URL=[API_URL]
NEXT_PUBLIC_API_URL=[NEXT_PUBLIC_API_URL]
NEXT_PUBLIC_MOCK_API_URL=[NEXT_PUBLIC_MOCK_API_URL]
ADMIN_TOKEN=[ADMIN_TOKEN]
NEXT_PUBLIC_ADMIN_TOKEN=[NEXT_PUBLIC_ADMIN_TOKEN]

```

Rellena los valores de estas variables según la configuración de tu entorno local.

© 2024 Fitnology 💚 Todos los derechos reservados. | [Política de privacidad](https://app.fitnologym.com.ar/politica-de-privacidad) | [Términos y Condiciones](https://app.fitnologym.com.ar/terminos-y-condiciones) | [Contactanos](https://app.fitnologym.com.ar/contacto) | Desarrollo por Kumo Digital 🌧
