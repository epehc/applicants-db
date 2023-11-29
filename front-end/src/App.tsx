import React from 'react';
import Container from '@mui/material/Container';
import SearchAppBar from "./components/SearchBar/SearchAppBar";

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

    return (
        <Container maxWidth="xl">
            <SearchAppBar/>
        </Container>
    );
}

export default App;
