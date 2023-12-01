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
const path = require("path")
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

//To be able to store the images in the database
app.use('/images', express.static(path.join(__dirname, 'images')));


/**
 * Create an applicant.
 *
 * This endpoint allows for the creation of a new applicant in the database.
 *
 * @name CreateApplicant
 * @route {POST} /applicants
 * @bodyparam {string} avatar - avatar for the applicant.
 * @bodyparam {string} first_name - The first name of the applicant.
 * @bodyparam {string} last_name - The last name of the applicant.
 * @bodyparam {string} email - The email address of the applicant.
 * @bodyparam {string} position - The position applied for by the applicant.
 */
app.post("/applicants", async (req, res) => {
    try{
        const {avatar, first_name, last_name, email, position } = req.body;
        const newApplicant = await pool.query("INSERT INTO applicants (avatar, first_name, last_name, email, position) VALUES($1, $2, $3, $4, $5) RETURNING *",[avatar, first_name, last_name, email, position] );
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
app.get("/applicants", async(req, res) => {
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
 * @bodyparam {string} avatar - The updated liked status of the applicant.
 */
app.put("/applicants/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {avatar, first_name, last_name, email, position, applicant_id} = req.body;

        const updateApplicant = await pool.query("UPDATE applicants SET avatar = $1, first_name = $2, last_name = $3, email = $4, position = $5 WHERE applicant_id = $6",
            [avatar, first_name, last_name, email, position, applicant_id]);

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
        try {
            const {id} = req.params;
            const deleteApplicant = await pool.query("DELETE FROM applicants WHERE applicant_id = $1", [id])

            res.json("Applicant deleted successfully!");
        } catch (err) {
            console.log(err.message);
        }
    });

// Start the server
app.listen(8000, () => {
    console.log("server has started on port 8000.")
});
