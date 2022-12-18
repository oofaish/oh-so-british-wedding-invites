import { Grid, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Slider } from '@mui/material';
import { useState } from 'react';

import stringToBool from '@/lib/stringToBool';
import { useAppDispatch } from './context';

const AddressForm = () => {
    const dispatch = useAppDispatch();
    const [sliderValue, setSliderValue] = useState<{ expectedPartyCount: number | number[] }>({
        expectedPartyCount: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'UPDATE_USER_VALUES',
            payload: {
                [e.target.name]: stringToBool(e.target.value),
            },
        });
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCount = e.target.value.split(',').filter((x) => !!x.trim()).length;
        if (newCount !== sliderValue.expectedPartyCount) {
            setSliderValue({ expectedPartyCount: newCount });
        }
        dispatch({
            type: 'UPDATE_USER_VALUES',
            payload: {
                [e.target.name]: stringToBool(e.target.value),
                expectedPartyCount: newCount,
            },
        });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
                <TextField
                    // TODO update expected party count on change.
                    onChange={handleNameChange}
                    required
                    id="names"
                    name="names"
                    label="Attendees (comma separated)"
                    fullWidth
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    onChange={handleChange}
                    required
                    id="email"
                    name="email"
                    label="Email Address"
                    fullWidth
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    onChange={handleChange}
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    variant="standard"
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <FormControl sx={{ transform: 'translateY(15px)' }}>
                    <FormLabel required id="attending">
                        Are you able to attend?
                    </FormLabel>
                    <RadioGroup
                        onChange={handleChange}
                        aria-labelledby="rsvp-radio-buttons-group-label"
                        defaultValue="maybe"
                        name="attending"
                        sx={{ flexDirection: 'row', verticalAlign: 'bottom' }}
                    >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes, definitely" />
                        <FormControlLabel value="no" control={<Radio />} label="No, I can't make it" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                    <FormLabel id="expectedPartyCount">Total Party Count</FormLabel>
                    <Slider
                        aria-label="Always visible"
                        defaultValue={0}
                        step={1}
                        id="expectedPartyCount"
                        marks
                        min={0}
                        max={10}
                        valueLabelDisplay="auto"
                        value={sliderValue.expectedPartyCount}
                        sx={{ width: '98%', ml: '1%' }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                    onChange={handleChange}
                    id="diet"
                    name="diet"
                    label="Any special dietry requirements (please specify name)?"
                    fullWidth
                    variant="standard"
                />
            </Grid>
        </Grid>
    );
};

export default AddressForm;
