
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;


const Contact = () => {
    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h3">Getting in touch is easy!</Typography>    
                <Text variant="h5">
                We’d love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us.
                <br />
                <br />
                You can connect with us on Instagram for the latest updates and more:

                    <Link href="https://www.instagram.com/sameer_crazy_001/" color="inherit" target="_blank">
                        <Instagram/>sameer_crazy_001
                    </Link>
                    <br />
                    or 
                    <br />
                    send me an Email 
                    <Link href="mailto:sameerahamedcse@gmail.com?Subject=Reaching you out for <reason>" target="_blank" color="inherit">
                        <Email />sameerahamedcse@gmail.com
                    </Link>.
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;