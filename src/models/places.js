const connection = require('../database');
const { Sequelize } = require('sequelize');

const Place = connection.define('place', {

    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },

    numberPhone:{
        type: Sequelize.STRING,
    },

    openingHours:{
        type: Sequelize.STRING,
        allowNull: true,
    },

    description:{
        type: Sequelize.STRING,
        allowNull: true,
    },

    latitude:{
        type: Sequelize.DECIMAL,
        allowNull: true,
    },

    longitude:{
        type: Sequelize.DECIMAL,
        allowNull: true,
    },

} )

module.exports = Place;

