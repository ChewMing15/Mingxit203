const fetch = require('node-fetch');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.static('public'));
const port = process.env.port || 3000;

app.listen(port, ()=> {
    console.log(`Listening at ${port}`);
});

datafunction();

async function datafunction() {

    app.get(`/hello/:userinput`, async (request, response) => {

        var input = request.params.userinput;

        const url_fix = 'https://finance.yahoo.com/quote/CMOU.SI/financials?p=CMOU.SI'
        const url = 'https://finance.yahoo.com/quote/' + input + '/financials?p=' + input
        console.log(url);

        const get_data = await fetch(url);
        const term_response = await get_data.text();

        const $ = cheerio.load(term_response);

        const title = [];
        var body = new Array(18);

        for (j=0; j<18; j++) {
            body[j] = new Array(4)
        }

        $('.rw-expnded').each((i, element) => {
            const $element = $(element);
    
            title[i] = $element.children().children().children().eq(0).text();

            for (j=0; j<4; j++) {
                body[i][j] = $element.children().children().eq(j+1).text();
            }

        });

        let table = {
            title,
            body
        }
        
        console.log(table);
        
        
            
        response.json(table);
        
    });
    
    //console.log(uer);
}


//const url = 'https://www.imdb.com/chart/top/?ref_=nv_mv_250'
    
    // $('.titleColumn').each((i,element)=> {
    //     const $element = $(element);
    //     const site = $element.find('a');
    //     const year = {something: site.text()};
    //     //console.log(i + year);

    //     movies.push(year);
    // });