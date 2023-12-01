import React, {useState} from "react"
import {TableRow, TableCell, Avatar, IconButton} from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite'
import ApplicantModal, {Applicant} from "./ApplicantModal"
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import DeleteApplicantModal from "./DeleteApplicantModal";

type ApplicantRowProps = {
    applicant: Applicant
    onDeleteApplicant: () => void
}


const ApplicantRow: React.FC<ApplicantRowProps> = ({applicant, onDeleteApplicant}) => {

    const [liked, setLiked] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [updatedApplicant, setApplicant] = useState(applicant)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const handleDeleteModalOpen = () => {
        setDeleteModalOpen(true)
    }

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false)
    }

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
                console.log("applicant deleted successfuly", deletedApplicant)
            } else {
                console.log("Failed to delete applicant. Status: ", response.status)
            }
        }
        catch (e) {
            console.log("Error deleting the applicant...", e)
        }
    }

    const handleEditModalOpen = () => {
        setEditModalOpen(true)
    }

    const handleCloseEditModal = () => {
        setEditModalOpen(false)
    }

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
                console.log("applicant updated successfuly",editedApplicant)
        }
        catch (e) {
            console.log("Error updating the applicant...", e)
        }
    }

    const handleLike = () => {
        setLiked(!liked)
    }

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`
    }

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