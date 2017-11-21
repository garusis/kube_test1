const fixtures = require('./assistant.fixtures');
describe('assistants', function(){
    describe('[POST] /assistants', function(){
        it('Should create a new assistant', function(done){
            chai.request(app).post('/assistants').send(fixtures.post.assistant).end(function(err, res){
                should.not.exist(err);
                should.exist(res);
                res.body.should.be.an('object');
                res.body.name.should.be.a('string');
                should.exist(res.body.photo);
                done();
            })
        });
        it('It should create a new assistant with same name and photo', function(done){
            chai.request(app).post('/assistants').send(fixtures.post.assistant).end(function(err, res){
                should.not.exist(err);
                res.body.should.be.an('object');
                res.body.name.should.be.a('string');
                should.exist(res.body.photo);                
                done();
            })
        });
        it('It should\'t create a new assistant without required attributes', function(done){
            chai.request(app).post('/assistants').send(fixtures.post.assistantwrong).end(function(err,res){
                should.exist(err);
                expect(res).to.have.status(422);
                res.body.should.be.an('array'); 
                res.body[0].name.should.be.equal('name');
                done();
            })
        });
        it('It shouldn\'t create a new assistant with wrong attributes', function(done){
            chai.request(app).post('/assistants').send(fixtures.post.assistantbad).end(function(err, res){
               should.exist(err);
               expect(res).to.have.status(422);
               res.body[0].name.should.be.equal('name');
               res.body[0].name.should.be.a('string');
               done();
            })
        });
        it('It should create a new assistant with unrequired attributes', function(done){
            chai.request(app).post('/assistants').send(fixtures.post.assistantgood).end(function(err, res){
                should.not.exist(err);
                expect(res.body.photo).to.be.undefined;
                res.body.name.should.be.equal('Roberto');
                done();
            })
        });
    });
    describe('[GET] /assistants', function(){
        it('It should get all assistants', function(done){
            chai.request(app).get('/assistants').end(function(err, res){
                should.not.exist(err);
                res.body.should.be.an('array');

                done();
            });
        });
        it('It should get assistants with matching query', function(done){
            chai.request(app).get('/assistants?name=Fabian').end(function(err, res){
                should.not.exist(err);
                res.body.should.be.an('array');
                req.query.name.should.be.equal('Fabian');
                done();
            });
        });        
    });
    describe('[GET] /assistants/:id', function(){
        it('It should get an assistant using its id', function(done){
            chai.request(app).get('/assistants/1').end(function(err, res){
                should.not.exist(err);
                res.body.should.be.an('object');
                res.body.name.should.be.and('string');                
                done();
            });
        });
        it('It shouldn\'t get an assistant using unsaved id', function(done){
            chai.request(app).get('/assistants/666').end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(404);
                done();
            });
        });
    });
    describe('[PUT] /assistants/:id', function(){
        it('it should update an assistant by his id', function(done){
            chai.request(app).put('/assistants/1').send(fixtures.put.assistant).end(function(err, res){
                should.not.exist(err);
                res.body.id.should.to.equal('1');
                res.body.name.should.have.lengthOf(fixtures.put.assistant.name.length);
                done();
            })
        });
        
        it('it shouldn\'t update an assistant using wrong formated attributes', function(done){
            chai.request(app).put('/assistants/1').send(fixtures.put.assistantwrong).end(function(err, res){
                should.exist(err);
                expect(res).have.status(422);
                res.body[0].name.should.be.equal('name');
                done();
            })
        });
        it('it shouldn\'t put an assistant using an invalid id', function(done){
            chai.request(app).put('/assistants/6').send(fixtures.put.assistant).end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(404);
                done();
            });
        });        
    });
    describe('[DELETE] /assistants/:id', function(){
        it('it should delete an assistant using its id', function(done){
            chai.request(app).delete('/assistants/1').end(function(err, res){
                should.not.exist(err);
                res.body.should.be.an('object');
                res.body.should.not.be.an('array');
                done();
            })
        });
        
        it('it shouldn\'t delete an assistant using an unsaved id', function(done){
            chai.request(app).delete('/assistants/505').end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(404);
                done();
            })
        });
    });

})