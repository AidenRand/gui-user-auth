import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const MyButton = styled(Button)(({ theme }) => ({
    border: 0,
    backgroundColor: theme.palette.primary.blue,

    '&:hover': {
        backgroundColor: theme.palette.primary.darkBlue,
    },

    borderRadius: '5px',

    color: theme.palette.primary.white,
    height: 48,
    width: '120px',
}));

export default MyButton;
