import { 
  Box,  
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const HelpandSupport = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const faqs = [
    {
      question: "How do I list my property for sale?",
      answerPoints: [
        "Go to 'My Properties' and click 'Post Property'.",
        "Fill required details.",
        "Upload high-quality photos.",
        "Submit for review (approved within 24 hours)."
      ]
    },
    {
      question: "What documents do I need to rent a property?",
      answerPoints: [
        "Valid government-issued ID.",
        "Proof of income (last 3 pay stubs/tax returns).",
        "Rental application.",
        "References from previous landlords.",
        "Security deposit (usually one month's rent).",
        "Requirements may vary by property."
      ]
    },
    {
      question: "How does the buying process work?",
      answerPoints: [
        "Get pre-approved for a mortgage.",
        "Work with an agent to find properties.",
        "Make an offer.",
        "Conduct a home inspection.",
        "Finalize financing.",
        "Close the deal.",
        "Process typically takes 30-60 days."
      ]
    },
    {
      question: "What fees are involved when buying a home?",
      answerPoints: [
        "Down payment (5-20% of purchase price).",
        "Closing costs (2-5%, includes loan fees, title insurance, appraisal).",
        "Home inspection ($300-$500).",
        "Moving costs.",
        "Possible HOA fees (if applicable)."
      ]
    },
    {
      question: "How can I estimate my property's value?",
      answerPoints: [
        "Free valuation using:",
        "1. Comparative market analysis.",
        "2. Current market trends.",
        "3. Property features & upgrades.",
        "4. Local economic factors.",
        "Contact an agent for a detailed assessment."
      ]
    }
  ];

  const terms = [
    {
      title: "Privacy Policy",
      contentPoints: [
        "We collect personal information to provide and improve our services.",
        "This may include your name, contact details, property preferences, and financial information.",
        "We implement security measures to protect your data but cannot guarantee absolute security.",
        "We may share information with service providers but will not sell your data to third parties for marketing purposes."
      ]
    },
    {
      title: "User Responsibilities",
      contentPoints: [
        "Users are responsible for providing accurate information in listings and communications.",
        "Any false or misleading information may result in account termination.",
        "Users must comply with all applicable laws regarding property transactions.",
        "Our platform should not be used for any illegal or fraudulent activities."
      ]
    },
    {
      title: "Intellectual Property",
      contentPoints: [
        "All content on our website including logos, text, graphics, and software is our property or licensed to us.",
        "Protected by copyright laws.",
        "Property listings may only be used for personal, non-commercial purposes.",
        "Unauthorized use of any content may violate copyright and other laws."
      ]
    },
    {
      title: "Limitation of Liability",
      contentPoints: [
        "We are not responsible for any errors in property listings or for the quality or safety of listed properties.",
        "We do not guarantee the accuracy of information provided by third parties.",
        "Users should verify all information independently before making purchasing decisions.",
        "Our liability is limited to the maximum extent permitted by law."
      ]
    },
    {
      title: "Changes to Terms",
      contentPoints: [
        "We reserve the right to modify these terms at any time.",
        "Continued use of our services after changes constitutes acceptance of the new terms.",
        "Users will be notified of significant changes via email or through notices on our website.",
        "It is the user's responsibility to review terms periodically."
      ]
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
                <Typography variant="h6" component="h3" sx={{ fontWeight: 500, }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  {faq.answerPoints.map((point, i) => (
                    <ListItem key={i} sx={{ py: 0 }}>
                      <ListItemIcon sx={{ minWidth: 24 }}>
                        <FiberManualRecordIcon sx={{ fontSize: '10px' }} />
                      </ListItemIcon>
                      <ListItemText primary={point} />
                    </ListItem>
                  ))}
                </List>
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
                <List dense>
                  {term.contentPoints.map((point, i) => (
                    <ListItem key={i} sx={{ py: 0 }}>
                      <ListItemIcon sx={{ minWidth: 24 }}>
                        <FiberManualRecordIcon sx={{ fontSize: '10px' }} />
                      </ListItemIcon>
                      <ListItemText primary={point} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default HelpandSupport