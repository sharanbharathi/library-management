import { FormatItalic } from '@mui/icons-material';
import { Box, Button, Paper, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const  Createbooks = (props) => {
  const [dummy, setDummy] = React.useState();
  const [value, setValue] = React.useState(dayjs('2205'));
  const {id} = useParams();
  const {state} = useLocation(); 
  const navigate = useNavigate();

  useEffect(()=>{
    props.dummy(id).then((e)=>{
      setDummy(e)
      setValue(dayjs(`${e.year}`))
    })
  },[])

   function init(){
    if(dummy !== undefined){
        return dummy
    }else{
        return {
          imageLink:"",
          title: "" ,
          author:"",
          country:"",
          language:"",
          pages:"",
          link:"",
          year:""
        }
    }
   }

  const initialValue1 = init()
                        
                        
const formik = useFormik({
      initialValues:initialValue1,
      enableReinitialize:dummy,
      onSubmit:(values)=>{
        if(state != null){
          if(state.update){
            //!used to update
            props.update(values)
            navigate('/books')
          }else{
            // ! used to view
          }}else{
            //! used to submit
            props.create(values)
            navigate('/books')
        }
    },
    validate:(values)=>{
      let {imageLink,title,author,country,language,pages,link,year}=values;
      let errors ={};
      if(!title){
        errors.title = "Title is Required."
      }else if(title.length<5){
        errors.title= "title is not valid "
      }
      if(!imageLink){
        errors.imageLink = 'Image Url is required!'
      }else if(imageLink.length<15){
        errors.imageLink = 'Enter a valid Image Url!'
      }
      if(!link){
        errors.link = 'wikipedia Url is required!'
      }else if(link.length<15){
        errors.link = 'Enter a valid wikipedia Url!'
      }
      if(!author){
        errors.author = 'Author name is required!'
      }else if(author.length<3){
        errors.author = 'Enter a valid author name!'
      }
      if(!country){
        errors.country = 'Country is required!'
      }else if(country.length<3){
        errors.country = 'Enter a valid Country name!'
      }
      if(!language){
        errors.language = 'Language is required!'
      }else if(language.length<3){
        errors.language = 'Enter a valid language!'
      }
      if(!pages){
        errors.pages = 'Total No.of.pages is required!'
      }else if(pages<5){
        errors.pages = 'Total No.of.pages should be above 5!'
      }
      return errors
    }
  })
  
  useEffect(()=>{
    if(value !=null){
      formik.values.year=value.toDate().getFullYear()
      }else{
        formik.values.year=""
      }
    },[formik.values.year])
  return (
    <div style={{display:'flex',justifyContent:'center'}}>
      <Paper style={{maxWidth:'800px'}}>
        {state!=null?!state.update?<h1>Read Only</h1>:<h1>Update</h1>: 
        <h1>Fill the Below form to Create Book</h1>
      } 
      <img src={formik.values.imageLink}></img>
      <Box
      component="form"
      noValidate
      autoComplete="on"
      >
        <TextField autoFocus
          id="outlined-basic"
          sx={{m:1.5}} 
          label="Image Url"
          variant="outlined" 
          disabled={state!==null?!state.update:false}
          name='imageLink'
          value={formik.values.imageLink}
          onChange={formik.handleChange}
          error={formik.errors.imageLink}
          helperText={formik.errors.imageLink?formik.errors.imageLink:'Enter valid image Url here'} 
        />

        <TextField autoFocus
          id="outlined-basic"
          sx={{m:1.5}} 
          label="Wiki Url"
          variant="outlined" 
          disabled={state!==null?!state.update:false}
          name='link'
          value={formik.values.link}
          onChange={formik.handleChange}
          error={formik.errors.link}
          helperText={formik.errors.link?formik.errors.link:'Enter valid Wiki Url here'} 
        />

        <TextField
          id="outlined-basic"
          value={formik.values.title}
          sx={{m:1.5}}
          label="Title"
          variant="outlined"
          disabled={state!==null?!state.update:false}
          name='title'
          onChange={formik.handleChange}
          error={formik.errors.title}
          helperText={formik.errors.title?formik.errors.title:'Enter book title here'}
        />

        <TextField 
          required
          id="outlined-basic"
          sx={{m:1.5}}
          value={formik.values.author}
          label="Author"
          variant="outlined"
          disabled={state!==null?!state.update:false}
          name='author'
          onChange={formik.handleChange}
          error={formik.errors.author} 
          helperText={formik.errors.author?formik.errors.author:'Enter author name here'}
        />

        <TextField 
          id="outlined-basic"
          sx={{m:1.5}}
          label="Country" 
          variant="outlined"
          disabled={state!==null?!state.update:false}
          name='country'
          value={formik.values.country}
          onChange={formik.handleChange}
          error={formik.errors.country} 
          helperText={formik.errors.country?formik.errors.country:'Enter Book Origin Country'}
        />

        <TextField
          id="outlined-basic"
          sx={{m:1.5}}
          label="Language"
          variant="outlined" 
          disabled={state!==null?!state.update:false}
          name='language' 
          value = {formik.values.language}
          onChange={formik.handleChange} 
          error={formik.errors.language}
          helperText={formik.errors.language?formik.errors.language:'Enter book written language here'}
        />

        <TextField 
          id="outlined-basic"
          sx={{m:1.5}} 
          label="Pages"
          variant="outlined"
          disabled={state!==null?!state.update:false}
          type="number"
          name='pages'
          value={formik.values.pages}
          onChange={formik.handleChange} 
          error={formik.errors.pages} 
          helperText={formik.errors.pages?formik.errors.pages:'Enter Total number of Pages'}
        />

        <LocalizationProvider
          sx={{m:1.5}}
          dateAdapter={AdapterDayjs}     
        >
          <DatePicker 
            className='datepicker'
            views={['year']}
            label="Year only"
            disabled={state!==null?!state.update:false}
            onChange={(e)=>{
              if(e=== null){
                        formik.values.year = NaN
            }else{
              formik.values.year = e.toDate().getFullYear()
              setValue(e)
            }
            }}
            value={value}
            renderInput={(params) => <TextField variant="outlined" 
                                      disabled
                                      id="outlined-basic"
                                      style={{width:'430px'}}
                                      sx={{m:1.5}}
                                      {...params}
                                      onChange={formik.handleChange}
                                      error={formik.errors.year === undefined ? false:isNaN(formik.errors.year)}
                                      helperText={isNaN(formik.errors.year)?formik.errors.year:'Select Year of Pushlished'}
                                      value={formik.values.year}
                                      />
                        }
          />
        </LocalizationProvider>
        </Box>
        {state!==null?state.update?<Button type="submit" onClick={formik.handleSubmit}>Update</Button>:<div></div>
        :
        <Button type="submit" onClick={formik.handleSubmit}>Create</Button>}
      </Paper>
    </div>
  )
}
const mapStateToProps =(state) =>({
  dummy:async(e)=>{
   const res = await axios.get(`https://636c8f127f47ef51e14ba6ab.mockapi.io/books/${e}`)
   const data = await res.data
    return data
  }
})

const mapDispatchToProps = (dispatch) =>({
  update: (e)=>{
    axios.put(`https://636c8f127f47ef51e14ba6ab.mockapi.io/books/${e.id}`,e)
      .then((res)=>{
        axios.get(`https://636c8f127f47ef51e14ba6ab.mockapi.io/books`)
        .then((res)=>{
          toast.success("Updated Successfully")
          dispatch({type:'add',payload:res.data})
                     })
            })
  
  },
  create: (e)=>{
    axios.post(`https://636c8f127f47ef51e14ba6ab.mockapi.io/books`,e).then((res)=>{
      axios.get(`https://636c8f127f47ef51e14ba6ab.mockapi.io/books`)
      .then((res)=>{
        toast.success("Book Created Successfully")
        dispatch({type:'add',payload:res.data})})
      
    })
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(Createbooks);