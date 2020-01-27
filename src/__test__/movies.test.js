const supertest = require('supertest');
const app = require('../index');
const Movies = require('../models/movies.model')

describe("Testiing movie controller API", () => {
  
  it('tests our testing framework if it works', async () => {
    
    const response = await supertest(app).get('/')

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });

  it("tests the get movies endpoint and have message property", async () => {

    const resonse = await supertest(app).get('/movies');
    expect(resonse.status).toBe(200);
    expect(resonse.body.status).toBe('success');
    expect(resonse.body).toHaveProperty('message')
  })

  // Testing the POST/ movies endpoint
  it("tests the post new movies endposint and return as sucess message", async () => {

    const resonse = await  supertest(app).post('/movies').send({
      title: 'New Movie',
      synopsis: 'Synopsis of the new movie',
      rating: 'PG'
    });

    expect(resonse.status).toBe(200);
    expect(resonse.body.status).toBe('success');
    expect(resonse.body.message).toBe('Movies Saved Successfully.');
  });

  // This is run after 
  afterEach(async () => {
    await Movies.deleteOne({
      title: 'New Movie'
    })
  })

})