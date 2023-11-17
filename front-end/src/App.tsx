import React from 'react';
import Container from '@mui/material/Container';
import ApplicantTable from './components/ApplicantTable';

// Dummy data for applicants

/*const applicants = [
    {
        id: 1,
        avatar: MichaelScott,
        first_name: "Michael",
        last_name: "Scott",
        email: "michael.scott@dunder-mifflin.com",
        position: "Regional Manager",
        likes: 0,
    },
    {
        id: 2,
        avatar: PamBeesly,
        first_name: "Pam",
        last_name: "Beesly",
        email: "pam.beesly@dunder-mifflin.com",
        position: "Receptionist",
        likes: 0,
    },
    {
        id: 3,
        avatar: JimHalpert,
        first_name: "Jim",
        last_name: "Halpert",
        email: "michael.scott@dunder-mifflin.com",
        position: "Salesman",
        likes: 0,
    },
    {
        id: 4,
        avatar: DwightSchrute,
        first_name: "Dwight",
        last_name: "Schrute",
        email: "dwight.schrute@dunder-mifflin.com",
        position: "Salesman",
        likes: 0,
    },
    {
        id: 5,
        first_name: "Toby",
        last_name: "Flenderson",
        email: "toby.flanderson@dunder-mifflin.com",
        position: "HR Representative",
        likes: -15,
    }
    // ... more applicant data
];*/

function App() {
    const handleApplicantSelect = (applicantId: number) => {
        // Placeholder function to handle applicant selection, like opening a modal
        console.log('Applicant selected:', applicantId);
    };


    return (
        <Container maxWidth="xl">
            <h1>Applicants</h1>
            <ApplicantTable />
        </Container>
    );
}

export default App;
