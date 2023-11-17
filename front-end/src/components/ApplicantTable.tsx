import React, {useEffect, useState} from "react";
import {Table, TableBody, TableHead, TableCell, TableRow, Paper, TableContainer, TablePagination} from "@mui/material";
import ApplicantRow from "./ApplicantRow";

type Applicant = {
    id: number
    avatar?: string
    first_name: string
    last_name: string
    email: string
    position: string
    likes: number
}

type ApplicantTableProps = {
    applicants: Applicant[]
    onApplicantSelect: (applicantId: number) => void
}

const ApplicantTable = () => {

    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    useEffect(() => {
        const fetchData = async () =>{
            try{
                const response = await fetch("http://localhost:8000/applicants/")
                if(!response.ok){
                    throw new Error("Network response not ok.")
                }
                const data = await response.json()
                console.log(data)
                setApplicants(data)
            }
            catch (e) {
                console.error('Fetch error:', e)
            }
        }
        fetchData()
    }, [])

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    return(
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Picture</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Likes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applicants.map((applicant) => (
                            <ApplicantRow key={applicant.id} applicant={applicant}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={applicants.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>

    )
}

export default ApplicantTable
