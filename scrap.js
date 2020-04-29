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
        //console.log(url);

        const get_data = await fetch(url);
        const term_response = await get_data.text();

        const $ = cheerio.load(term_response);
        
        var totalRow = 0;
        $('.rw-expnded').each((i, element) => {
            totalRow = i
            return totalRow
        });

        //console.log(totalRow);

        const title = [];
        var body = new Array(totalRow+1);
        var header = new Array(4);
        var what;
        var inUnit;
        //console.log('this one ok?')
        
        what = $('.Mb\\(10px\\)').children().eq(1).text();
        inUnit = $('.Mb\\(10px\\)').children().eq(2).text();

        //console.log('xxx1' + istatment + '1xxx2' + inUnit + '2xxx')

        for (j=0; j<totalRow + 1; j++) {
            body[j] = new Array(4)
        }

        $('.rw-expnded').each((i, element) => {
            const $element = $(element);
            //console.log(i)
            title[i] = $element.children().children().children().eq(0).text();

            for (j=0; j<4; j++) {
                body[i][j] = $element.children().children().eq(j+1).text();
                //console.log('or is it here' + i + "   " + j)
            }

            //console.log('still inside' + i)
        });

        for (i=0; i<5; i++) {
            //console.log('failure point' + i)
            header[i] = $('.D\\(tbhg\\)').children().children().eq(i).text();
            //console.log('@' + i + ' header:' + header[i])
        }

        let table = {
            what,
            inUnit,
            totalRow,
            title,
            body,
            header
        }
        
        console.log(table);
        response.json(table);
        
    });
}


//const url = 'https://www.imdb.com/chart/top/?ref_=nv_mv_250'
    
    // $('.titleColumn').each((i,element)=> {
    //     const $element = $(element);
    //     const site = $element.find('a');
    //     const year = {something: site.text()};
    //     //console.log(i + year);

    //     movies.push(year);
    // });