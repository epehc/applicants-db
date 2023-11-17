import React, {useState} from "react";
import {TableRow, TableCell, Avatar, IconButton} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ApplicantModal, {Applicant} from "./ApplicantModal";

type ApplicantRowProps = {
    applicant: Applicant
}

const ApplicantRow: React.FC<ApplicantRowProps> = ({applicant}) => {

    const [likes, setLikes] = useState(applicant.likes)

    const [modalOpen, setModalOpen] = useState(false)

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSaveApplicant = (updatedApplicant: Applicant) => {
        setModalOpen(false);
    };

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
                    <Avatar onClick={handleOpenModal} src={`http://localhost:8000${applicant.avatar}`}>
                        {!applicant.avatar && getInitials(applicant.first_name, applicant.last_name)}
                    </Avatar>
                </TableCell>
                <TableCell onClick={handleOpenModal}>{applicant.first_name}</TableCell>
                <TableCell onClick={handleOpenModal}>{applicant.last_name}</TableCell>
                <TableCell>{applicant.email}</TableCell>
                <TableCell>{applicant.position}</TableCell>
                <TableCell>
                    <IconButton onClick={handleLike} style={{ color: 'red' }}>
                        <FavoriteIcon />
                    </IconButton>
                    {likes}
                </TableCell>
            </TableRow>
            <ApplicantModal applicant={applicant} open={modalOpen} onClose={handleCloseModal} onSave={handleSaveApplicant}/>
        </>

    )
}

export default ApplicantRow