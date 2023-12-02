import React, {useState} from "react"
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

/**
 * Represents the structure of a new applicant.
 */
export type NewApplicant = {
    avatar?: string;
    first_name: string;
    last_name: string;
    email: string;
    position: string;
}

/**
 * Props for AddApplicantModal component.
 */
type AddApplicantModalProps = {
    open: boolean
    onClose: () => void
    onAddApplicant: (applicant: NewApplicant) => void
}

/**
 * Modal component for adding a new applicant.
 *
 * @param {AddApplicantModalProps} props - Props for the component.
 * @returns {React.ReactElement} A modal element for adding new applicants.
 */
const AddApplicantModal: React.FC<AddApplicantModalProps> = ({open, onClose, onAddApplicant}) => {
    /**
    * State for managing the new applicant's details.
    */
    const [newApplicant, setNewApplicant] = useState<NewApplicant>({
        avatar: undefined,
        first_name: "",
        last_name: "",
        email:"",
        position:"",
    })

    /**
     * State for managing the avatar URL.
     */
    const [avatar, setAvatar] = useState(newApplicant.avatar)

    const styles = addApplicantModalStyles()

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
            setNewApplicant({...newApplicant, avatar:fileURL})
        }
    }

    /**
     * Removes the selected avatar.
     */
    const handleRemovePicture = () => {
        setAvatar(undefined)
        setNewApplicant({ ...newApplicant, avatar: undefined });
    }

    /**
     * Submits the new applicant's data.
     * Generates the Email Address based on the first and last name
     */
    const handleSubmit = () => {
        const updatedEmail = newApplicant.first_name + "." + newApplicant.last_name + "@dunder-mifflin.com"
        const updatedNewApplicant = { ...newApplicant, email: updatedEmail }
        if(newApplicant){
            onAddApplicant(updatedNewApplicant)
            resetForm()
            onClose()
        }
    }

    /**
     * Handles input changes and updates the state.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event object.
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setNewApplicant(prev => ({
            ...prev,
            [name]: value
        }))
    }

    /**
     * Resets the form to its initial state.
     */
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
                    label="First Name" name="first_name"
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