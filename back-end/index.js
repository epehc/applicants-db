/**
 * CRUD Operations for Applicants
 *
 * This module provides the CRUD (Create, Read, Update, Delete) operations for managing applicants.
 * It uses Express.js for handling HTTP requests and `pg` for interacting with the PostgreSQL database.
 *
 * @module CRUDApplicants
 *
 * @requires express
 * @requires cors
 * @requires db
 *
 */

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

/**
 * Create an applicant.
 *
 * This endpoint allows for the creation of a new applicant in the database.
 *
 * @name CreateApplicant
 * @route {POST} /applicants
 * @bodyparam {string} first_name - The first name of the applicant.
 * @bodyparam {string} last_name - The last name of the applicant.
 * @bodyparam {string} email - The email address of the applicant.
 * @bodyparam {string} position - The position applied for by the applicant.
 * @bodyparam {boolean} liked - Whether the applicant was liked or not.
 */
app.post("/applicants", async (req, res) => {
    try{
        const {first_name, last_name, email, position, liked } = req.body;
        const newApplicant = await pool.query("INSERT INTO applicants (first_name, last_name, email, position, liked) VALUES($1, $2, $3, $4, $5) RETURNING *",[first_name, last_name, email, position, liked] );
        res.json(newApplicant.rows[0]);
    }
    catch (err){
        console.log(err.message)
    }});

/**
 * Get all applicants.
 *
 * This endpoint retrieves all the applicants from the database.
 *
 * @name GetAllApplicants
 * @route {GET} /applicants
 */
app.get("/applicants", async(req,res) => {
    try {
        const allApplicants = await pool.query("SELECT * FROM applicants");
        res.json(allApplicants.rows)
    } catch (err) {
        console.log(err.message);
    }});

/**
 * Get a specific applicant.
 *
 * This endpoint retrieves a specific applicant based on their ID.
 *
 * @name GetApplicant
 * @route {GET} /applicants/:id
 * @routeparam {number} id - The ID of the applicant.
 */
app.get("/applicants/:id" , async (req, res) => {
    try {
        const {id} = req.params;
        const applicant = await pool.query("SELECT * FROM applicants WHERE applicant_id = $1", [id]);

        res.json(applicant.rows[0]);
    } catch (err) {
        console.log(err.message);
    }});

/**
 * Update an applicant.
 *
 * This endpoint updates the details of a specific applicant based on their ID.
 *
 * @name UpdateApplicant
 * @route {PUT} /applicants/:id
 * @routeparam {number} id - The ID of the applicant.
 * @bodyparam {string} first_name - The updated first name of the applicant.
 * @bodyparam {string} last_name - The updated last name of the applicant.
 * @bodyparam {string} email - The updated email address of the applicant.
 * @bodyparam {string} position - The updated position of the applicant.
 * @bodyparam {boolean} liked - The updated liked status of the applicant.
 */
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
});

/**
 * Delete an applicant.
 *
 * This endpoint deletes a specific applicant from the database based on their ID.
 *
 * @name DeleteApplicant
 * @route {DELETE} /applicants/:id
 * @routeparam {number} id - The ID of the applicant.
 */
app.delete("/applicants/:id", async (req, res) => {
    app.delete("/applicants/:id", async (req, res) => {
        try {
            const {id} = req.params;
            const deleteApplicant = await pool.query("DELETe FROM applicants WHERE applicant_id = $1", [id]);

            res.json("Applicant deleted successfully!");
        } catch (err) {
            console.log(err.message);
        }
    })
});

// Start the server
app.listen(8000, () => {
    console.log("server has started on port 8000.")
});
