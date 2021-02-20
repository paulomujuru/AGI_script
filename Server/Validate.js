const AGIServer = require('agi');
const config = require('./server.config.json')
const authURL = 'https://api-uct.mukuru.com/taurus/v1/auth/token'
const validateURL = 'https://api-uct.mukuru.com/taurus/v1/customers'

function Server(){
    AGIServer.createServer(function(context) {
        context.on('variables', function(vars) {
            /*
            Authenticate to the Valtari system
            */
            const newAuth = async()=>{
                const req = await fetch(authURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "grant_type": "client_credentials",
                        "client_id": "",
                        "client_secrets": ""
                    })
                })
                const res = await req.json();
                return res
            }
            // Validate if the user is within the Valtari system
            const validateNum = async()=>{
            try{
                const token = await newAuth();
                const req = await fetch(validateURL + `?mobile=${vars.agi_callerid}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-token': token.access_token
                    }
                })
                const res = await req.json();
                return res
            }catch(err){
                console.log(err)
            }
            // If the member is validated, see if they have a languege assigned to their account
            if (req.items.languege !== ''){
                // Validated member has a languege option
                // TODO: Route call to corrent queue
            }else if (req.items.languege === ''){
                // TODO: Send call to IVR languege selection
            }
        }
        });
        }).listen(config.Port);
}

module.exports = Server;
