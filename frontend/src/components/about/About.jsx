
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(https://cdn.pixabay.com/photo/2024/08/01/17/30/sea-8937806_1280.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
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

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">About Blogdom</Typography>
                <Text variant="h5">Welcome to Blogdom, your go-to destination for insightful articles, thought-provoking ideas, and engaging stories. Whether you're here to learn something new, explore different perspectives, or simply enjoy a good read, Blogdom offers a diverse range of content curated just for you.<br /><br />At Blogdom, we believe in the power of words to inspire change, spark curiosity, and connect people from all walks of life. Our mission is to create a platform where writers and readers can come together to share knowledge, express creativity, and build a community centered around a love for learning and discovery.
                </Text>     
            </Wrapper>
        </Box>
    )
}

export default About;