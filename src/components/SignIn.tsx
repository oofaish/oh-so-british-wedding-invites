import { Button, TextField, Box, Typography, Container, Paper } from '@mui/material';
import { useState } from 'react';
import { getCsrfToken } from 'next-auth/react';

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const csrfToken = await getCsrfToken();

        try {
            const res = await fetch('/api/auth/callback/credentials', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, csrfToken }),
            });
            if (
                res.url ===
                `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/signin?callbackUrl=${process.env.NEXT_PUBLIC_NEXTAUTH_URL}&error=CredentialsSignin`
            ) {
                setError('Incorrect username or password!');
            } else {
                window.location.replace('/');
            }
        } catch (err) {
            setError('Oops, something went wrong!');
        }
    };

    return (
        <>
            <Container component="div" maxWidth="xs" sx={{ position: 'relative', zIndex: 1, overflow: 'hidden' }}>
                <Box
                    sx={{
                        height: '50%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mt: 3,
                        mb: 3,
                    }}
                >
                    <img
                        src="https://res.cloudinary.com/dmvrc4esd/image/upload/v1671272562/cycling_towards_a_castle.webp"
                        alt="Couple cycling towards a castle"
                        style={{
                            maxWidth: '700px',
                            width: '100%',
                        }}
                    />
                </Box>
                <Paper variant="outlined" sx={{ p: '20px', borderRadius: '10px' }}>
                    <Box
                        sx={{
                            marginTop: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h6" sx={{ mb: 1, textAlign: 'center' }}>
                            We are getting married!
                        </Typography>

                        {!error ? (
                            <Typography component="h1" variant="h6" sx={{ textAlign: 'center', fontSize: '.7em' }}>
                                Please log in to view our wedding day details and RSVP
                            </Typography>
                        ) : (
                            <Typography component="h1" variant="h5">
                                {error}
                            </Typography>
                        )}
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, color: 'white' }}>
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}
