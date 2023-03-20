const cheerio = require('cheerio');
const axios = require('axios');

axios.get('https://www.boursier.com/actions/paris')
    .then(response => {
        const $ = cheerio.load(response.data);
        const data = [];

        // Extract data based on class attribute
        $('.grid-12').each((index, element) => {
            const item = $(element).text().trim();
            data.push(item);
        });

        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });
