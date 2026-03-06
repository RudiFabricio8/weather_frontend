# 🎨 Frontend - Aplicación Cliente WeatherSOA

Aplicación web desarrollada con Next.js y React que proporciona una interfaz de usuario moderna para consultar información meteorológica en tiempo real.

---

## 📋 Descripción

El Frontend es responsable de:
- Proporcionar una interfaz de usuario intuitiva y moderna
- Manejar estados de la aplicación (Loading, Success, Error)
- Realizar peticiones asíncronas al Gateway
- Mostrar datos meteorológicos de forma elegante
- Proporcionar feedback visual al usuario

---

## 🛠️ Tecnologías

- **Next.js 15.2.0** - Framework React con SSR
- **React 19.0.0** - Librería de UI declarativa
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 3.4** - Framework CSS utility-first
- **PostCSS** - Procesador CSS
- **ESLint** - Linter de código

---

## 📁 Estructura

```
frontend/
├── src/
│   └── app/
│       ├── page.tsx          # Página principal
│       ├── layout.tsx        # Layout global
│       ├── globals.css       # Estilos globales
│       └── favicon.ico       # Icono de la app
├── public/                   # Archivos estáticos
├── .next/                    # Build de Next.js (generado)
├── node_modules/             # Dependencias (generado)
├── Dockerfile
├── .dockerignore
├── .gitignore
├── next.config.ts
├── next-env.d.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── eslint.config.mjs
├── package.json
└── README.md
```

---

## 🚀 Ejecución

### Con Docker (desde la raíz)
```bash
cd ..
docker-compose up frontend
```

### Localmente (desarrollo)
```bash
# Instalar dependencias
npm install

# Modo desarrollo con hot-reload
npm run dev

# Compilar para producción
npm run build

# Ejecutar versión de producción
npm start
```

**Acceder a la aplicación:**
- **Desarrollo**: http://localhost:5000
- **Producción**: http://localhost:5000

---

## 🎨 Características de UI/UX

### 1. Estado: Inicial
Muestra un mensaje de espera antes de que el usuario realice una búsqueda.

### 2. Estado: Loading
Spinner animado mientras se consulta la API.

### 3. Estado: Success
Visualización elegante de datos meteorológicos con:
- Nombre de la ciudad
- Temperatura redondeada en grande
- Descripción del clima
- Humedad y velocidad del viento

### 4. Estado: Error
Mensaje amigable con emoji y descripción del error.

---

## 🔐 Variables de Entorno

Las variables de entorno necesarias se proporcionarán según las indicaciones del docente.

---

## 📝 Scripts Disponibles

```json
{
  "dev": "next dev -p 5000",       // Modo desarrollo
  "build": "next build",           // Compilar para producción
  "start": "next start -p 5000",   // Ejecutar en producción
  "lint": "next lint"              // Ejecutar linter
}
```

---

## 🎯 Componente Principal: `page.tsx`

### Estados Manejados

```typescript
const [city, setCity] = useState("");                              // Ciudad a buscar
const [loading, setLoading] = useState(false);                     // Estado de carga
const [error, setError] = useState<string | null>(null);           // Mensaje de error
const [weather, setWeather] = useState<WeatherData | null>(null);  // Datos del clima
```

### Interfaz de Datos

```typescript
interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
  _tempRounded: number;
}
```

---

## 🧪 Pruebas de Usuario

### Flujo de Uso

1. Usuario abre http://localhost:5000
2. Ve el estado inicial con mensaje de espera
3. Escribe una ciudad en el input (ej: "Monterrey")
4. Hace clic en "Buscar"
5. Ve el spinner de carga durante ~1-2 segundos
6. Ve los datos del clima renderizados elegantemente

### Casos de Error

| Caso | Acción | Resultado Esperado |
|------|--------|-------------------|
| Ciudad vacía | Click en "Buscar" sin texto | No hace petición (validación) |
| Ciudad no existe | Buscar "asdfghjkl" | Mensaje de error 404 |
| Gateway caído | Buscar cualquier ciudad | Mensaje de error de conexión |
| Sin internet | Buscar cualquier ciudad | Mensaje de error de red |

---

##  Troubleshooting

### Error: Cannot connect to Gateway
**Problema:** Frontend no puede hacer peticiones al Gateway  
**Solución:** 
1. Verificar que Gateway esté corriendo
2. Verificar `NEXT_PUBLIC_GATEWAY_URL` en `.env.local`
3. Verificar CORS en el Gateway

### Error: Module not found
**Problema:** Dependencias faltantes  
**Solución:** 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: Port already in use
**Problema:** Puerto 5000 ocupado  
**Solución:**
```bash
# Cambiar puerto en package.json
"dev": "next dev -p 3001"
```

---

## 👨‍💻 Mantenimiento

### Actualizar Next.js
```bash
npm install next@latest react@latest react-dom@latest
```

### Actualizar Tailwind
```bash
npm install tailwindcss@latest postcss@latest autoprefixer@latest
```

### Limpiar caché de Next.js
```bash
rm -rf .next
npm run build
```

---

**Frontend - Parte del proyecto WeatherSOA** 🎨
