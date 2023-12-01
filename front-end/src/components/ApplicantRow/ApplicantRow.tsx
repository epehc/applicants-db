import React, {useState} from "react"
import {TableRow, TableCell, Avatar, IconButton} from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite'
import ApplicantModal, {Applicant} from "./ApplicantModal"
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import DeleteApplicantModal from "./DeleteApplicantModal";


/**
 * Props for ApplicantRow component.
 * @property {Applicant} applicant - The applicant data to display in the row.
 * @property {Function} onDeleteApplicant - Function to call when an applicant is deleted.
 */
type ApplicantRowProps = {
    applicant: Applicant
    onDeleteApplicant: () => void
}

/**
 * Component representing a single row in the applicant table.
 *
 * @param {ApplicantRowProps} props - Props for the component.
 * @returns {React.ReactElement} A table row element representing an applicant.
 */
const ApplicantRow: React.FC<ApplicantRowProps> = ({applicant, onDeleteApplicant}) => {

    /**
     * State for tracking the 'liked' status of an applicant.
     */
    const [liked, setLiked] = useState(false);

    /**
     * State for managing the visibility of the edit modal.
     */
    const [editModalOpen, setEditModalOpen] = useState(false);

    /**
     * State for storing the updated applicant details.
     */
    const [updatedApplicant, setApplicant] = useState(applicant);

    /**
     * State for managing the visibility of the delete confirmation modal.
     */
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    /**
     * Opens the delete confirmation modal.
     */
    const handleDeleteModalOpen = () => {
        setDeleteModalOpen(true);
    };

    /**
     * Closes the delete confirmation modal.
     */
    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    /**
     * Handles the deletion of the applicant by sending an HTTP request
     *
     * @param {Applicant} deletedApplicant - Applicant to be deleted.
     */
    const handleDeleteApplicant = async (deletedApplicant: Applicant) => {
        setDeleteModalOpen(false)
        console.log("Applicant to delete: ", deletedApplicant)
        try{
            const response = await fetch(`http://localhost:8000/applicants/${deletedApplicant.applicant_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(deletedApplicant)

            })
            //show the deleted applicant
            if(response.ok){
                onDeleteApplicant()
                console.log("applicant deleted successfully", deletedApplicant)
            } else {
                console.log("Failed to delete applicant. Status: ", response.status)
            }
        }
        catch (e) {
            console.log("Error deleting the applicant...", e)
        }
    }

    /**
     * Opens the edit modal.
     */
    const handleEditModalOpen = () => {
        setEditModalOpen(true);
    };

    /**
     * Closes the edit modal.
     */
    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    /**
     * Saves the edited applicant details by sending an HTTP request
     *
     * @param {Applicant} editedApplicant - Edited applicant details to be saved.
     */
    const handleSaveApplicant = async (editedApplicant: Applicant) => {
        setEditModalOpen(false)
        try{
            const response = await fetch(`http://localhost:8000/applicants/${editedApplicant.applicant_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editedApplicant)

            })
            setApplicant(editedApplicant)
            //show the updated applicant
            !response.ok ?
                console.log("Failed to update applicant. Status: ", response.status)
                :
                console.log("applicant updated successfully",editedApplicant)
        }
        catch (e) {
            console.log("Error updating the applicant...", e)
        }
    }

    /**
     * Toggles the 'liked' status of the applicant.
     */
    const handleLike = () => {
        setLiked(!liked);
    };

    /**
     * Generates initials from the first and last names of the applicant.
     *
     * @param {string} firstName - First name of the applicant.
     * @param {string} lastName - Last name of the applicant.
     * @returns {string} The initials of the applicant.
     */
    const getInitials = (firstName: string, lastName: string): string => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`;
    };

    return(
        <>
            <TableRow hover>
                <TableCell component="th" scope="row">
                    <Avatar sx={{height: "60px", width:"60px"}} onClick={handleEditModalOpen} src={`http://localhost:8000${updatedApplicant.avatar}`}>
                        {!updatedApplicant.avatar && getInitials(updatedApplicant.first_name, updatedApplicant.last_name)}
                    </Avatar>
                </TableCell>
                <TableCell sx={{fontWeight: "bold"}} onClick={handleEditModalOpen}>{updatedApplicant.first_name + " " + updatedApplicant.last_name}</TableCell>
                <TableCell>{updatedApplicant.email}</TableCell>
                <TableCell>{updatedApplicant.position}</TableCell>
                <TableCell >
                    {updatedApplicant.first_name === "Michael"?
                        <FavoriteIcon sx={{ color: 'red', marginLeft:"10px" }}/>
                        : updatedApplicant.first_name === "Toby"?
                            <SentimentVeryDissatisfiedOutlinedIcon sx={{ color: 'black', marginLeft:"10px" }}/>
                        :
                        <IconButton onClick={handleLike} sx={{ color: 'red' }}>
                            {liked?
                                <FavoriteIcon />
                                :
                                <FavoriteBorderOutlinedIcon/>
                            }
                        </IconButton>
                    }
                </TableCell>
                <TableCell>
                    {applicant.first_name !== "Michael" &&
                        <IconButton onClick={handleDeleteModalOpen}>
                            <DeleteForeverOutlinedIcon sx={{color: "#c72828"}}/>
                        </IconButton>
                    }
                </TableCell>
            </TableRow>
            <ApplicantModal applicant={updatedApplicant} open={editModalOpen} onClose={handleCloseEditModal} onSave={handleSaveApplicant}/>
            <DeleteApplicantModal applicant={applicant} open={deleteModalOpen} onClose={handleCloseDeleteModal} onDeleteApplicant={handleDeleteApplicant}/>
        </>

    )
}

export default ApplicantRow