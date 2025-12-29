# MiDespensa - Presentación del Proyecto 🏠

**Fecha de presentación:** 30 de diciembre de 2024  
**Desarrollador:** Antonio  
**Período de desarrollo:** 5 días (tiempo parcial)

---

## 📋 Resumen del Proyecto

**MiDespensa** es una aplicación web para gestionar la despensa del hogar y lista de compras. Permite controlar productos almacenados, fechas de vencimiento, y organizar las compras de manera eficiente.

---

## ✅ Funcionalidades Implementadas

### Backend (API REST)

#### 🏷️ Gestión de Categorías
- ✅ CRUD completo de categorías
- ✅ Paginación y búsqueda
- ✅ Asignación de colores e íconos para identificación visual
- ✅ Endpoints: `GET`, `POST`, `PUT`, `DELETE`

#### 🥫 Gestión de Productos en Despensa
- ✅ CRUD completo de productos
- ✅ Registro de nombre, cantidad, categoría y fecha de vencimiento
- ✅ Paginación de productos
- ✅ Relación con categorías
- ✅ Endpoints: `GET /api/pantry`, `POST`, `PUT`, `DELETE`

#### 🛒 Lista de Compras
- ✅ CRUD completo de items
- ✅ Marcar items como "comprados" (campo `checked`)
- ✅ Contador de items pendientes
- ✅ Estadísticas de la lista (`GET /api/shopping-list/stats`)
- ✅ Endpoints: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`

#### 🔧 Sistema de Logs
- ✅ Registro automático de errores en base de datos
- ✅ Endpoints para consultar y gestionar logs
- ✅ Búsqueda y filtrado de logs
- ✅ Logger con Pino (consola + BD)

### Frontend (React + TypeScript)

#### 🎨 Interfaz de Usuario
- ✅ Diseño responsive (mobile-first)
- ✅ Páginas implementadas:
  - Gestión de despensa (PantryPage)
  - Lista de compras (ShoppingListPage)
- ✅ Componentes reutilizables
- ✅ Integración con API del backend

#### 🔄 Gestión de Estado
- ✅ Hooks personalizados para consumo de API
- ✅ Manejo de tipos TypeScript sincronizados con backend
- ✅ Validación de datos en cliente

---

## 🚧 En Progreso / Pendiente

### Funcionalidades Bonus
- ⏳ **Dashboard principal**
- ⏳ **Gestión de categorías**
- ⏳ **Búsqueda de productos por nombre** (backend listo, falta UI)
- ⏳ **Filtrado por categoría** (backend listo, falta UI)
- ⏳ **Ordenamiento por fecha de vencimiento** (backend listo, falta UI)
- ⏳ **Alertas visuales de productos próximos a vencer** (< 7 días)


### Mejoras Técnicas
- ⏳ Pruebas unitarias e integración (parcialmente implementadas)
- ⏳ Validación de formularios mejorada
- ⏳ Manejo de errores más robusto en UI
- ⏳ Optimización de rendimiento

---

## 🚀 Instrucciones para Correr el Proyecto Localmente

### Requisitos Previos
- **Node.js**: versión 20.x (máximo, por compatibilidad con Prisma 5.22.0)
- **pnpm** (recomendado) o npm/yarn
- **Base de datos**: PostgreSQL, MySQL o SQLite (según configuración)

### 1️⃣ Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd miDespensa
```

### 2️⃣ Configurar el Backend

```bash
cd miDespensa-server

# Instalar dependencias
pnpm install

# Configurar variables de entorno
# Opción 1: Crear archivo .env (producción/desarrollo)
cp .env.example .env
# Editar .env con tus credenciales de BD

# Opción 2: Usar config.json (desarrollo)
# El archivo config.json ya está configurado para desarrollo local (ajustar password db)

# Ejecutar migraciones de Prisma
pnpm prisma migrate dev

# (Opcional) Cargar datos de prueba
pnpm seed

# Iniciar servidor en modo desarrollo
pnpm dev
```

El servidor estará disponible en `http://localhost:3000` (o el puerto configurado).

### 3️⃣ Configurar el Frontend

