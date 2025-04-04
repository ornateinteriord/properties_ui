import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Slider,
  Box,
  Paper,
  Grid,
} from '@mui/material';

const EMICalculator: React.FC = () => {
  // State for input values
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [loanTenure, setLoanTenure] = useState<number>(12);


  // Calculate EMI
  const calculateEMI = (): number => {
    const monthlyInterestRate = interestRate / 12 / 100;
    const numberOfPayments = loanTenure;
    const emi =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    return parseFloat(emi.toFixed(2));
  };

  // Calculate total interest payable
  const calculateTotalInterest = (): number => {
    const emi = calculateEMI();
    const totalPayment = emi * loanTenure;
    return parseFloat((totalPayment - principal).toFixed(2));
  };

  // Calculate total payment (principal + interest)
  const calculateTotalPayment = (): number => {
    const emi = calculateEMI();
    return parseFloat((emi * loanTenure).toFixed(2));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 12, minHeight:"100vh" }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          EMI Calculator
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            {/* Loan Amount */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Loan Amount (Principal)"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(parseFloat(e.target.value))}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            {/* Interest Rate */}
            <Grid item xs={12}>
              <Typography gutterBottom>Annual Interest Rate (%)</Typography>
              <Slider
                value={interestRate}
                onChange={(_, value) => setInterestRate(value as number)}
                min={0}
                max={30}
                step={0.1}
                valueLabelDisplay="auto"
              />
              <TextField
                fullWidth
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                InputProps={{ inputProps: { min: 0, max: 30, step: 0.1 } }}
              />
            </Grid>
            {/* Loan Tenure */}
            <Grid item xs={12}>
              <Typography gutterBottom>Loan Tenure (Months)</Typography>
              <Slider
                value={loanTenure}
                onChange={(_, value) => setLoanTenure(value as number)}
                min={1}
                max={120}
                step={1}
                valueLabelDisplay="auto"
              />
              <TextField
                fullWidth
                type="number"
                value={loanTenure}
                onChange={(e) => setLoanTenure(parseFloat(e.target.value))}
                InputProps={{ inputProps: { min: 1, max: 120, step: 1 } }}
              />
            </Grid>
          </Grid>
        </Box>
        {/* Results */}
        <Box sx={{ mt: 4, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Results
          </Typography>
          <Typography>
            Monthly EMI: <strong>₹{calculateEMI()}</strong>
          </Typography>
          <Typography>
            Total Interest Payable: <strong>₹{calculateTotalInterest()}</strong>
          </Typography>
          <Typography>
            Total Payment (Principal + Interest):{' '}
            <strong>₹{calculateTotalPayment()}</strong>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default EMICalculator;