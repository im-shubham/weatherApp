const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
var requests = require('requests');

const hostname = '127.0.0.1';
const port = 3000;

const convert = (temp) => {
    return Math.round(temp - 273.15);
}





let indexFile = fs.readFile("index.html", 'utf8', (err, data) => {
    if (err) throw err;
    indexFile = data;
  });
const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempval%}", convert(orgVal.main.temp));
    temperature = temperature.replace("{%tempmin%}", convert(orgVal.main.temp_min));

    
    
    temperature = temperature.replace("{%tempmax%}", convert(orgVal.main.temp_max));
    temperature = temperature.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);
    
    return temperature;
}  


const server = http.createServer((req, res) => {
  const urlObj = url.parse(req.url, true);
  if (urlObj.pathname === '/') {
    requests('https://api.openweathermap.org/data/2.5/weather?q=Bangalore&appid=10cad46f5da8dd01bbc8f5185c638882')
    .on('data', function (chunk) {
        const objData = JSON.parse(chunk);
        const arrData = [objData];
  
    
      const realTimeData = arrData.map((val) => {
        return replaceVal(indexFile, val);
        }).join("");





        fs.writeFileSync("index.html", realTimeData);

        console.log(realTimeData);


    })
    .on('end', function (err) {
      if (err) return console.log('connection closed due to errors', err);
        res.end();

    
     
      console.log('end');
    });
  }else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Page not found');
  }
});

server.listen(3000, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


