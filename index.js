const Server = require('./Server/Validate.js')
const config = require('./Server/server.config.json')

try{
    console.log(`Starting AGI Server on ${config.Hostname}:${config.Port}`)
    Server();
}catch(e){
    console.log(err);
}