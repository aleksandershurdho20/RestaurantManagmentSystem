//check if we are in development or production
const Live = false;

if (Live) {
    module.exports = require('./prod.js')
}
else {
    module.exports = {} //require('./dev.js')
}