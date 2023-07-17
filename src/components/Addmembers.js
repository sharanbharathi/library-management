import { Button, Divider, Paper, TextField } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AddMembers.css';

const Addmembers = (props) => {
  const [data, setData] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (data === undefined && id !== undefined) {
      props.viewUpdate(id).then((e) => {
        setData(e);
      });
    }
  });

  function init() {
    if (data !== undefined) {
      return data;
    } else {
      return {
        name: '',
        image: '',
        age: '',
        phone: '',
        address: '',
        joindate: '',
        books: '',
        fee: '',
      };
    }
  }

  const formik = useFormik({
    // this will control the formic onsubmit function
    initialValues: init(),
    enableReinitialize: data,
    onSubmit: (values) => {
      if (id) {
        props.update(values);
        navigate('/members');
      } else {
        props.create(values);
        navigate('/members');
      }
    },
    validate: (values) => {
      //formic error validation
      let { name, image, age, books, joindate, phone, address, fee } = values;
      let errors = {};
      if (!name) {
        errors.name = 'Name is Required.';
      } else if (name.length < 3) {
        errors.name = 'Name is invalid';
      }
      if (!image) {
        errors.image = 'Image is Required.';
      } else if (image.length < 15) {
        errors.image = 'Enter a valid image link!';
      }
      if (!age) {
        errors.age = 'Age is Required.';
      } else if (age <= 10) {
        errors.age = 'Age should be above 10';
      }
      if (!phone) {
        errors.phone = 'phone number is Required.';
      } else if (phone.length < 10) {
        errors.phone = 'Enter your 10 digit phone number';
      }
      if (!address) {
        errors.address = 'Address is Required.';
      } else if (address.length <= 10) {
        errors.address = 'Enter your detailed address';
      }
      if (!joindate) {
        errors.joindate = 'Date is Required.';
      } else if (joindate.length < 10) {
        errors.joindate = 'Format like DD-MM-YYYY';
      }
      if (!books) {
        errors.books = 'Books is Required.';
      } else if (books === 0) {
        errors.books = 'Enter valid data';
      }
      if (!fee) {
        errors.fee = 'fee is Required.';
      } else if (fee >= 500) {
        errors.fee = 'Max fee is ₹500';
      }
      return errors;
    },
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Paper className="memberPaper">
        <h1>Create Members</h1>
        <Divider />
        <br />
        <Box
          component="form"
          className="memberBox"
          sx={{
            '& .-MuiTextFieldroot': { m: 1, width: '75ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            {/* bellow fiend is used to create and add update and view the members in library */}
            <TextField
              required
              className="tf"
              id="outlined-required"
              label="Name"
              name="name"
              error={formik.errors.name}
              helperText={
                formik.errors.name
                  ? formik.errors.name
                  : 'Enter Member name here'
              }
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <TextField
              required
              id="outlined-required"
              className="tf"
              label="Image"
              name="image"
              error={formik.errors.image}
              helperText={
                formik.errors.image
                  ? formik.errors.image
                  : 'Insert Image url of a person'
              }
              value={formik.values.image}
              onChange={formik.handleChange}
            />
            <TextField
              className="tf"
              required
              id="outlined-required"
              label="Age"
              name="age"
              type="number"
              error={formik.errors.age}
              helperText={
                formik.errors.age ? formik.errors.age : 'Enter age here'
              }
              value={formik.values.age}
              onChange={formik.handleChange}
            />
            <TextField
              required
              id="outlined-required"
              className="tf"
              label="Phone"
              name="phone"
              error={formik.errors.phone}
              helperText={
                formik.errors.phone
                  ? formik.errors.phone
                  : 'Enter valid phone number'
              }
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            <TextField
              className="tf"
              required
              id="outlined-required"
              label="Address"
              name="address"
              error={formik.errors.address}
              helperText={
                formik.errors.address
                  ? formik.errors.address
                  : 'Enter Member home address'
              }
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            <TextField
              className="tf"
              required
              id="outlined-required"
              label="JoinDate"
              name="joindate"
              error={formik.errors.joindate}
              helperText={
                formik.errors.joindate
                  ? formik.errors.joindate
                  : 'Enter Date of Joining'
              }
              value={formik.values.joindate}
              onChange={formik.handleChange}
            />
            <TextField
              className="tf"
              required
              id="outlined-required"
              label="Books"
              name="books"
              error={formik.errors.books}
              helperText={
                formik.errors.books
                  ? formik.errors.books
                  : 'Enter how many books you rented'
              }
              value={formik.values.books}
              onChange={formik.handleChange}
            />
            <TextField
              className="tf"
              required
              id="outlined-required"
              label="Enter the amount"
              name="fee"
              error={formik.errors.fee}
              helperText={
                formik.errors.fee ? formik.errors.fee : 'Enter the amount'
              }
              value={formik.values.fee}
              onChange={formik.handleChange}
            />
          </div>
          <br />
          {id === undefined ? (
            <Button
              onClick={() => {
                formik.handleSubmit();
                JSON.stringify(formik.errors) !== '{}'
                  ? toast.error('Enter a valid Credentials and proceed!')
                  : toast.success('Successfully Added');
              }}
            >
              Create
            </Button>
          ) : (
            <Button
              onClick={() => {
                formik.handleSubmit();
                {
                  JSON.stringify(formik.errors) !== '{}'
                    ? toast.error('Enter a valid Credentials and proceed!')
                    : toast.success('Successfully updated');
                }
              }}
            >
              Update
            </Button>
          )}
          <br />
        </Box>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  //this is used to get the data and show in field .
  viewUpdate: async (id) => {
    const res = await axios.get(
      `https://636c8f127f47ef51e14ba6ab.mockapi.io/members/${id}`
    );
    const data = await res.data;
    return data;
  },
});

const mapDispatchToProps = (dispatch) => ({
  // this is used to update the members into mocka api and also the books list
  update: (data) => {
    axios
      .put(
        `https://636c8f127f47ef51e14ba6ab.mockapi.io/members/${data.id}`,
        data
      )
      .then((data) => {
        axios
          .get(`https://636c8f127f47ef51e14ba6ab.mockapi.io/members`)
          .then((data) => {
            dispatch({ type: 'Add_Members', payload: data.data });
          });
      });
  },
  create: (data) => {
    //this is used to create the field.
    axios
      .post(`https://636c8f127f47ef51e14ba6ab.mockapi.io/members`, data)
      .then((data) => {
        axios
          .get(`https://636c8f127f47ef51e14ba6ab.mockapi.io/members`, data)
          .then((data) => {
            dispatch({ type: 'Add_Members', payload: data.data });
          });
      });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Addmembers);
