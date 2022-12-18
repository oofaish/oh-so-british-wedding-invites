import { Box } from '@mui/material';

interface Props {
    source: string;
    title: string;
}

const Map = ({ source, title }: Props) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            m: 3,
        }}
    >
        <iframe
            src={source}
            width="400"
            height="350"
            style={{ border: 0, maxHeight: '450px', maxWidth: '600px', zIndex: 500 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={title}
        />
    </Box>
);

export default Map;
