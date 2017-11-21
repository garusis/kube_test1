const fixtures = require('./workshoper.fixtures');
describe('workshopers', function(){
    describe('[POST] /workshopers', function(){
        it('Should create a new workshoper', function(done){
            chai.request(app).post('workshops/1/workshopers').send(fixtures.post.workshoper).end(function(err, res){
                should.not.exist(err);
                should.exist(res);
                res.body.should.be.an('object');
                res.body.name.should.be.a('string');
                should.exist(res.body.photo);
                done();
            })
        });
        it('It should create a new workshoper with same name and photo', function(done){
            chai.request(app).post('/workshopers').send(fixtures.post.workshoper).end(function(err, res){
                should.not.exist(err);
                res.body.should.be.an('object');
                res.body.name.should.be.a('string');
                should.exist(res.body.photo);                
                done();
            })
        });
        it('It should\'t create a new workshoper without required attributes', function(done){
            chai.request(app).post('/workshopers').send(fixtures.post.assistantwrong).end(function(err,res){
                should.exist(err);
                expect(res).to.have.status(422);
                res.body.should.be.an('array'); 
                res.body[0].name.should.be.equal('name');
                done();
            })
        });
        it('It shouldn\'t create a new workshoper with wrong attributes', function(done){
            chai.request(app).post('/workshopers').send(fixtures.post.assistantbad).end(function(err, res){
               should.exist(err);
               expect(res).to.have.status(422);
               res.body[0].name.should.be.equal('name');
               res.body[0].name.should.be.a('string');
               done();
            })
        });
        it('It should create a new workshoper with unrequired attributes', function(done){
            chai.request(app).post('/workshopers').send(fixtures.post.assistantgood).end(function(err, res){
                should.not.exist(err);
                expect(res.body.photo).to.be.undefined;
                res.body.name.should.be.equal('Roberto');
                done();
            })
        });
    });
    describe('[GET] /workshopers', function(){
        it('It should get all workshopers', function(done){
            chai.request(app).get('/workshopers').end(function(err, res){
                should.not.exist(err);
                res.body.should.be.an('array');

                done();
            });
        });
        it('It should get workshopers with matching query', function(done){
            chai.request(app).get('/workshopers?name=Fabian').end(function(err, res){
                should.not.exist(err);
                res.body.should.be.an('array');
                req.query.name.should.be.equal('Fabian');
                done();
            });
        });        
    });
    describe('[GET] /workshopers/:id', function(){
        it('It should get an workshoper using its id', function(done){
            chai.request(app).get('/workshopers/1').end(function(err, res){
                should.not.exist(err);
                res.body.should.be.an('object');
                res.body.name.should.be.and('string');                
                done();
            });
        });
        it('It shouldn\'t get an workshoper using unsaved id', function(done){
            chai.request(app).get('/workshopers/666').end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(404);
                done();
            });
        });
    });
    describe('[PUT] /workshopers/:id', function(){
        it('it should update an workshoper by his id', function(done){
            chai.request(app).put('/workshopers/1').send(fixtures.put.workshoper).end(function(err, res){
                should.not.exist(err);
                res.body.id.should.to.equal('1');
                res.body.name.should.have.lengthOf(fixtures.put.workshoper.name.length);
                done();
            })
        });
        
        it('it shouldn\'t update an workshoper using wrong formated attributes', function(done){
            chai.request(app).put('/workshopers/1').send(fixtures.put.assistantwrong).end(function(err, res){
                should.exist(err);
                expect(res).have.status(422);
                res.body[0].name.should.be.equal('name');
                done();
            })
        });
        it('it shouldn\'t put an workshoper using an invalid id', function(done){
            chai.request(app).put('/workshopers/6').send(fixtures.put.workshoper).end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(404);
                done();
            });
        });        
    });
    describe('[DELETE] /workshopers/:id', function(){
        it('it should delete an workshoper using its id', function(done){
            chai.request(app).delete('/workshopers/1').end(function(err, res){
                should.not.exist(err);
                res.body.should.be.an('object');
                res.body.should.not.be.an('array');
                done();
            })
        });
        
        it('it shouldn\'t delete an workshoper using an unsaved id', function(done){
            chai.request(app).delete('/workshopers/505').end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(404);
                done();
            })
        });
    });

})