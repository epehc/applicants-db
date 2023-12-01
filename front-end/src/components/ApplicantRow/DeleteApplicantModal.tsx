import React from 'react'
import {Modal, Box, Button} from '@mui/material'
import {makeStyles} from "@mui/styles";
import {Applicant} from "./ApplicantModal";
import Typography from "@mui/material/Typography";

const deleteApplicantModalStyles = makeStyles({
    deleteApplicantModal: {
        borderRadius: "1.5rem !important",
        position: 'absolute',
        top: '50% !important',
        left: '50% !important',
        transform: 'translate(-50%, -50%)  !important',
        width: "auto",
        boxShadow: "24 !important",
        backgroundColor: 'white !important',
        padding: '20px !important',
        outline: 'none !important',
        display: 'flex !important',
        flexDirection: 'column',
        alignItems: 'center !important',
    },
    deleteApplicantButtonGroup: {
        display: 'flex !important',
        justifyContent: 'space-between !important',
        marginTop: '20px',
    },
    deleteApplicantModalDelete: {
        textDecoration: "underline !important",
        color: "red !important",
    }
});

/**
 * Props for DeleteApplicantModal component.
 * @property {Applicant} applicant - The applicant to be deleted.
 * @property {boolean} open - Controls the visibility of the modal.
 * @property {Function} onClose - Function to call when closing the modal.
 * @property {Function} onDeleteApplicant - Function to call for deleting the applicant.
 */
type DeleteApplicantModalProps = {
    applicant: Applicant
    open: boolean
    onClose: () => void
    onDeleteApplicant: (applicant: Applicant) => void
}

/**
 * Modal component for confirming the deletion of an applicant.
 *
 * @param {DeleteApplicantModalProps} props - Props for the component.
 * @returns {React.ReactElement} A modal element for confirming applicant deletion.
 */
const DeleteApplicantModal: React.FC<DeleteApplicantModalProps> = ({applicant, open, onClose, onDeleteApplicant}) => {

    const styles = deleteApplicantModalStyles()

    /**
     * Handles the deletion of the applicant.
     */
    const handleDelete = () => {
        onDeleteApplicant(applicant)
    }

    return(
        <Modal open={open} onClose={onClose} >
            <Box className={styles.deleteApplicantModal}>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 0.05 }}>Are you sure you want to delete this applicant?</Typography>
                <div className={styles.deleteApplicantButtonGroup}>
                    <Button className={styles.deleteApplicantModalDelete} onClick={handleDelete}>Delete</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </div>
            </Box>
        </Modal>
    )

}

export default DeleteApplicantModal