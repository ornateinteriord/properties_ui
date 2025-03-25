import { 
    Box,  
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Container,
    useTheme,
    useMediaQuery
  } from "@mui/material"
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  
  const HelpandSupport = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
    const faqs = [
      {
        question: "How do I list my property for sale?",
        answer: "To list your property, log in to your account, go to 'My Properties' and click 'Add New Property'. Fill in all the required details about your property including location, size, amenities, and upload high-quality photos. Once submitted, our team will review and approve your listing within 24 hours."
      },
      {
        question: "What documents do I need to rent a property?",
        answer: "Typically you'll need: 1) Valid government-issued ID, 2) Proof of income (last 3 pay stubs or tax returns), 3) Rental application, 4) References from previous landlords, and 5) Security deposit (usually equal to one month's rent). Requirements may vary by property."
      },
      {
        question: "How does the buying process work?",
        answer: "Our buying process involves: 1) Getting pre-approved for a mortgage, 2) Working with one of our agents to find suitable properties, 3) Making an offer, 4) Home inspection, 5) Finalizing financing, and 6) Closing. The entire process typically takes 30-60 days."
      },
      {
        question: "What fees are involved when buying a home?",
        answer: "Buyers should budget for: 1) Down payment (typically 5-20% of purchase price), 2) Closing costs (2-5% including loan fees, title insurance, appraisal), 3) Home inspection ($300-$500), 4) Moving costs, and 5) Potential HOA fees if applicable."
      },
      {
        question: "How can I estimate my property's value?",
        answer: "We provide free property valuations using: 1) Comparative market analysis of similar recently sold properties, 2) Current market trends in your area, 3) Property features and upgrades, and 4) Local economic factors. Contact one of our agents for a detailed assessment."
      }
    ];
  
    const terms = [
      {
        title: "Privacy Policy",
        content: "We collect personal information to provide and improve our services. This may include your name, contact details, property preferences, and financial information. We implement security measures to protect your data but cannot guarantee absolute security. We may share information with service providers but will not sell your data to third parties for marketing purposes."
      },
      {
        title: "User Responsibilities",
        content: "Users are responsible for providing accurate information in listings and communications. Any false or misleading information may result in account termination. Users must comply with all applicable laws regarding property transactions. Our platform should not be used for any illegal or fraudulent activities."
      },
      {
        title: "Intellectual Property",
        content: "All content on our website including logos, text, graphics, and software is our property or licensed to us and protected by copyright laws. Property listings may only be used for personal, non-commercial purposes. Unauthorized use of any content may violate copyright and other laws."
      },
      {
        title: "Limitation of Liability",
        content: "We are not responsible for any errors in property listings or for the quality or safety of listed properties. We do not guarantee the accuracy of information provided by third parties. Users should verify all information independently before making purchasing decisions. Our liability is limited to the maximum extent permitted by law."
      },
      {
        title: "Changes to Terms",
        content: "We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms. Users will be notified of significant changes via email or through notices on our website. It is the user's responsibility to review terms periodically."
      }
    ];
  
    return (
      <Box sx={{ minHeight: "100vh" }}>
        {/* Hero Image Section */}
        <Box sx={{ position: 'relative', width: '100%', height: isMobile ? '50vh' : '70vh', mt:{xs:7,sm:8,md:10.6} }}>
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Real Estate Help" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              filter: 'brightness(0.7)'
            }} 
          />
          <Typography 
            variant={isMobile ? "h3" : "h2"} 
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              width: '100%',
              px: 2
            }}
          >
            Help And Support
          </Typography>
        </Box>
  
        {/* Main Content Container */}
        <Container maxWidth="lg" sx={{ py: 6,display:"flex",gap:{xs:0,sm:0,md:2},flexDirection:{xs:"column",sm:"column",md:"row"} }}>
          {/* FAQ Section */}
          <Box sx={{ mb:{xs:2,sm:3,md:7},width:"100%" }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 4, color: '#150b83c1' }}>
              Frequently Asked Questions
            </Typography>
            
            {faqs.map((faq, index) => (
              <Accordion key={index} sx={{ mb: 2, boxShadow: 1 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 500 }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
  
          {/* Terms & Conditions Section */}
          <Box sx={{width:"100%"}}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 4, color: '#150b83c1' }}>
              Terms & Conditions
            </Typography>
            
            {terms.map((term, index) => (
              <Accordion key={index} sx={{ mb: 2, boxShadow: 1 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-terms${index}-content`}
                  id={`panel-terms${index}-header`}
                >
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 500 }}>
                    {term.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {term.content}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>
    )
  }
  
  export default HelpandSupport