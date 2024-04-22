import 'mocha';
import { expect } from 'chai';
import request from 'request';

describe('Server', () => {
  describe('GET /cards', () => {
    it('should return a 200 status code if the user is found in the request', (done) => {
      const options = {
        url: 'http://localhost:3000/cards/Javieralmenara01',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      request(options, (error, response) => {
        if (error) return done(error);
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('GET /users', () => {
    it('should return a 200 status code', (done) => {
      const options = {
        url: 'http://localhost:3000/users',
        method: 'GET',
      };

      request(options, (error, response) => {
        if (error) return done(error);
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('POST /cards', () => {
    it('should return a 200 status code if the card is inserted.', (done) => {
      const options = {
        url: 'http://localhost:3000/cards/TestUsers',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id": 3,
          "title": "Lightning Bolt 3",
          "manaCost": 1,
          "color": "Red",
          "type": "Instant",
          "rarity": "Common",
          "rulesText": "Lightning Bolt deals 3 damage to any target.",
          "value": 2
        })
      };
      
      request(options, (error, response) => {
        if (error) return done(error);
        expect(response.statusCode).to.equal(201);
        done();
      });
    });

    it('should return a 404 status code if have bad request', (done) => {
      const options = {
        url: 'http://localhost:3000/cards/TestUser',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "title": "Lightning Bolt 3",
          "manaCost": 1,
          "color": "Red",
          "type": "Instant",
          "rarity": "Common",
          "rulesText": "Lightning Bolt deals 3 damage to any target.",
          "value": 2
        })
      };
      
      request(options, (error, response) => {
        if (error) return done(error);
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('PATCH /cards', () => {
    it('should return a 200 status code if the card is modified', (done) => {
      const options = {
        url: 'http://localhost:3000/cards/TestUsers/3',
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id": 3,
          "title": "Lightning Bolt 3",
          "manaCost": 1,
          "color": "Red",
          "type": "Instant",
          "rarity": "Common",
          "rulesText": "Lightning Bolt deals 3 damage to any target.",
          "value": 3
        })
      };
      
      request(options, (error, response) => {
        if (error) return done(error);
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('should return a 400 status code if the card not exists', (done) => {
      const options = {
        url: 'http://localhost:3000/cards/TestUsers/4',
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id": 3,
          "title": "Lightning Bolt 3",
          "manaCost": 1,
          "color": "Red",
          "type": "Instant",
          "rarity": "Common",
          "rulesText": "Lightning Bolt deals 3 damage to any target.",
          "value": 3
        })
      };
      
      request(options, (error, response) => {
        if (error) return done(error);
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('DELETE /cards', () => {
    it('should return a 200 status code if the user is delete', (done) => {
      const options = {
        url: 'http://localhost:3000/cards/TestUsers/3',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      request(options, (error, response) => {
        if (error) return done(error);
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('should return a 404 status code if the user not exist', (done) => {
      const options = {
        url: 'http://localhost:3000/cards/TestUser/3',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      request(options, (error, response) => {
        if (error) return done(error);
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });
});
