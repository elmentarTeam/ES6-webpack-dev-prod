## ES6 Tutorial

run the project:
1. npm3 install
2. npm3 run start

If you want change environemt from "dev" to "prod":

webpack.config.js

const NODE_ENV = process.env.NODE_ENV || 'development'
change 'development' to 'production'