// ApplicantModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal, Typography, Box, Button, TextField } from '@mui/material';

export type Applicant = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    position: string;
    likes: number;
    avatar?: string;
};

type ApplicantModalProps = {
    applicant: Applicant;
    open: boolean;
    onClose: () => void;
    onSave: (applicant: Applicant) => void;
};

const ApplicantModal: React.FC<ApplicantModalProps> = ({ applicant, open, onClose, onSave }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedApplicant, setEditedApplicant] = useState<Applicant>(applicant);

    useEffect(() => {
        setEditedApplicant(applicant);
        setEditMode(false);
    }, [applicant, open]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setEditedApplicant(prev => ({
            ...prev,
            [name]: value
        }));
    };



    const handleSave = () => {
        if (editedApplicant) {
            onSave(editedApplicant);
            setEditMode(false);
        }
    };

    if (!applicant) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: 20 }}>
                {editMode ? (
                    <div>
                        <TextField label="First Name" name="first_name" value={editedApplicant.first_name} onChange={handleInputChange} />
                        <TextField label="Last Name" name="last_name" value={editedApplicant.last_name} onChange={handleInputChange} />
                        <TextField label="Email" name="email" value={editedApplicant.email} onChange={handleInputChange} />
                        <TextField label="Position" name="position" value={editedApplicant.position} onChange={handleInputChange} />
                        <Button onClick={handleSave}>Save</Button>
                    </div>
                ) : (
                    <div>
                        <Typography variant="h6">{`${applicant.first_name} ${applicant.last_name}`}</Typography>
                        <Typography variant="subtitle1">{applicant.email}</Typography>
                        <Typography variant="subtitle1">{applicant.position}</Typography>
                        <Button onClick={() => setEditMode(true)}>Edit</Button>
                    </div>
                )}
                <Button onClick={onClose}>Close</Button>
            </Box>
        </Modal>
    );
};

export default ApplicantModal;
