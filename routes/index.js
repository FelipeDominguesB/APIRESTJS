module.exports = (routes) =>{
    routes.get('/', (request, response) =>{

        response.statusCode = 200;
    
        response.setHeader('Content-type', 'text/html');
    
        response.end('<h1>Ola</h1>');
    
    
        console.log('url: ', request.url);
        console.log('metodo: ', request.method);
        
    });
};