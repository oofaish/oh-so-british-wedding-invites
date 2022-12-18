import { Box, Card, CardContent, Typography } from '@mui/material';

import { Guest } from './context/models';

interface Props {
    guest: Guest;
}

const UserCard = ({ guest }: Props) => (
    <Box>
        <Card variant="outlined" sx={{ p: 2, width: '60vw', mb: 4, backgroundColor: '#f8f8ff' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Name: {guest.names}
                </Typography>
                <Typography sx={{ mt: 1.5 }} color="text.secondary">
                    Email Address: {guest.email}
                </Typography>
                <Typography sx={{ mt: 1.5 }} color="text.secondary">
                    Phone number: {guest.phoneNumber}
                </Typography>

                <Typography sx={{ mt: 1.5 }} color="text.secondary">
                    Attending: {guest.attending[0].toUpperCase() + guest.attending.substring(1)}
                </Typography>
                <Typography sx={{ mt: 1.5 }} color="text.secondary">
                    Expected Party Count: {guest.expectedPartyCount}
                </Typography>
                {guest.diet && (
                    <Typography sx={{ mt: 1.5 }} color="text.secondary">
                        Dietry requirements: {guest.diet}
                    </Typography>
                )}
            </CardContent>
        </Card>
    </Box>
);

export default UserCard;
