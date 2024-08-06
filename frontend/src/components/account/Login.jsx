import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');
    const [isLoading, setIsLoading] = useState(false);
    const [backendReady, setBackendReady] = useState(false);

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    useEffect(() => {
        const checkBackend = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://blogdom-backend.onrender.com/'); // Adjust the URL to your backend's health check endpoint
                if (response.ok) {
                    setBackendReady(true);
                }
            } catch (error) {
                console.error('Backend is still waking up', error);
                setTimeout(checkBackend, 3000); // Retry every 3 seconds
            } finally {
                setIsLoading(false);
            }
        };

        checkBackend();
    }, []);

    useEffect(() => {
        showError(false);
    }, [login]);

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const loginUser = async () => {
        setIsLoading(true);
        let response = await API.userLogin(login);
        setIsLoading(false);
        if (response.isSuccess) {
            showError('');
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            isUserAuthenticated(true);
            setLogin(loginInitialValues);
            navigate('/');
        } else {
            showError('Something went wrong! please try again later');
        }
    };

    const signupUser = async () => {
        setIsLoading(true);
        let response = await API.userSignup(signup);
        setIsLoading(false);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! please try again later');
        }
    };

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Component>
            <Box>
                <div className="logo" style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", fontFamily: "sans-serif", color: "#FB641B" }}>
                    <h2>Blogdom</h2>
                    <h4 style={{ marginTop: "0px" }}>Hub of your thoughts</h4>
                </div>

                {backendReady ? (
                    account === 'login' ? (
                        <Wrapper>
                            <TextField variant="standard" value={login.username} onChange={(e) => onValueChange(e)} name='username' label='Enter Username' />
                            <TextField variant="standard" type="password" value={login.password} onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />
                            {error && <Error>{error}</Error>}
                            <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 50 }}>Create an account</SignupButton>
                        </Wrapper>
                    ) : (
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name' label='Enter Name' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label='Enter Username' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />
                            <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                        </Wrapper>
                    )
                ) : (
                    <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                        <Typography>Backend is waking up. Please wait...</Typography>
                    </Box>
                )}
            </Box>
        </Component>
    );
};

export default Login;
