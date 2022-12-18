import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { Container, Button, Typography, Paper, Box } from '@mui/material';
import parse from 'html-react-parser';
import type { NextPage } from 'next';

import spin from '@/styles/spin.module.css';
import flex from '@/lib/flex';
import Map from '@/components/map';
import { Content } from '@/components/context/models';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
    const router = useRouter();
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.replace('/signin');
        },
    });

    const [content, setContent] = useState<Content>({} as Content);

    const getContent = async () => {
        const res = await fetch('/api/get-content');
        const data = await res.json();
        if (data.length > 0) {
            setContent(data[0]);
        } else {
            console.log('No content found - set it via the admin page');
        }
    };

    useEffect(() => {
        getContent();
    }, []);

    return (
        <Container component="main" sx={{ ...flex, minHeight: '90vh' }}>
            {!session && <div className={spin.spin} />}
            {session && Object.keys(content).length > 0 && (
                <Container>
                    <Box
                        sx={{
                            height: '50%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mt: 3,
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
                    <Container
                        maxWidth="lg"
                        disableGutters
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
                                alignItems: 'center',
                                pl: 0,
                                pr: 0,
                                backgroundColor: '#f8f8ff',
                            }}
                        >
                            <Box sx={{ m: 3, textAlign: 'center' }}>
                                <Typography sx={{ fontFamily: 'Comfortaa', letterSpacing: '0.5px' }} variant="h5">
                                    Your presence is requested at the marriage of
                                    <br />
                                    {content.title}
                                </Typography>
                            </Box>
                            <Typography sx={{ fontFamily: 'Comfortaa', letterSpacing: '0.5px' }} variant="h6">
                                {content.firstDate}
                            </Typography>
                            <Box sx={{ m: 1, mb: 5, textAlign: 'center' }}>
                                {content.saturday.map((item, i) => (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <p key={i} style={{ fontWeight: item[1] as 'bold' }}>
                                        {item[0]}
                                    </p>
                                ))}
                            </Box>
                            <Typography sx={{ fontFamily: 'Comfortaa', letterSpacing: '0.5px' }} variant="h6">
                                {content.secondDate}
                            </Typography>
                            <Box sx={{ mb: 5, textAlign: 'center' }}>
                                {content.sunday.map((item, i) => (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <p key={i} style={{ fontWeight: item[1] as 'bold' }}>
                                        {item[0]}
                                    </p>
                                ))}
                            </Box>
                            <Typography sx={{ fontFamily: 'Comfortaa', letterSpacing: '0.5px' }} variant="h6">
                                RSVP
                            </Typography>
                            <Box sx={{ mb: 5, textAlign: 'center' }}>
                                <p>
                                    Please{' '}
                                    <Button
                                        variant="text"
                                        onClick={() => router.push('/form')}
                                        sx={{ minHeight: 0, minWidth: 0, padding: 0, fontSize: '1.1em' }}
                                    >
                                        RSVP
                                    </Button>{' '}
                                    by {content.rsvpDate}
                                </p>
                            </Box>

                            <Typography sx={{ fontFamily: 'Comfortaa', letterSpacing: '1px' }} variant="h6">
                                Venues
                            </Typography>
                            <Box sx={{ m: 3, textAlign: 'center' }}>
                                {content.venue1 ? (
                                    <>
                                        <p>{content.venue1[0]}</p>
                                        <Map source={content.venue1[1]} title={content.venue1[0]} />
                                    </>
                                ) : null}
                                {content.venue2 ? (
                                    <>
                                        <p>{content.venue2[0]}</p>
                                        <Map source={content.venue2[1]} title={content.venue2[0]} />
                                    </>
                                ) : null}
                            </Box>
                            <Typography sx={{ fontFamily: 'Comfortaa', letterSpacing: '1px' }} variant="h6">
                                Where to stay
                            </Typography>
                            <Box sx={{ m: 3, textAlign: 'center' }}>
                                {content.hotels.map((item) => (
                                    <p key={item}>{parse(item)}</p>
                                ))}
                            </Box>
                            <Typography sx={{ fontFamily: 'Comfortaa', letterSpacing: '1px' }} variant="h6">
                                Gifts
                            </Typography>
                            <Box sx={{ m: 3, textAlign: 'center' }}>
                                <p>Your presence at our wedding is the perfect gift to us.</p>
                            </Box>
                            <Box sx={{ mb: 2, textAlign: 'center' }}>
                                <p style={{ fontSize: '0.7em', fontStyle: 'italic' }}>{content.footnote}</p>
                            </Box>
                        </Paper>
                        <Button
                            id="user-form-link"
                            onClick={() => router.push('/form')}
                            variant="contained"
                            sx={{ m: 3, color: 'white' }}
                        >
                            Click here to RSVP
                        </Button>

                        <Button
                            id="user-form-link"
                            onClick={() => signOut().then(() => router.push('/signin'))}
                            variant="contained"
                            sx={{ m: 3, mt: 2, color: 'white', backgroundColor: 'gray' }}
                        >
                            SIGN OUT
                        </Button>
                    </Container>
                </Container>
            )}
        </Container>
    );
};

export default Home;
