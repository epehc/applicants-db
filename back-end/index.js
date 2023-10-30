const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//Middleware
app.use(cors());
app.use(express.json());


//ROUTES//

//Create an applicant
app.post("/applicants", async (req, res) => {
    try{
        const {first_name, last_name, email, position, liked } = req.body;
        const newApplicant = await pool.query("INSERT INTO applicants (first_name, last_name, email, position, liked) VALUES($1, $2, $3, $4, $5) RETURNING *",[first_name, last_name, email, position, liked] );
        res.json(newApplicant.rows[0]);
    }
    catch (err){
        console.log(err.message)
    }
})

//Get all applicants
app.get("/applicants", async(req,res) => {
    try {
        const allApplicants = await pool.query("SELECT * FROM applicants");
        res.json(allApplicants.rows)
    } catch (err) {
        console.log(err.message);
    }
})

//Get a specific applicant
app.get("/applicants/:id" , async (req, res) => {
    try {
        const {id} = req.params;
        const applicant = await pool.query("SELECT * FROM applicants WHERE applicant_id = $1", [id]);

        res.json(applicant.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})

//update an applicant
app.put("/applicants/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {first_name, last_name, email, position, liked} = req.body;

        const updateApplicant = await pool.query("UPDATE applicants SET first_name = $1, last_name = $2, email = $3, position = $4, liked = $5 WHERE applicant_id = $6",
            [first_name, last_name, email, position, liked, id]);

        res.json("Applicant was updated successfully");
    } catch (err) {
        console.log(err.message);
    }
})

//delete an applicant
app.delete("/applicants/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteApplicant = await pool.query("DELETe FROM applicants WHERE applicant_id = $1", [id]);

        res.json("Applicant deleted successfully!");
    } catch (err) {
        console.log(err.message);
    }
})

//start the server

app.listen(8000, () =>{
    console.log("server has started on port 8000.")
})