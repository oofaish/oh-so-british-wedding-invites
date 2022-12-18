import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Container,
    Paper,
    Typography,
    Button,
    TextareaAutosize,
} from '@mui/material';
import type { NextPage } from 'next';
import { useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import * as placeHolderContent from '@/../content/place_holder.json';
import { Guest } from '@/components/context/models';
import AdminSignIn from '@/components/AdminSignIn';
import UserCard from '@/components/UserCard';
import spin from '@/styles/spin.module.css';
import flex from '@/lib/flex';
import stringToBool from '@/lib/stringToBool';

interface ToggleValues {
    attending?: 'yes' | 'no';
    diet?: boolean;
    children?: boolean;
}

const Admin: NextPage = () => {
    const attending = useRef();
    const [adminAuthenticated, setAdminAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [guests, setGuests] = useState<Guest[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [values, setValues] = useState<ToggleValues>({});
    const [content, setContent] = useState<string>('');
    const router = useRouter();
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.replace('/signin');
        },
    });

    const getContent = async () => {
        const res = await fetch('/api/get-content');
        const data = await res.json();
        if (data.length > 0) {
            delete data[0]._id;
            setContent(JSON.stringify(data[0], null, 2));
        } else {
            setContent(JSON.stringify(placeHolderContent, null, 2));
        }
    };

    const guestList = useMemo(
        () =>
            guests
                .filter((guest) => (values.attending ? guest.attending === values.attending : true))
                .filter((guest) => (values.children ? guest.expectedPartyCount > 2 : true))
                .filter((guest) => ('diet' in values ? !!guest.diet === values.diet : true)),
        [values, guests],
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'attending' || e.target.name === 'diet' || e.target.name === 'children') {
            setValues({
                ...values,
                [e.target.name]: stringToBool(e.target.value),
            });
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const current = e.currentTarget.id as 'attending' | 'diet' | 'children';
        setValues((prev) => {
            const newVals = prev;
            delete newVals[current];
            return { ...newVals };
        });
    };

    const getAdminGuestList = async () => {
        const res = await fetch('/api/admin-guest-list');
        const data = await res.json();
        setGuests(data);
        setLoaded(true);
    };

    const checkAdminPassword = async () => {
        const res = await fetch('/api/check-password', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });
        const data = await res.json();
        if (data.admin) {
            setAdminAuthenticated(true);
            await getAdminGuestList();
            await getContent();
        } else {
            setError('Incorrect password');
        }
    };

    const createContent = async () => {
        const result = await fetch('/api/create-content', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(JSON.parse(content)),
        });
        const data = await result.json();
        if (data.acknowledged) {
            // eslint-disable-next-line no-alert
            alert('Content created');
        } else {
            // eslint-disable-next-line no-alert
            alert('Content not created');
        }
    };

    return (
        <Container
            component="main"
            sx={{ ...flex, minHeight: '100vh', flexDirection: 'column', justifyContent: 'flex-start' }}
        >
            <>
                {adminAuthenticated ||
                    (!session ? (
                        <div className={spin.spin} />
                    ) : (
                        <AdminSignIn error={error} checkAdminPassword={checkAdminPassword} setPassword={setPassword} />
                    ))}
            </>
            <>
                {adminAuthenticated && (
                    <>
                        {loaded ? (
                            <>
                                <Box sx={{ p: 4 }}>
                                    <Paper variant="outlined" sx={{ p: 4, mb: 4, width: '60vw' }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                letterSpacing: '0.5px',
                                                textAlign: 'center',
                                                mb: 2,
                                            }}
                                            variant="h4"
                                        >
                                            Filters
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                sx={{ display: 'flex', justifyContent: 'flex-start' }}
                                            >
                                                <FormControl>
                                                    <FormLabel id="attending">Attending:</FormLabel>
                                                    <RadioGroup
                                                        ref={attending}
                                                        onChange={handleChange}
                                                        aria-labelledby="rsvp-radio-buttons-group-label"
                                                        defaultValue={false}
                                                        name="attending"
                                                        sx={{ flexDirection: 'row', verticalAlign: 'bottom' }}
                                                    >
                                                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                                        <FormControlLabel value="no" control={<Radio />} label="No" />
                                                    </RadioGroup>
                                                    <Button onClick={handleClick} id="attending" variant="outlined">
                                                        Remove filter
                                                    </Button>
                                                </FormControl>
                                            </Grid>
                                            <Grid // TODO this should look at expectedPartyCount >= 3
                                                item
                                                xs={12}
                                                sm={6}
                                                sx={{ display: 'flex', justifyContent: 'flex-start' }}
                                            >
                                                <FormControl>
                                                    <FormLabel id="children">Bringing children:</FormLabel>
                                                    <RadioGroup
                                                        onChange={handleChange}
                                                        aria-labelledby="rsvp-radio-buttons-group-label"
                                                        name="children"
                                                        sx={{ flexDirection: 'row', verticalAlign: 'bottom' }}
                                                    >
                                                        <FormControlLabel value control={<Radio />} label="Yes" />
                                                        <FormControlLabel
                                                            value={false}
                                                            control={<Radio />}
                                                            label="No"
                                                        />
                                                    </RadioGroup>
                                                    <Button onClick={handleClick} id="children" variant="outlined">
                                                        Remove filter
                                                    </Button>
                                                </FormControl>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                sx={{ display: 'flex', justifyContent: 'flex-start' }}
                                            >
                                                <FormControl>
                                                    <FormLabel id="diet">Dietry Requirements:</FormLabel>
                                                    <RadioGroup
                                                        onChange={handleChange}
                                                        aria-labelledby="rsvp-radio-buttons-group-label"
                                                        name="diet"
                                                        sx={{ flexDirection: 'row', verticalAlign: 'bottom' }}
                                                    >
                                                        <FormControlLabel value control={<Radio />} label="Yes" />
                                                        <FormControlLabel
                                                            value={false}
                                                            control={<Radio />}
                                                            label="No"
                                                        />
                                                    </RadioGroup>
                                                    <Button onClick={handleClick} id="diet" variant="outlined">
                                                        Remove filter
                                                    </Button>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                    <Paper variant="outlined" sx={{ p: 4, mb: 4, width: '60vw' }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                letterSpacing: '0.5px',
                                                textAlign: 'center',
                                                mb: 2,
                                            }}
                                            variant="h4"
                                        >
                                            Numbers
                                        </Typography>
                                        <Typography sx={{ mt: 1.5 }} color="text.secondary">
                                            Number of responses: {guestList.length}
                                        </Typography>
                                        <Typography sx={{ mt: 1.5 }} color="text.secondary">
                                            Total number of guests:{' '}
                                            {guestList.reduce((a, b) => a + b.expectedPartyCount, 0)}
                                        </Typography>
                                    </Paper>
                                    {Object.keys(values).length
                                        ? guestList.map((guest) => <UserCard key={guest._id} guest={guest} />)
                                        : guests.map((guest) => <UserCard key={guest._id} guest={guest} />)}
                                </Box>
                                <TextareaAutosize
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    minRows={10}
                                    placeholder="Page Content"
                                    style={{ width: '60vw' }}
                                />
                                <Button onClick={createContent} id="attending" variant="outlined">
                                    Create Page Content
                                </Button>
                            </>
                        ) : (
                            <div className={spin.spin} />
                        )}
                    </>
                )}
            </>
        </Container>
    );
};

export default Admin;
