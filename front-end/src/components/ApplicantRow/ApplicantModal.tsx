// ApplicantModal.tsx
import React, { useState, useEffect } from 'react'
import {Modal, Box, Button, TextField, Avatar} from '@mui/material'
import {makeStyles} from "@mui/styles";
import {NewApplicant} from "../SearchAppBar/AddApplicantModal";

const applicantModalStyles = makeStyles({
    applicantModal: {
        borderRadius: "1.5rem",
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        boxShadow: "24",
        backgroundColor: 'white',
        padding: '20px',
        outline: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    applicantModalAvatar: {
        height: "100px !important",
        width: "100px !important",
        marginBottom: '10px !important',
        fontSize: "42pt !important"

    },
    applicantModalTextField: {
        margin: '10px 0 !important',
        width: '100% !important',
    },
    applicantModalButtonGroup: {
        display: 'flex !important',
        justifyContent: 'space-between !important',
        marginTop: '20px',
    },
    applicantModalRemove: {
        fontSize: "10pt !important",
        textDecoration: "underline !important",
        color: "red !important",
    },
    applicantModalChangeRemove: {
        display: "flex !important",
        flexDirection: "column",
        alignItems: 'center !important',
        marginBottom: "30px !important"
    }
});

/**
 * Represents the extended structure of an applicant including the applicant ID.
 * @extends NewApplicant
 * @property {number} applicant_id - Unique identifier for the applicant.
 */
export type Applicant = NewApplicant & {
    applicant_id: number
}

/**
 * Props for ApplicantModal component.
 * @property {Applicant} applicant - The applicant data to display and edit.
 * @property {boolean} open - Determines if the modal is open.
 * @property {Function} onClose - Function to call when closing the modal.
 * @property {Function} onSave - Function to call when saving the edited applicant.
 */
type ApplicantModalProps = {
    applicant: Applicant
    open: boolean
    onClose: () => void
    onSave: (applicant: Applicant) => void
}

/**
 * Modal component for viewing and editing an applicant's details.
 *
 * @param {ApplicantModalProps} props - Props for the component.
 * @returns {React.ReactElement} A modal element for viewing and editing applicant details.
 */
const ApplicantModal: React.FC<ApplicantModalProps> = ({ applicant, open, onClose, onSave }) => {
    /**
     * State indicating whether the modal is in edit mode.
     */
    const [editMode, setEditMode] = useState(false)
    /**
     * State for managing the currently edited applicant's details.
     */
    const [editedApplicant, setEditedApplicant] = useState<Applicant>(applicant)
    /**
     * State for managing the avatar URL.
     */
    const [avatar, setAvatar] = useState(applicant.avatar)

    const styles = applicantModalStyles()

    useEffect(() => {
        // Resets the edited applicant when the modal opens or the applicant changes.
        setEditedApplicant(applicant)
        setEditMode(false)
    }, [applicant, open])

    /**
     * Handles input changes and updates the edited applicant's state.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event object.
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setEditedApplicant(prev => ({
            ...prev,
            [name]: value
        }))
    }

    /**
     * Handles the saved changes.
     */
    const handleSave = () => {
        if (editedApplicant) {
            onSave(editedApplicant)
            setEditMode(false)
            console.log(editedApplicant)
        }
    }

    /**
     * Handles going into edit mode
     */
    const handleEdit = () => {
        setEditMode(true);
    }

    /**
     * Handles avatar change event.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event object.
     */
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const file = e.target.files[0]
        if(file){
            const fileURL = "/images/"+ file.name
            setAvatar(fileURL)
            setEditedApplicant({...editedApplicant, avatar:fileURL})
        }
    }

    /**
     * Removes the selected avatar.
     */
    const handleRemovePicture = () => {
        setAvatar(undefined)
        setEditedApplicant({ ...editedApplicant, avatar: undefined });
    }

    /**
     * Generates initials from the first and last names.
     *
     * @param {string} firstName - First name of the applicant.
     * @param {string} lastName - Last name of the applicant.
     * @returns {string} The initials of the applicant.
     */
    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box className={styles.applicantModal}>
                <Avatar src={`http://localhost:8000${avatar}`} className={styles.applicantModalAvatar}>
                    {!editedApplicant.avatar && getInitials(editedApplicant.first_name, editedApplicant.last_name)}
                </Avatar>
                {editMode &&
                    <div className={styles.applicantModalChangeRemove}>
                        <input type="file" accept="image/" id="avatar-change" onChange={handleAvatarChange}/>
                        <Button className={styles.applicantModalRemove} onClick={handleRemovePicture}>remove</Button>
                    </div>
                }

                <TextField  label="First Name" name="first_name" value={editedApplicant.first_name}
                           onChange={handleInputChange} className={styles.applicantModalTextField} InputProps={{
                        readOnly: !editMode,
                    }  }/>

                <TextField  label="Last Name" name="last_name" value={editedApplicant.last_name}
                    onChange={handleInputChange} className={styles.applicantModalTextField} InputProps={{
                        readOnly: !editMode,
                    }  }/>

                <TextField  label="Email" name="email" value={editedApplicant.email}
                    onChange={handleInputChange} className={styles.applicantModalTextField} InputProps={{
                        readOnly: !editMode,
                    }  }/>

                <TextField label="Position" name="position" value={editedApplicant.position}
                    onChange={handleInputChange} className={styles.applicantModalTextField} InputProps={{
                        readOnly: !editMode,
                    }  }/>

                <div className={styles.applicantModalButtonGroup}>
                    {editMode ? (<Button onClick={handleSave}>Save</Button>)
                        : (<Button onClick={handleEdit}>Edit</Button>)}
                    <Button onClick={onClose}>Cancel</Button>
                </div>
            </Box>
        </Modal>
    )
}

export default ApplicantModal
