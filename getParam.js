const AWS = require('aws-sdk');
AWS.config.update({region:'ap-south-1'});
const ssm = new AWS.SSM();


module.exports = async(event,callback)=>{
    try{
        var result=await ssm.getParameter({
            Name: "external-api-url"
        }).promise();
    }catch(error){
        console.log(error);
    }
    callback(null,result);
}