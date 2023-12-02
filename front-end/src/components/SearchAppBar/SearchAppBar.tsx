import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import {useEffect, useState} from "react";
import {Applicant} from "../ApplicantRow/ApplicantModal";
import ApplicantTable from "../ApplicantTable/ApplicantTable";
import {IconButton} from "@mui/material";
import AddApplicantModal, {NewApplicant} from "./AddApplicantModal";

/**
 * Styled component for the search area in the AppBar.
 * It includes styles for position, background, and hover effects.
 */
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 10,
    width: '300px',
}));

/**
 * Styled InputBase component for the search input.
 * It includes styles for color, padding, and transitions.
 */
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%'
    },
}));

/**
 * Wrapper for the SearchIcon with specific styling.
 * It includes styles for padding, positioning, and alignment.
 */
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

/**
 * Styled component for the 'Add New' area in the AppBar.
 * It includes styles for margins, border-radius, font-size, and hover effects.
 */
const Add = styled("div")(({theme}) => ({
    marginLeft: "auto",
    borderRadius: theme.shape.borderRadius,
    fontSize: "12pt",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
}));


/**
 * SearchAppBar component for managing applicant data and interactions.
 * It includes search functionality, adding new applicants, and a list of existing applicants.
 */
const SearchAppBar = () => {
    /**
     * State for storing all applicants.
     */
    const [applicants, setApplicants] = useState<Applicant[]>([]);

    /**
     * State for handling the search term.
     */
    const [searchTerm, setSearchTerm] = useState("");

    /**
     * State for storing filtered applicants based on the search term.
     */
    const [filteredApplicants, setFilteredApplicants] = useState<Applicant[]>([]);

    /**
     * State for managing the visibility of the Add Applicant modal.
     */
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    /**
     * Fetches applicants from the server and updates the state.
     */
    const fetchData = async () =>{
        try{
            const response = await fetch(`http://localhost:8000/applicants/`)
            if(!response.ok){
                console.log("Failed to fetch data. Status: ", response.status)
            }
            const data = await response.json()
            console.log(data)
            setApplicants(data)
            setFilteredApplicants(data)
            console.log("applicants: ", applicants)
        }
        catch (e) {
            console.error('Fetch error:', e)
        }
    }

    /**
     * Handles adding a new applicant.
     *
     * @param {NewApplicant} applicantData - The data of the new applicant to be added.
     */
    const handleAddApplicant = async (applicantData: NewApplicant) => {
        setIsAddModalOpen(false)
        try{
            const response = await fetch('http://localhost:8000/applicants/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(applicantData)

            })
            //show the new applicant
            console.log("applicant posted successfuly", applicantData)
            await fetchData()

            if(!response.ok){
                console.log("Failed to post applicant. Status: ", response.status)
            }
        }
        catch (e) {
            console.log("Error adding the applicant...", e)
        }
    }

    /**
     * Updates the list of applicants after deletion.
     */
    const handleDeleteApplicant = () => {
        fetchData()
    }
    /**
     * Handles the click event to open the Add Applicant modal.
     */
    const handleAddClick = () => {
        setIsAddModalOpen(true);
    };

    // Fetch applicants on component mount
    useEffect(() => {
        fetchData();
    }, []);

    /**
     * Handles the submission of the search form.
     * Filters applicants based on the search term.
     *
     * @param {{ preventDefault: () => void; }} e - The event object.
     */
    const handleSearchSubmit = (e: { preventDefault: () => void; }) =>{
        e.preventDefault()

        const searchQuery = searchTerm.trim().toLowerCase()

        const filtered = applicants.filter(
            applicant =>
                applicant.first_name.toLowerCase().includes(searchQuery) ||
                applicant.last_name.toLowerCase().includes(searchQuery) ||
                applicant.position.toLowerCase().includes(searchQuery) ||
                applicant.email.toLowerCase().includes(searchQuery))

        setFilteredApplicants(searchQuery === "" ? applicants : filtered)
    }

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 0.05 }}>Dunder Mifflin-DB</Typography>
                    <form onSubmit={handleSearchSubmit}>
                        <Search>
                            <SearchIconWrapper> <SearchIcon /> </SearchIconWrapper>
                            <StyledInputBase value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search…" inputProps={{ 'aria-label': 'search' }}/>
                        </Search>
                    </form>
                    <Add>
                        <IconButton color="inherit" onClick={handleAddClick}>
                            <AddIcon /> <Typography sx={{fontSize: "12pt"}} >Add New</Typography>
                        </IconButton>
                    </Add>
                </Toolbar>
            </AppBar>
            <AddApplicantModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddApplicant={handleAddApplicant}/>
            <ApplicantTable applicants={filteredApplicants} onDeleteApplicant={handleDeleteApplicant} />
        </Box>
    );
}

export default SearchAppBar