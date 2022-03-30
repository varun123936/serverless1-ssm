'use strict';

const getParams = require('./getParam');
module.exports.parameters = (event, context, callback) => {
  getParams(event,(error,result)=>{
    try{
      const response={
        statusCode:200,
        body:JSON.stringify(result)
      };
      callback(null,response);
    }catch(error){
      const response={
        statusCode:400,
        body:JSON.stringify(result)
      };
      callback(error,response);
    }

  });
  
};
