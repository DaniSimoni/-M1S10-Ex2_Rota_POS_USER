/*Após as implementações anteriores, é necessário criar um novo modelo Sequelize chamado "User" para representar um usuário válido no sistema. Para isso, é importante definir corretamente seus campos para que possa ser utilizado adequadamente. Os campos que devem ser definidos são:

‌

id: um número que serve como identificador único para o usuário.
name: uma string que representa o nome completo do usuário.
email: uma string que representa o endereço de email do usuário. Deve ser única e válida.
username: uma string que representa o nome de usuário do usuário. Deve ser única.
password: uma string que representa a senha do usuário. Deve ter no mínimo 8 caracteres.
Ao criar o modelo "User" com esses campos definidos corretamente, será possível utilizá-lo para representar usuários válidos no sistema e armazenar suas informações de maneira segura e eficiente.
*/

const express = require('express');
const connection = require('./src/database');
const Place = require('./src/models/places');
const User = require('./src/models/users');

const app = express();

app.use(express.json());        

connection.authenticate();
connection.sync({alter: true})
console.log('API ON') 

app.listen(3333, () => {
    console.log('SERVIDOR ON!')
}); 


app.post('/places', async (req, res) => {

    try {
         const place = {

        name: req.body.name,
       
        numberPhone: req.body.numberPhone,
  
        openingHours: req.body.openingHours,
  
        description: req.body.description,
 
        latitude: req.body.latitude,   
    
        longitude: req.body.longitude,
      }

         const newPlace = await Place.create(place)

             res.status(201).json(newPlace)

    } catch (error) {
        res.status(400).json({message: error.message})
    }
});


app.get('/places', async (req, res) => {
    try {

        const places = await Place.findAll()
        return res.json(places) 
    } 
    catch (error) {
        res.status(500).json({message: 'Não há dados'})
    }

})


app.delete('/places/:id', async (req, res) => {
    try {
      const place = await Place.findByPk(req.params.id);
      if (!place) {
        return res.status(404).json({ message: 'Local não encontrado' });
      }
      await place.destroy();
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  app.put('/places/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        numberPhone,
        openingHours,
        description,
        latitude,
        longitude
      } = req.body;
   
      const place = await Place.findByPk(id);

      place.name = name;
      place.numberPhone = numberPhone;
      place.openingHours = openingHours;
      place.description = description;
      place.latitude = latitude;
      place.longitude = longitude;

      const placeUpdated = await place.save();

      return res.json(placeUpdated);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

app.post('/users', async (req, res) => {

    try {
         const user = {

        name: req.body.name,
       
        email: req.body.email,
  
        username: req.body.username,
  
        password: req.body.password,
 
      }

         const newUser = await User.create(user)

             res.status(201).json(newUser)

    } catch (error) {
        res.status(400).json({message: error.message})
    }
});


