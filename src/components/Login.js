import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Alert } from '@mui/joy';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Sheet from '@mui/joy/Sheet';
import { useColorScheme } from '@mui/joy/styles';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import * as React from 'react';
import { toast } from 'react-toastify';


export default function Login({handleStatus}) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  const [change, setChange] = React.useState({
    email :'',
    password:''
  });

   const ButtonComp = () =>{
    return <Button
    style={{width:'10px' ,justifyContent:'center'}}
    variant="outlined"
    onClick={() => {
      setMode(mode === 'light' ? 'dark' : 'light');
    }}
  >
    {mode === 'light' ?  <DarkModeIcon/>:< Brightness7Icon/>}
  </Button>
   }
  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }


  const handleChange=(text)=>{
     setChange({...change,[text.target.name]:text.target.value})
  }
  const handleSubmit = ()=>{
    if(change.email ==='enter@gmail.com' && change.password ==='authenticate'){
      
      localStorage.setItem('logginStatus','slfjflsdj-sdfhsdofjsd-sflsdf-wsrhwejf')
      handleStatus()
    }else{
      console.log(change)
      toast.error('Enter a valid Credentials',{
        theme: mode
      })
    }
  }
  
  return (  
      <main style={{height:'100vh',width:'100%',backgroundColor: mode ==='light'? 'white':'black',display:'flex',flexDirection:'column',}}>
         <ButtonComp />
        <div color='blue' style={{width:'100%' ,display:'flex',justifyContent:'center'}} >
          <Alert severity='info' style={{width:'auto'}}>
            <div><b><u>email</u></b>  : enter@gmail.com  <b><u>password</u></b>: authenticate</div>
          </Alert>
        </div>
        <Sheet 
          sx={{
            width: 300,
            mx: 'auto', // margin left & right
            my: '10%', // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body2">Sign in to continue.</Typography>
          </div>
          <TextField
            // html input attribute
            name="email"
            type="email"
            placeholder="johndoe@email.com"
            // pass down to FormLabel as children
            label="Email"
            onChange={(e)=>handleChange(e)}
            />
          <TextField
            name="password"
            type="password"
            placeholder="password"
            label="Password"
            onChange={(e)=>handleChange(e)}
          />
          <Button sx={{ mt: 1 /* margin top */ }} onClick={handleSubmit}>Log in</Button>
          <Typography
            endDecorator={<Link href="/sign-up">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
        </Sheet>
      </main>
    // </CssVarsProvider>
  );
}