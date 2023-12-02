import React, {useState} from "react";
import {Table, TableBody, TableHead, TableCell, TableRow, Paper, TableContainer, TablePagination, styled,} from "@mui/material";
import ApplicantRow from "../ApplicantRow/ApplicantRow";
import {Applicant} from "../ApplicantRow/ApplicantModal";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

/**
 * Props for ApplicantTable component.
 * @property {Applicant[]} applicants - Array of applicants to display in the table.
 * @property {Function} onDeleteApplicant - Function to call when an applicant is deleted.
 */
type ApplicantTableProps = {
    applicants: Applicant[]
    onDeleteApplicant: () => void
}

/**
 * Styled TableCell component with custom styling.
 */
const StyledTableCell = styled(TableCell)({
    fontWeight: "bolder",
    textDecoration: "underline",
})

/**
 * Component representing a table of applicants.
 *
 * @param {ApplicantTableProps} props - Props for the component.
 * @returns {React.ReactElement} A table element displaying applicants.
 */
const ApplicantTable: React.FC<ApplicantTableProps> = ({ applicants, onDeleteApplicant }) => {
    /**
     * State for managing the current page of the table.
     */
    const [page, setPage] = useState(0);

    /**
     * State for managing the number of rows per page in the table.
     */
    const [rowsPerPage, setRowsPerPage] = useState(8);

    /**
     * Handles changes to the current page.
     *
     * @param {unknown} _event - The event object (unused).
     * @param {number} newPage - The new page number.
     */
    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    /**
     * Handles changes to the number of rows per page.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event - The event object.
     */
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page
    };

    /**
     * Wrapper function to handle the deletion of an applicant.
     */
    const handleDeleteApplicant = () => {
        onDeleteApplicant();
    };
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
                            <StyledTableCell>Liked</StyledTableCell>
                            <StyledTableCell sx={{ paddingLeft:"25px"}}>
                                    <DeleteOutlineOutlinedIcon sx={{color:"#c72828"}}/>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applicants.sort((a,b)=> a.applicant_id < b.applicant_id? -1 : 1)
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((applicant) => (
                            <ApplicantRow key={applicant.applicant_id} applicant={applicant} onDeleteApplicant={handleDeleteApplicant}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[8, 12]}
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
