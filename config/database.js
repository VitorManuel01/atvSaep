const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('railway', 'root', 'gduuYTlJejXXHfybrWXRuWbBZhvhSDVE', {
    host: 'autorack.proxy.rlwy.net',
    dialect: 'mysql',
    port: '30848',
    
    // configuração necessária para evitar o erro ECONNRESET
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: console.log,
});

module.exports = sequelize;
