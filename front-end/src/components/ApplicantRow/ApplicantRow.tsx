import React, {useState} from "react"
import {TableRow, TableCell, Avatar, IconButton} from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite'
import ApplicantModal, {Applicant} from "../ApplicantModal/ApplicantModal"
import {makeStyles} from "@mui/styles";


type ApplicantRowProps = {
    applicant: Applicant
}

const useStyles = makeStyles({
    highlightedName:{
        "& .MuiTableCell-root":{
            fontWeight: 700
        }

}
})

const ApplicantRow: React.FC<ApplicantRowProps> = ({applicant}) => {

    const [likes, setLikes] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)
    const [updatedApplicant, setApplicant] = useState(applicant)

    const styles = useStyles()

    const handleOpenModal = () => {
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    const handleSaveApplicant = async (editedApplicant: Applicant) => {
        setModalOpen(false)
        try{
            const response = await fetch('http://localhost:8000/applicants/$(editedApplicant.applicant_id}', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editedApplicant)

            })
            setApplicant(editedApplicant)
            //show the updated applicant
            console.log("applicant updated successfuly",editedApplicant)
            if(!response.ok){
                throw new Error("Network response not ok")
            }
        }
        catch (e) {
            console.log("Error updating the applicant...", e)
        }
    }

    const handleLike = () => {
        setLikes(likes + 1)
    }
    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`
    }
    return(
        <>
            <TableRow hover>
                <TableCell component="th" scope="row">
                    <Avatar sx={{height: "60px", width:"60px"}} onClick={handleOpenModal} src={`http://localhost:8000${updatedApplicant.avatar}`}>
                        {!updatedApplicant.avatar && getInitials(updatedApplicant.first_name, updatedApplicant.last_name)}
                    </Avatar>
                </TableCell>
                <TableCell sx={{fontWeight: "bold"}} onClick={handleOpenModal}>{updatedApplicant.first_name + " " + updatedApplicant.last_name}</TableCell>
                <TableCell>{updatedApplicant.email}</TableCell>
                <TableCell>{updatedApplicant.position}</TableCell>
                <TableCell>
                    <IconButton onClick={handleLike} style={{ color: 'red' }}>
                        <FavoriteIcon />
                    </IconButton>
                    {likes}
                </TableCell>
            </TableRow>
            <ApplicantModal applicant={updatedApplicant} open={modalOpen} onClose={handleCloseModal} onSave={handleSaveApplicant}/>
        </>

    )
}

export default ApplicantRow