```bash
cd ../mi-despensa-client

# Instalar dependencias
pnpm install

# Configurar variables de entorno
# Crear archivo .env con la URL del backend
echo "VITE_API_URL=http://localhost:3000" > .env

# Iniciar aplicación en modo desarrollo
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`.

### 📝 Notas sobre Gestores de Paquetes
Si prefieres usar `npm` o `yarn`:
1. Elimina `pnpm-lock.yaml` y `pnpm-workspace.yaml`
2. Ejecuta `npm install` o `yarn install`

---

## 🧠 Decisiones Técnicas Importantes

### 1. **Cambio de Astro a React**
**Decisión:** Usar React en lugar de Astro para el frontend.

**Razón:** 
- La aplicación requiere alto dinamismo e interactividad
- Uso de Astro implicaría muchas "islas" de React
- Al ser de uso personal, no se requiere SEO
- Prácticamente no hay contenido estático

### 2. **Arquitectura del Backend**
**Decisión:** Implementar arquitectura limpia con separación de capas.

**Estructura:**
- **Features**: Módulos por funcionalidad (categories, pantryProducts, shoppingList, logs)
- **Shared**: Código compartido (BaseController, BaseRepository, middlewares)
- **Configs**: Configuración centralizada

**Beneficios:**
- Código mantenible y escalable
- Fácil testing
- Separación de responsabilidades

### 3. **Prisma como ORM**
**Decisión:** Usar Prisma en lugar de Mongoose u otros ORMs.

**Razón:**
- Type-safety nativo con TypeScript
- Migraciones automáticas
- Excelente DX (Developer Experience)
- Soporte multi-base de datos

### 4. **Sistema de Configuración Dual**
**Decisión:** Usar `config.json` para desarrollo y `.env` para producción.

**Razón:**
- Simplifica el desarrollo local (no necesitas crear `.env` cada vez)
- Mantiene seguridad en producción con variables de entorno
- Evita commits accidentales de credenciales

### 5. **Logging con Pino + Base de Datos**
**Decisión:** Implementar logger dual (consola + BD).

**Razón:**
- Pino es extremadamente rápido
- Logs en BD permiten análisis posterior
- Endpoint de logs facilita debugging en producción
- Separación de logs por nivel (error, warn, info)

### 6. **Tipado Estricto en TypeScript**
**Decisión:** Sincronizar tipos entre cliente y servidor.

**Razón:**
- Evita errores en tiempo de ejecución
- Mejor autocompletado en IDE
- Refactorización más segura
- Contrato claro entre frontend y backend

### 7. **Estructura de Respuestas API**
**Decisión:** Formato estandarizado `{ success, message, results }`.

**Razón:**
- Consistencia en todas las respuestas
- Facilita manejo de errores en cliente
- Información clara del estado de cada operación

### 8. **Validación con req-valid-express**
**Decisión:** Usar middleware de validación en rutas.

**Razón:**
- Validación centralizada
- Mensajes de error claros
- Reduce código repetitivo en controladores

---

## 📊 Estadísticas del Proyecto

- **Backend:**
  - 4 módulos principales (Features)
  - 15+ endpoints REST
  - 100% TypeScript
  - Arquitectura limpia

- **Frontend:**
  - React 18 + TypeScript
  - Vite como bundler
  - React Router v6+
  - Componentes reutilizables

- **Base de Datos:**
  - 4 modelos principales (Category, PantryProduct, ShoppingItem, Log)
  - Migraciones con Prisma
  - Relaciones bien definidas

---

## 🎯 Próximos Pasos

1. Completar funcionalidades bonus (búsqueda, filtros, alertas)
2. Mejorar cobertura de tests
3. Optimizar rendimiento de queries
4. Implementar caché en frontend
5. Agregar animaciones y transiciones
6. Documentación de API con Swagger (opcional)

---

## 📞 Contacto

**Desarrollador:** Antonio  
**Repositorio:** [GitHub](enlace-al-repo)  
**Fecha de presentación (parcial):** 30 de diciembre de 2024

---

> **Nota:** Este proyecto fue desarrollado en 4 días (tiempo parcial, después del trabajo) como MVP funcional. Cumple con todos los requerimientos básicos solicitados y está listo para demostración.
