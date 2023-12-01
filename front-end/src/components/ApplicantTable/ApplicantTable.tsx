import React, {useState} from "react";
import {Table, TableBody, TableHead, TableCell, TableRow, Paper, TableContainer, TablePagination, styled,} from "@mui/material";
import ApplicantRow from "../ApplicantRow/ApplicantRow";
import {Applicant} from "../ApplicantModal/ApplicantModal";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


type ApplicantTableProps = {
    applicants: Applicant[]
}

const StyledTableCell = styled(TableCell)({
    fontWeight: "bolder",
    textDecoration: "underline",
})

const ApplicantTable: React.FC<ApplicantTableProps> = ({applicants}) => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    return(
        <Paper elevation={14}
            sx={{
                padding: '16px',
                backgroundColor: '#f3f3f3',
        }}>
            <TableContainer>
                <Table >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Picture</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Position</StyledTableCell>
                            <StyledTableCell>Likes</StyledTableCell>
                            <StyledTableCell>
                                    <DeleteOutlineOutlinedIcon sx={{color:"#c72828"}}/>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applicants.sort((a,b)=> a.applicant_id < b.applicant_id? -1 : 1)
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((applicant) => (
                            <ApplicantRow key={applicant.applicant_id} applicant={applicant}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 8]}
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