import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {useEffect, useState} from "react";
import {Applicant} from "../ApplicantModal/ApplicantModal";
import ApplicantTable from "../ApplicantTable/ApplicantTable";

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


const SearchAppBar = () => {
    const [applicants, setApplicants] = useState<Applicant[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredApplicants, setFilteredApplicants] = useState<Applicant[]>([])


    useEffect(() => {
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
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 0.05 }}>Applicants-DB</Typography>
                    <form onSubmit={handleSearchSubmit}>
                        <Search>
                            <SearchIconWrapper> <SearchIcon /> </SearchIconWrapper>
                            <StyledInputBase value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search…" inputProps={{ 'aria-label': 'search' }}/>
                        </Search>
                    </form>
                </Toolbar>
            </AppBar>
            <ApplicantTable applicants={filteredApplicants} />
        </Box>
    );
}

export default SearchAppBar