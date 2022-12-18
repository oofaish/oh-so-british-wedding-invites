import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Container, Button, Paper, Typography } from '@mui/material';
import { useLayoutEffect } from 'react';
import type { NextPage } from 'next';

import spin from '@/styles/spin.module.css';
import flex from '@/lib/flex';
import thanksText from '@/lib/thanksText';
import { useAppState } from '@/components/context';

const Thanks: NextPage = () => {
    const router = useRouter();
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.replace('/signin');
        },
    });

    const { attending, names } = useAppState();

    useLayoutEffect(() => {
        if (!names) router.replace('/');
    }, [names, router]);

    return (
        <>
            <img
                src="https://res.cloudinary.com/dmvrc4esd/image/upload/v1671272562/cycling_towards_a_castle.webp"
                alt="Couple cycling towards a castle"
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    zIndex: 0,
                    width: '100%',
                }}
            />
            <Container component="main" sx={{ ...flex, minHeight: '90vh', zIndex: 1 }}>
                {!session && <div className={spin.spin} />}
                {session && (
                    <Container
                        maxWidth="sm"
                        sx={{
                            ...flex,
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            mt: 3,
                            mb: 3,
                        }}
                    >
                        <Paper
                            elevation={3}
                            sx={{
                                flexGrow: 1,
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                pl: 3,
                                pr: 3,
                                pb: 3,
                                backgroundColor: '#f8f8ff',
                            }}
                        >
                            <Typography sx={{ m: 3, fontSize: '18px' }} variant="h5">
                                <div dangerouslySetInnerHTML={{ __html: thanksText(attending, names) }} />
                            </Typography>
                        </Paper>
                        <Button
                            id="user-form-link"
                            onClick={() => router.push('/')}
                            variant="contained"
                            sx={{ m: 3, color: 'white' }}
                        >
                            Go Back
                        </Button>
                    </Container>
                )}
            </Container>
        </>
    );
};

export default Thanks;
