const { expect } = require("chai");
const request = require("request");
let url ='http://localhost:3000/api/cat';
let cat = {
    title:'',
    subTitle:'',
    description:'',
    path:''
};

describe('Test GET api', function(){
    it('Returns statusCode of 200',function(done){
        request(url,function(error, response, bodyString){
            let bodyObj = JSON.parse(bodyString);
            expect(bodyObj.statusCode).to.equal(200);
            expect(bodyObj.message).to.equal('success');
            expect(bodyObj.statusCode).to.be.a('number');
            done();
        });
    });
});

describe('Test POST api', function(){
    it('POST cat to DB',function(done){
        request.post({url:url, form:cat}, function(error, response, bodyString){
            let bodyObj = JSON.parse(bodyString);
            expect(bodyObj.statusCode).to.equal(201);
            expect(bodyObj.message).to.equal('success');
            done();
        });
    });
});

describe('Test DELETE api', function(){
    it('DELETE a cat',function(done){
        request.delete({url:url, form:cat}, function(error, response, bodyString){
            let bodyObj = JSON.parse(bodyString);
            expect(bodyObj.statusCode).to.equal(202);
            expect(bodyObj.message).to.equal('success');
            done();
        });
    });
});
