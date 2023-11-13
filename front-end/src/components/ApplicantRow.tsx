import React from "react";
import {TableRow, TableCell, Avatar} from "@mui/material";
import { CheckCircleOutline as CheckCircleOutlineIcon, HighlightOff as HighlightOffIcon } from '@mui/icons-material';



type ApplicantRowProps = {
    applicant: {
        id: number
        avatar?: string
        first_name: string
        last_name: string
        email: string
        position: string
        liked: boolean
    }
    onRowClick: (applicantId: number) => void
}

const ApplicantRow: React.FC<ApplicantRowProps> = ({applicant, onRowClick}) => {
    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`
    }
    return(
        <TableRow hover onClick={() => onRowClick(applicant.id)}>
            <TableCell component="th" scope="row">
                <Avatar alt={`${applicant.first_name} ${applicant.last_name}`} src={applicant.avatar} />
                {!applicant.avatar && getInitials(applicant.first_name, applicant.last_name)}
            </TableCell>
            <TableCell>{applicant.first_name}</TableCell>
            <TableCell>{applicant.last_name}</TableCell>
            <TableCell>{applicant.email}</TableCell>
            <TableCell>{applicant.position}</TableCell>
            {applicant.liked ? <CheckCircleOutlineIcon color="success" /> : <HighlightOffIcon color="error" />}
        </TableRow>
    )
}

export default ApplicantRow