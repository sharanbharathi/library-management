import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name,
  image,
  age,
  phone,
  address,
  joindate,
  books,
  fee,
  id
) {
  return { name, image, age, phone, address, joindate, books, fee, id };
}

function Members(props) {
  let rows = [];
  const navigate = useNavigate();

  function fetch() {
    axios
      .get('https://636c8f127f47ef51e14ba6ab.mockapi.io/members')
      .then((res) => {
        props.addMembers(res.data);
      })
      .catch((err) => toast.error('check your internet connection'));
  }
  React.useEffect(() => {
    fetch();
  }, []);
  if (props.members.length != 0) {
    const setData = props.members.map((person) => {
      return createData(
        person.name,
        person.image,
        person.age,
        person.phone,
        person.address,
        person.joindate,
        person.books,
        person.fee,
        person.id
      );
    });
    rows = setData;
  }

  const handleDelete = (id) => {
    axios
      .delete(`https://636c8f127f47ef51e14ba6ab.mockapi.io/members/${id}`)
      .then((res) => {
        fetch();
        toast.success('Successfully Deleted');
      });
  };
  const handleUpdate = (id) => {
    navigate(`/add-members/${id}`);
  };
  return rows.length !== 0 ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Members Name</StyledTableCell>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell align="right">Age</StyledTableCell>
            <StyledTableCell align="right">Phone</StyledTableCell>
            <StyledTableCell align="right">Address</StyledTableCell>
            <StyledTableCell align="right">JoinDate</StyledTableCell>
            <StyledTableCell align="right">Books have</StyledTableCell>
            <StyledTableCell align="right">Fee</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell>
                <img src={row.image}></img>
              </StyledTableCell>
              <StyledTableCell align="right">{row.age}</StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              <StyledTableCell align="right">{row.address}</StyledTableCell>
              <StyledTableCell align="right">{row.joindate}</StyledTableCell>
              <StyledTableCell align="right">{row.books}</StyledTableCell>
              <StyledTableCell align="right">{row.fee}</StyledTableCell>
              <StyledTableCell align="right">
                <Button color="error" onClick={() => handleDelete(row.id)}>
                  del
                </Button>
                <Button onClick={() => handleUpdate(row.id)}>Update</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <CircularProgress />
  );
}
const mapStateToProps = (state) => ({
  members: state.MembersReducers,
});
const mapDispatchToProps = (dispatch) => ({
  addMembers: (data) => {
    dispatch({ type: 'Add_Members', payload: data });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Members);
