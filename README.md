# POS TERMINAL

Este es el proyecto **POS Terminal** una API REST desarrollada con node.js version 22.16.0.

## Ejecutar el Proyecto 🚀

Para ejecutar el proyecto, sigue estos pasos:

1. Configuración del entorno:
   Clonar el archivo `.env.template` a `.env` (desarrollo)
   y/o clonar el archivo `.env.template` a `.env.prod` (producción).

2. Configurar las variables de entorno en los archivos `.env` y/o `.env.prod` (son obligatorias).

3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Levantar las bases de datos:

   ```bash
   docker compose up -d
   ```

5. Ejecutar la aplicación:

   Desarrollo:

   ```bash
   npm run dev
   ```

   Producción:

   ```bash
   npm run prod
   ```

## Pruebas de Linter 🔍

Para ejecutar las pruebas de linter y asegurar la calidad del código, puedes usar los siguientes comandos:

1. Verificar errores de linter:

   ```bash
   npm run lint
   ```

2. Corregir automáticamente los errores de linter:
   ```bash
   npm run lint:fix
   ```

## Despliegue 🚀

Para desplegar la aplicación en producción, sigue estos pasos:

1. Construir la aplicación:

   ```bash
   npm run build
   ```

2. Asegúrate de tener configurado el archivo `.env.prod` con las variables de entorno correctas para producción.

3. Iniciar la aplicación en modo producción:
   ```bash
   npm run start
   ```

## Documentación de la API 📚

### Documentación Swagger

Puedes realizar pruebas reales de la API a través de Swagger UI. Accede a ella en:

```http
GET /api-docs
```

### Autenticación

#### Registro de Usuario

```http
POST /api/v1/auth/signup
Content-Type: application/json

{
  "name": "Nombre Usuario",
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

Respuesta exitosa (201):

```json
{
  "message": "Usuario creado exitosamente",
  "user": {
    "_id": "user_id",
    "name": "Nombre Usuario",
    "email": "usuario@ejemplo.com",
    "role": "admin",
    "createdAt": "2025-06-13T07:02:17.647Z",
    "updatedAt": "2025-06-13T07:02:17.647Z"
  }
}
```

#### Inicio de Sesión

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

Respuesta exitosa (200):

```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "name": "Nombre Usuario",
    "email": "usuario@ejemplo.com",
    "role": "admin",
    "createdAt": "2025-06-13T07:02:17.647Z",
    "updatedAt": "2025-06-13T07:02:17.647Z"
  }
}
```

### Transacciones

Todas las rutas de transacciones requieren autenticación. Incluye el token JWT en el header:

```http
Authorization: Bearer <jwt_token>
```

#### Crear Transacción

```http
POST /api/v1/transactions
Content-Type: application/json
Authorization: Bearer <jwt_token>

{
  "terminalId": "TERM123",
  "amount": 150000,
  "currency": "COP",
  "cardMasked": "4111111111111111",
  "status": "pending"
  "transactionType": "refund",
}
```

Respuesta exitosa (201):

```json
{
  "_id": "transaction_id",
  "terminalId": "TERM123",
  "amount": 150000,
  "currency": "COP",
  "cardMasked": "4111111111111111",
  "status": "pending",
  "transactionType": "refund",
  "createdAt": "2025-06-13T07:02:17.647Z",
  "updatedAt": "2025-06-13T07:02:17.647Z"
}
```

#### Listar Transacciones

```http
GET /api/v1/transactions?limit=10&page=0&query=&sortBy=createdAt&order=DESC
Authorization: Bearer <jwt_token>
```

Parámetros de consulta:

- `limit`: Número de elementos por página (default: 10)
- `page`: Número de página (default: 0)
- `query`: Término de búsqueda para filtrar por terminalId, cardMasked, transactionType o status
- `sortBy`: Campo por el cual ordenar (createdAt, terminalId, amount, currency, cardMasked, transactionType, status)
- `order`: Orden de clasificación (ASC, DESC)

Respuesta exitosa (200):

```json
{
  [
    {
      "_id": "transaction_id",
      "terminalId": "TERM123",
      "amount": 100000,
      "currency": "COP",
      "cardMasked": "4111111111111111",
      "status": "approved",
      "transactionType": "sale",
      "createdAt": "2024-03-21T10:00:00.000Z",
      "updatedAt": "2025-06-13T07:05:29.855Z",
    }
  ],
}
```

### Códigos de Error

- `400`: Error de validación en los datos enviados
- `401`: Error de autenticación (token inválido o expirado)
- `500`: Error interno del servidor
