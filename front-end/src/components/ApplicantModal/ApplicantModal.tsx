// ApplicantModal.tsx
import React, { useState, useEffect } from 'react'
import {Modal, Box, Button, TextField, Avatar} from '@mui/material'
import {makeStyles} from "@mui/styles";
import {NewApplicant} from "../SearchBar/AddApplicantModal";

const useStyles = makeStyles({
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

export type Applicant = NewApplicant & {
    applicant_id: number
}

type ApplicantModalProps = {
    applicant: Applicant
    open: boolean
    onClose: () => void
    onSave: (applicant: Applicant) => void
}

const ApplicantModal: React.FC<ApplicantModalProps> = ({ applicant, open, onClose, onSave }) => {
    const [editMode, setEditMode] = useState(false)
    const [editedApplicant, setEditedApplicant] = useState<Applicant>(applicant)
    const [avatar, setAvatar] = useState(applicant.avatar)

    const styles = useStyles()

    useEffect(() => {
        setEditedApplicant(applicant)
        setEditMode(false)
    }, [applicant, open])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setEditedApplicant(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSave = () => {
        if (editedApplicant) {
            onSave(editedApplicant)
            setEditMode(false)
            console.log(editedApplicant)
        }
    }

    const handleEdit = () => {
        setEditMode(true);
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const file = e.target.files[0]
        if(file){
            const fileURL = "/images/"+ file.name
            setAvatar(fileURL)
            setEditedApplicant({...editedApplicant, avatar:fileURL})
        }
    }

    const handleRemovePicture = () => {
        setAvatar(undefined)
        setEditedApplicant({ ...editedApplicant, avatar: undefined });
    }

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
