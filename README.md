# Hospital
## Tech Stack: Node.js & Mongo DB for more info go to pacakge-lock.json
## Design an API for the doctors of a Hospital which has been allocated by the govt for testing and quarantine + well being of COVID-19 patients
### Users
  Doctors, Patients
## Schema's are:-
  ### Userschema 
  ### Report Schema
## routes are as follow:-
 ### /doctors/register → with username ,phone number and password
 ### /doctors/login → returns the token 
 ### /patients/register ->phone number
 ### /patients/:id/create_report -> only by doctor 
 ### /patients/:id/all_reports → List all the reports of a patient oldest to latest
 ### /reports/:status → List all the reports of all the patients filtered by a specific status
 
 
  
  
  
