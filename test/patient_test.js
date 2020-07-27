const mongoose = require("mongoose");
const User = require('../models/user');
const server=require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

// TestCase
chai.use(chaiHttp);
//   for POST Request
  describe('/POST Patient', () => {
    // Testcase 1:- Register a patient without phoneNumber
      it('it should not POST a pateint without phoneNumber field', (done) => {
          let patient = {
            username: "Parmod"
          }
        chai.request(server)
            .post('/patients/register')
            .send(patient)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('errors');
                  res.body.errors.should.have.property('phone');
                  res.body.errors.phone.should.have.property('kind').eql('required');
              done();
            });
      });
    // Testcase 2:- Register a patient with phoneNumber  
    it('it should give new created patient',(done)=>{
      let patient={
        username:"Parveen",
        phone:980070189
      }
      chai.request(server)
      .post('/patients/register')
      .send(patient)
      .end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Sucessfully register a patient');
        res.body.should.have.property('data')
        res.body.data.should.have.property('patient');
        res.body.data.patient.should.have.property('phone');
        res.body.data.patient.should.have.property('username');
        res.body.data.patient.should.have.property('profession').eql('Patient');                  
    done();
      })
    });   

  });

  //Test Routes which required Authorization 
  describe('/POST Patient', () => {
  
    let token;
    // Testcase 3: Login a doctor and get token
     it('it should return token',(done)=>{
       let doctor={
         phone:9830000170,
         password:12345,
       }
       chai.request(server)
       .post('/doctors/login')
       .send(doctor)
       .end((err, res) => {
             res.should.have.status(200);
             res.should.be.json;
             console.log( res.body );
             token = res.body.data.token; 
            done();
        });
     })
    //  TestCase 4:- create a report of Patient without status field 
     it('it should not create Report without status field', (done) => {
      let patient = {
        username: "Parmod"
      }
      chai.request(server)
      .post('/patients/5f0c4a8e7c7c71062c0dd265/create_report')
      .set({ "Authorization": `Bearer ${token}` })
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('status');
              res.body.errors.status.should.have.property('kind').eql('required');
          done();
        });
     }); 

    //  TestCase 5:-create a report of Patient with status field  
    it('it should create report for a patient', (done) => {
      chai.request(server)
          .post('/patients/5f0c4a8e7c7c71062c0dd265/create_report')
          .send({status:"Negative"})
          .set({ "Authorization": `Bearer ${token}` })
          .end((err, res) => {
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Report Made Succesffuly');
            res.body.should.have.property('report')
            res.body.report.should.have.property('pateint_id');
            res.body.report.should.have.property('status');
            res.body.report.should.have.property('doctor_id');     
            done();
          });
    });    
});

describe('/GET Report', () => {
   
  //  TestCase 6:- Get all reports of Patient 
   it('it should give all report of patient',(done)=>{
     chai.request(server)
     .get('/patients/5f0c4a8e7c7c71062c0dd265/all_reports')
     .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Success');
          res.body.should.have.property('data')
          res.body.data.should.have.property('report');
          res.body.data.report.should.be.a('array');
          done(); 
      });
   })
});  