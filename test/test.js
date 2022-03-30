const AWSMock = require("aws-sdk-mock");
const AWS = require("aws-sdk");
const ssmTest = require('../handler');
AWSMock.setSDKInstance(AWS);


const chai = require('chai');
const { doesNotMatch } = require("assert");
const expect = chai.expect;
const should = chai.should;

const base_url = "https://notificare.com/blog/2021/02/12/Using-Parameter-Store-With-Node/";
//const host = `https://${base_url}`;
//const path = "/api/user";

describe("TEST SSM", function() {
  it("should mock SSM getParameter", async () => {
    // Overwriting SSM getParameter()
    AWSMock.setSDKInstance(AWS);
     AWSMock.mock("SSM", "getParameter", {
      Parameter: {
        Name: "external-api-url",
        Type: "String",
        Value: base_url,
        Version: 1,
        LastModifiedDate: 1562226288.85,
        ARN: "arn:aws:ssm:ap-south-1:665157024099:parameter/external-api-url"
      }
    }); 

    const ssm = new AWS.SSM();
    const params = {
      Name: "external-api-url",
      WithDecryption: false
    };
    //const result = await ssm.getParameter(params).promise();
    ssmTest.parameters(params, null, (err, res)=>{

        try{
            console.log("params ",params);
            console.log("result ",res)
            should.exist(res);
            should.not.exist(err);
            expect(res.statusCode).to.equal(400);
            AWSMock.restore('SSM');
            done();

        }catch(error){
            done(error);

        }
    })



//    const value = result.Parameter ? result.Parameter.Value : "";

    /* expect(result.Parameter).to.be.an("object");
    expect(value).to.equal(base_url);
 */
    //AWSMock.restore("SSM");
  });
});