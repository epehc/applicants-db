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
import {Applicant} from "../ApplicantModal/ApplicantModal";
import ApplicantTable from "../ApplicantTable/ApplicantTable";
import {IconButton} from "@mui/material";
import AddApplicantModal, {NewApplicant} from "./AddApplicantModal";

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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%'
    },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const Add = styled("div")(({theme}) => ({
    marginLeft: "auto",
    borderRadius: theme.shape.borderRadius,
    fontSize: "12pt",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
}))


const SearchAppBar = () => {
    const [applicants, setApplicants] = useState<Applicant[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredApplicants, setFilteredApplicants] = useState<Applicant[]>([])
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const fetchData = async () =>{
        try{
            const response = await fetch(`http://localhost:8000/applicants/`)
            if(!response.ok){
                throw new Error("Network response not ok.")
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
                throw new Error("Network response not ok")
            }
        }
        catch (e) {
            console.log("Error adding the applicant...", e)
        }
    }

    const handleAddClick= () =>{
        setIsAddModalOpen(true)
    }

    useEffect(() => {
        fetchData()
    }, [])

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
                    <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 0.05 }}>Applicants-DB</Typography>
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
            <ApplicantTable applicants={filteredApplicants} />
        </Box>
    );
}

export default SearchAppBar