import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import './AccountDetails.css';
import Typography from "@mui/material/Typography";
import "./PaymentPlan.css";
import {Divider} from "@mui/material";
export default function PaymentPlan({setActiveStep}) {
  return (
    <>
      <div className="headingPayment">
        <h2>Subscription Plans</h2>
        <p>
          {" "}
          Please consider supporting us by becoming a full access members. You
          get all the bells and whistles included, plus free access to our ebook
          librarties
        </p>
      </div>
      <div className="cardContainerPayment">
        <Card sx={{maxWidth:window.innerWidth>768? 400:"100%",padding:1,marginBottom:2}}>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              Contributor Account
            </Typography>
            <Divider />
            <Typography
              variant="body2"
              sx={{color: "text.secondary", marginTop: 1}}
            >
              Contributor Account $199 annual no negotiations You will be able
              to post unlimited posts and our approval from the admin within 24
              hours. We do not accept casino gambling adult or sport betting
              topics.{" "}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="medium" variant="contained" >Choose Plan</Button>
          </CardActions>
        </Card>
        <Card sx={{maxWidth:window.innerWidth>768? 400:"100%",padding:1,marginBottom:2}}>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
          
Author Account
            </Typography>
            <Divider />
            <Typography
              variant="body2"
              sx={{color: "text.secondary", marginTop: 1}}
            >
              $999 annual no negotiations. You will be able to post unlimited posts with NO APPROVAL NEEDED, publish immediately. We do not accept casino gambling adult or sport betting topics. 
              </Typography>
          </CardContent>
          <CardActions>
            <Button size="medium" variant="contained" >Choose Plan</Button>
          </CardActions>
        </Card>
       
		
      </div>
    
      <div className='flexBoxButton reg_btn'> 
                <input type="submit" value="Back" className='buttonDetailsPage' onClick={()=>setActiveStep(0)}/>
                <input type="submit" value="Next" className='buttonDetailsPage' onClick={()=>setActiveStep(2)}/>
                </div>
    </>
  );
}
