import { Sequelize, DataTypes } from 'sequelize';

// RDS configuration
const rds_host = 'mydatabse.cpvntdov7zgx.us-east-1.rds.amazonaws.com';
const db_username = 'fatima';
const db_password = '123456789';
const db_name = 'mydatabse';
const db_port = 5432;

// Sequelize setup
const sequelize = new Sequelize(db_name, db_username, db_password, {
  host: rds_host,
  port: db_port,
  dialect: 'postgres',
});

// Define the model for your RDS table. you can make a seperate model file too as it was only one table so it is define in the same file
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    
  },
  email: {
    type: DataTypes.STRING,
    
  }},
  {
      timestamps:false,
      
  },
  
);


export const handler = async (event) => {     // lambda event handler 
  try {
    
    await sequelize.authenticate();     // connection to database
    console.log('Connection has been established successfully.');
    await User.sync();
      console.log('table has been established successfully.');
    

    // Perform CRUD operations based on the HTTP request method
    switch (event.httpMethod) {
      case 'GET':
        // Fetch all users
        const users = await User.findAll();
        return {
          statusCode: 200,
          body: JSON.stringify(users),
        };

      case 'POST':
        // Create a new user
        const { name, email } = JSON.parse(event.body);
        const newUser = await User.create({ name, email });
        return {
          statusCode: 201,
          body: JSON.stringify(newUser),
        };

      case 'PUT':
        // Update an existing user if exit
        
        const { id, name: updatedName, email: updatedEmail } = JSON.parse(event.body);
        const user = await User.findByPk(id);
        if(user){
          await User.update({ name: updatedName, email: updatedEmail }, { where: { id } });
        
        return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User updated successfully.' }),
    }
        }
    else {
          return{
            
        
          statusCode: 200,
          body: JSON.stringify({ message: 'User not found ' }),
          }
        };

      case 'DELETE':
        // Delete a user
       const { ID } = JSON.parse(event.body);
        const u = await User.findByPk(ID);
        if(u){
          await User.destroy( { where: { id:ID } });
        
        return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User deleeted successfully.' }),
    }
        }
    else {
          return{
            
        
          statusCode: 200,
          body: JSON.stringify({ message: 'User not found ' }),
          }
        };

    
       
    

      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Invalid HTTP request method.' }),
        };
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error.' }),
    };
  }
};