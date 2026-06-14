# UE

Aplicación móvil para Android de delivery de comida, estilo Uber Eats. Construida con React Native + Expo.

## Requisitos

- Node.js 18+
- npm
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (para emulador) o la app **Expo Go** en tu celular Android

## Instalación

```bash
npm install
```

## Levantar en desarrollo

```bash
npx expo start
```

Luego elige cómo abrir la app:

- Presiona `a` para abrir en el emulador de Android
- Escanea el código QR con la app **Expo Go** en tu celular
- Presiona `w` para abrir en el browser (modo web)

## Configuración

La app consume el microservicio `ms-ue-restaurantes`. La URL del servicio se configura en `src/services/restaurants.service.ts`:

```ts
const API_URL = 'http://localhost:3000';
```

> Para probar desde un dispositivo físico reemplaza `localhost` con la IP local de tu máquina (ej: `http://192.168.1.10:3000`).

## Estructura principal

```
src/
  components/
    AddressBar.tsx       # Modal para cambiar dirección de entrega
    CategoryFilter.tsx   # Filtros de categoría horizontales
    RestaurantCard.tsx   # Tarjeta de restaurante
    SearchBar.tsx        # Barra de búsqueda
  screens/
    HomeScreen.tsx       # Pantalla principal
  services/
    restaurants.service.ts  # Llamada al microservicio
  data/
    restaurants.ts       # Tipos e interfaces
```

## Servicios externos requeridos

| Servicio | Uso |
|---|---|
| `ms-ue-restaurantes` en `localhost:3000` | Obtener lista de restaurantes |
