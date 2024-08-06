
import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
    width: 100%;
    background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000;
    height: 50vh;
    backgroud-size:cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    text-shadow: 0px 0px 50px black;
    line-height: 1;
    padding-bottom:20px;

`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #000;
    padding:5px 10px;
    color:white;
    text-shadow:0 0 10px whitesmoke;
    border-radius:7px;
`;

const Banner = () => {
    
    return (
        <Image>
            <Heading>BLOGDOM</Heading>
            <SubHeading>Hub of your Thoughts</SubHeading>
        </Image>
    )
}

export default Banner;