import React, {useEffect, useState} from "react"
import {Avatar, Box, Button, Modal, TextField} from "@mui/material";
import {makeStyles} from "@mui/styles";

const addApplicantModalStyles = makeStyles({
    addApplicantModal: {
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
    addApplicantAvatar: {
        height: "100px !important",
        width: "100px !important",
        marginBottom: '10px !important',
        fontSize: "42pt !important"
    },
    addApplicantTextField: {
        margin: '10px 0 !important',
        width: '100% !important',
    },
    addApplicantButtonGroup: {
        display: 'flex !important',
        justifyContent: 'space-between !important',
        marginTop: '20px !important',
    },
    addApplicantRemove: {
        fontSize: "10pt !important",
        textDecoration: "underline !important",
        color: "red !important",
    },
    addApplicantChangeRemove: {
        display: "flex !important",
        flexDirection: "column",
        alignItems: 'center !important',
        marginBottom: "30px !important"
    }
});

export type NewApplicant = {
    avatar?: string;
    first_name: string;
    last_name: string;
    email: string;
    position: string;
}

type AddApplicantModalProps = {
    open: boolean
    onClose: () => void
    onAddApplicant: (applicant: NewApplicant) => void
}
const AddApplicantModal: React.FC<AddApplicantModalProps> = ({open, onClose, onAddApplicant}) => {
    const [newApplicant, setNewApplicant] = useState<NewApplicant>({
        avatar: undefined,
        first_name: "",
        last_name: "",
        email:"",
        position:"",
    })
    const [avatar, setAvatar] = useState(newApplicant.avatar)

    const styles = addApplicantModalStyles()

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const file = e.target.files[0]
        if(file){
            const fileURL = "/images/"+ file.name
            setAvatar(fileURL)
            setNewApplicant({...newApplicant, avatar:fileURL})
        }
    }

    const handleRemovePicture = () => {
        setAvatar(undefined)
        setNewApplicant({ ...newApplicant, avatar: undefined });
    }

    const handleSubmit = () => {
        const updatedEmail = newApplicant.first_name + "." + newApplicant.last_name + "@dunder-mifflin.com"
        const updatedNewApplicant = { ...newApplicant, email: updatedEmail }
        if(newApplicant){
            onAddApplicant(updatedNewApplicant)
            resetForm()
            onClose()
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setNewApplicant(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const resetForm = () => {
        handleRemovePicture()
        setNewApplicant({
            first_name: "",
            last_name: "",
            email: "",
            position: "",
        })
    }

    return(
        <Modal open={open} onClose={onClose}>
            <Box className={styles.addApplicantModal}>
                <Avatar src={`http://localhost:8000${avatar}`} className={styles.addApplicantAvatar}>
                    {getInitials(newApplicant?.first_name, newApplicant?.last_name)}
                </Avatar>
                <div className={styles.addApplicantChangeRemove}>
                    <input type="file" accept="image/" id="avatar-change" onChange={handleAvatarChange}/>
                    <Button className={styles.addApplicantRemove} onClick={handleRemovePicture}>remove</Button>
                </div>

                <TextField
                    label="First Name" name="first_name" id="first_name"
                    value={newApplicant.first_name}
                    onChange={handleInputChange}
                    className={styles.addApplicantTextField}
                />
                <TextField
                    label="Last Name" name="last_name"
                    value={newApplicant.last_name}
                    onChange={handleInputChange}
                    className={styles.addApplicantTextField}
                />
                <TextField
                    label="Position" name="position"
                    value={newApplicant.position}
                    onChange={handleInputChange}
                    className={styles.addApplicantTextField}
                />
                <div className={styles.addApplicantButtonGroup}>
                    <Button onClick={handleSubmit}>Add Applicant </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </div>

            </Box>
        </Modal>
    )
}

export default AddApplicantModal