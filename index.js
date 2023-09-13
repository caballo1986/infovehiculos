const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

async function scrapeMercadoLibre(searchQuery) {
    const browser = await puppeteer.launch({ headless: false, slowMo: 400});
    const page = await browser.newPage();
    await page.goto(`https://listado.mercadolibre.com.ar/${searchQuery}`);

    //const firstButtonSelectorCP = 'button[class="onboarding-cp-button andes-button andes-button--filled andes-button--small"]';
    //const codPostal = 'input["name:zipcode"]';

    await page.click('button[class="onboarding-cp-button andes-button andes-button--transparent andes-button--small"]'); // boton para omitir el codigo postal
    await page.click('button[data-testid="action:understood-button"]'); //boton para aceptar las cookies 
    //const codPostal = 'input[class="andes-form-control__field"]'; // Selector del campo de entrada de código postal
    //shouldEnterPostalCode && (await page.type(codPostal, '3400'));

    await page.screenshot({ path: 'imagen.png' });

    //await new Promise(r => setTimeout(r, 1000));

    await page.waitForSelector('section[class="ui-search-results"]');
    const result = await page.evaluate(() => {
        const items = [];
        const elements = document.querySelectorAll('.ui-search-item__title.shops__item-title');
        const prices = document.querySelectorAll('.ui-search-item__group.ui-search-item__group--price.ui-search-item__group--price-grid-container.shops__items-group');
        const attributes = document.querySelectorAll('.ui-search-card-attributes__attribute');
        elements.forEach((element, index) => {
            const title = element.textContent;
            let price = prices[index].textContent.trim(); // Obtener el precio y eliminar espacios en blanco
            price = price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); // Agregar puntos en el formato del número
            price = price.replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Reemplazar puntos extra con comas
            price = price.replace('pesos', ''); // Eliminar la palabra "pesos" si está presente
            price = price.replace('dólares', ''); // Eliminar la palabra "dólares" si está presente
            price = price.trim(); // Eliminar espacios en blanco alrededor del precio
            const parts = price.split(' ');
            price = parts[1];
            let modelo = '';
            let kilometros = '';

            // Obtener el valor del modelo y kilómetros desde las clases de atributos
            attributes.forEach((attribute) => {
                if (attribute.textContent.includes('Km')) {
                    kilometros = attribute.textContent;
                } else {
                    modelo = attribute.textContent;
                }
            });
            items.push({ title, price, modelo, kilometros });
        });
        return items;
    });
    console.log("🚀 ~ file: index.js:34 ~ result ~ result:", result)

    await browser.close();
    return result;
}

app.get('/api/vehiculos', async (req, res) => {
    try {
        const { marca, modelo } = req.query;
        const searchQuery = `${marca} ${modelo}`;
        const data = await scrapeMercadoLibre(searchQuery);
        console.log("🚀 ~ file: index.js:32 ~ app.get ~ searchQuery:", searchQuery)
        console.log("🚀 ~ file: index.js:34 ~ app.get ~ data:", data)
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener datos de MercadoLibre' });
    }
});
app.listen(8080, () => {
    console.log('Server is running on port  http://localhost:8080');
});


