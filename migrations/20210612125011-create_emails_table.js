'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('emails', { 
      id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
       },
      
       remetente:{
           type:Sequelize.STRING,
           allowNull:false,
       },
       destinatario:{
        type:Sequelize.STRING,
        allowNull:false,
    },
      assunto:{
          type:Sequelize.STRING(50),
          allowNull:false,
      },
      mensagem:{
          type:Sequelize.TEXT,
          allowNull:false,
      },
    createdAt:Sequelize.DATE,
    updatedAt:Sequelize.DATE,
    
    
    });
     
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.dropTable('emails');
     
  }
};
