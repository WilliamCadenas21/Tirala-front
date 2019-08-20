//averiguar si esto se puede hacer con variables de entorno 
const env = 'development'

const config = {
    development:{
        uriBase:'http://localhost:4000/api/'
    },
    production:{
        uriBase:'http://3.225.27.235/api/'
    }
}
console.log(config[env])

export default config[env] 