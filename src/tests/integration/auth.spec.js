import chai from 'chai';
import chaiHttp from 'chai-http';
import Knex from 'knex';
import database from '../../app/configs/database';
import params from '../../app/configs/params';
import App from '../../app/app.js';
import {BAD_REQUEST_CODE, SUCCESS_CODE, VALIDATION_ERROR_CODE} from '../../app/configs/status-codes';
import {INVALID, REQUIRED, USER_NOT_EXIST, VALIDATION_ERROR} from '../../app/configs/messages';
import {insertingUser, testPass} from '../../database/data';

const app = App();
const expect = chai.expect;
const knex = Knex(database);

chai.should();
chai.use(chaiHttp);

describe('Auth Module', () => {
    const email = insertingUser.email,
        password = testPass,
        notExistingEmail = 'customer-new@test.com';

    describe('/api/auth/login POST(Sign user in)', () => {

        it('should give validation error from missing password', (done) => {
            chai.request(app)
                .post('/api/auth/login')
                .set('origin', params.appUrl)
                .send({ email })
                .end((err, res) => {
                    res.should.have.status(VALIDATION_ERROR_CODE);
                    res.body.message.should.be.equal(VALIDATION_ERROR);
                    res.body.status.should.be.equal(VALIDATION_ERROR_CODE);
                    expect(res.body.data).to.be.null;
                    res.body.errors.should.not.be.null;
                    res.body.errors.password.should.not.be.null;
                    res.body.errors.password.msg.should.be.equal(REQUIRED('Password'));
                    done();
                });
        });

        it('should give validation error for missing email', (done) => {
            chai.request(app)
                .post('/api/auth/login')
                .set('origin', params.appUrl)
                .send({ password })
                .end((err, res) => {
                    res.should.have.status(VALIDATION_ERROR_CODE);
                    res.body.message.should.be.equal(VALIDATION_ERROR);
                    res.body.status.should.be.equal(VALIDATION_ERROR_CODE);
                    expect(res.body.data).to.be.null;
                    res.body.errors.should.not.be.null;
                    res.body.errors.email.should.not.be.null;
                    res.body.errors.email.msg.should.be.equal(REQUIRED('Email'));
                    done();
                });
        });

        it('should give authentication error for not matching credentials', (done) => {
            chai.request(app)
                .post('/api/auth/login')
                .set('origin', params.appUrl)
                .send({ email: notExistingEmail, password })
                .end((err, res) => {
                    res.should.have.status(BAD_REQUEST_CODE);
                    res.body.message.should.be.equal(USER_NOT_EXIST);
                    res.body.status.should.be.equal(BAD_REQUEST_CODE);
                    expect(res.body.data).to.be.null;
                    expect(res.body.errors).to.be.null;
                    done();
                });
        });

        it('should sign in user', (done) => {
            chai.request(app)
                .post('/api/auth/login')
                .set('origin', params.appUrl)
                .send({ email, password })
                .end((err, res) => {
                    res.should.have.status(SUCCESS_CODE);
                    res.body.should.not.be.null;
                    res.body['access_token'].should.not.be.null;
                    res.body['refresh_token'].should.not.be.null;
                    res.body.user.should.not.be.null;
                    res.body.user.email.should.be.equal(email);
                    done();
                });
        });
    });

});
