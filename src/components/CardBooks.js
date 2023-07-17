import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, CircularProgress, CssVarsProvider } from '@mui/joy';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import axios from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

 function CardBooks(props) {
   const navigate=useNavigate();
   if(props.books==={books:[],
                    createbook:{}
    }){
     return <CssVarsProvider><CircularProgress /></CssVarsProvider>
    }else{
    return (
      <CssVarsProvider>
    <Card  key={props.book.id}
      variant="outlined"
      row
      sx={{
        mb:5,
        width: 320,
        bgcolor:"white",
        gap: 2,
        m:5,
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
      }}
      >
      <AspectRatio ratio="1" sx={{ width: 90}}>
        <img
          src={props.book.imageLink}
          loading="lazy"
          alt="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
          />
      </AspectRatio>
      <div style={{textAlign:'left' , color:'black',width:'100%'}} >
        <Typography level="h2" fontSize="lg" id="card-description"  sx={{ color: 'black' }} mb={0.5}>
          {props.book.title}
        </Typography>
        <Typography sx={{color:'black'}} fontSize="sm" aria-describedby="card-description" mb={1}>
        <Divider sx={{ '--Divider-childPosition': "1%" ,color:'black',width:'100%'}}>
         <b> Author</b>
        </Divider>
        <div>{props.book.author}</div>
        <Divider sx={{ '--Divider-childPosition': "1%" ,color:'black',width:'100%'}}>
         <b>Country</b>
        </Divider>
        <div> {props.book.country}</div>
        <Divider sx={{ '--Divider-childPosition': "1%" ,color:'black',width:'100%'}}>
         <b> Language</b>
        </Divider>
        <div>{props.book.language}</div>
        <Divider sx={{ '--Divider-childPosition': "1%" ,color:'black',width:'100%'}}>
         <b> Pages</b>
        </Divider>
        <div>{props.book.pages}</div>
        <Divider sx={{ '--Divider-childPosition': "1%" ,color:'black',width:'100%'}}>
         <b> Year</b>
        </Divider>
        <div>{props.book.year}</div>
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          
        <Button size='s'
          color="primary"
          variant='solid'
          onClick={()=>window.open(props.book.link)} 
        ><InfoIcon /></Button>

        <Button  
          size='s'
          color="neutral"
          variant='solid'
          onClick={()=>{navigate(`/create-books/${props.book.id}`,{state:{update:false}})}}
        ><VisibilityIcon />
        </Button>

        <Button
        // disabled={true}
         size='s'
         color='danger'
         variant='solid'
         onClick={()=>{props.handleDelete(props.book)
                      }}>
              <DeleteIcon/>
        </Button>
        <Button 
         size='s'
         color="warning"
         variant='solid'
         onClick={()=>{navigate(`/create-books/${props.book.id}`,{state:{update:true}})}}
          ><UpgradeIcon />
        </Button>
        </Box>
      </div>
    </Card>
    </CssVarsProvider>
  );
}
}

const mapStateToProps = (state)=>({

})
const mapDispatchToProps = (dispatch)=>({
  handleDelete:(e)=>{
    axios.delete(`https://636c8f127f47ef51e14ba6ab.mockapi.io/books/${e.id}`)
    .then((res)=>{
      toast.error("Books Deleted Successfully")
      dispatch({type:"delete",payload:res.data})
    })
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(CardBooks);