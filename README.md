# infovehiculos
# Aplicación de Scraping en JavaScript

Esta es una aplicación de scraping en JavaScript que extrae datos de una página web y los muestra o procesa de acuerdo con tus necesidades. En este caso, hemos utilizado Puppeteer para realizar el scraping, pero puedes adaptar este README a otras herramientas de scraping en JavaScript si lo deseas.

## Requisitos

Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu sistema.

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
      git clone https://github.com/caballo1986/infovehiculos

2.Navega al directorio del proyecto:

      cd infovehiculos

3.Instala las dependencias:

      npm install

##Uso
1.Ejecuta la aplicación de infovehiculos:

      npm run watch

2.Accede a la API a través de http://localhost:8080/api/vehiculos proporcionando los parámetros marca y modelo en la URL.

Ejemplo de URL de solicitud:

      http://localhost:8080/api/vehiculos?marca=Toyota&modelo=Corolla

Configuración Personalizada
Puedes personalizar la configuración de búsqueda editando el archivo index.js. Ajusta las URL, los selectores y otras opciones según tus necesidades específicas.

// Ejemplo de configuración personalizada
const searchQuery = 'Toyota Corolla';
