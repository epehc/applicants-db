// ApplicantModal.tsx
import React, { useState, useEffect } from 'react'
import {Modal, Box, Button, TextField, Avatar} from '@mui/material'
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    modal: {
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
    avatar: {
        height: "100px",
        width: "100px",
        marginBottom: '10px',
        fontSize: "42pt"
    },
    inputField: {
        margin: '10px 0',
        width: '100%',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    remove: {
        fontSize: "10pt",
        textDecoration: "underline",
        color: "red",
    },
    changeRemove: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        marginBottom: "30px"
    }
});

export type Applicant = {
    applicant_id: number
    first_name: string
    last_name: string
    email: string
    position: string
    avatar?: string
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

    // @ts-ignore
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
            <Box className={styles.modal}>
                <Avatar src={`http://localhost:8000${avatar}`} className={styles.avatar}>
                    {!editedApplicant.avatar && getInitials(editedApplicant.first_name, editedApplicant.last_name)}
                </Avatar>
                {editMode &&
                    <div className={styles.changeRemove}>
                        <input type="file" accept="image/" id="avatar-change" onChange={handleAvatarChange}/>
                        <Button className={styles.remove} onClick={handleRemovePicture}>remove</Button>
                    </div>
                }

                <TextField
                    label="First Name" name="first_name"
                    value={editedApplicant.first_name}
                    onChange={handleInputChange}
                    className={styles.inputField}
                    InputProps={{
                        readOnly: !editMode,
                    }  }
                />
                <TextField
                    label="Last Name" name="last_name"
                    value={editedApplicant.last_name}
                    onChange={handleInputChange}
                    className={styles.inputField}
                    InputProps={{
                        readOnly: !editMode,
                    }  }
                />
                <TextField label="Email" name="email"
                    value={editedApplicant.email}
                    onChange={handleInputChange}
                    className={styles.inputField}
                    InputProps={{
                        readOnly: !editMode,
                    }  }
                />
                <TextField
                    label="Position" name="position"
                    value={editedApplicant.position}
                    onChange={handleInputChange}
                    className={styles.inputField}
                    InputProps={{
                        readOnly: !editMode,
                    }  }
                />
                <div className={styles.buttonGroup}>
                    {editMode ? (
                        <Button onClick={handleSave}>Save</Button>
                    ) : (
                        <Button onClick={handleEdit}>Edit</Button>
                    )}
                    <Button onClick={onClose}>Cancel</Button>
                </div>

            </Box>
        </Modal>
    )
}

export default ApplicantModal
