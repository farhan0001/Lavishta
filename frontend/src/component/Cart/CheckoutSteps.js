import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { Fragment } from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import './CheckoutSteps.css';


const CheckoutSteps = ({activeStep}) => {

    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />
        }
    ];

    const stepStyles = {
        boxSizing: "border-box"
    };

  return (
    <Fragment>
        <Stepper className='stepperBox' alternativeLabel activeStep={activeStep} style={stepStyles}>
            {
                steps.map((item, index) => (
                    <Step key={index} active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}>
                        <StepLabel icon={item.icon}
                            style={{color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.6)"}}
                        >{item.label}</StepLabel>
                    </Step>
                ))
            }
        </Stepper>
    </Fragment>
  )
}

export default CheckoutSteps