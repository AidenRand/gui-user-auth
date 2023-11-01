const textfieldStyles = {
    '&::focus': {
        color: 'primary.blue',
    },

    fieldset: {
        borderColor: 'primary.blue',
    },

    '& label.Mui-focused': {
        color: 'primary.white',
    },

    '& label': {
        color: 'primary.white',
    },

    '& > :not(style)': {
        width: '400px',
    },

    '& .MuiInput-underline:after': {
        borderBottomColor: 'primary.blue',
    },
    '& .MuiOutlinedInput-root': {
        color: 'primary.white',

        '&.Mui-focused fieldset': {
            borderColor: 'primary.blue',
        },

        '&:hover fieldset': {
            borderColor: 'primary.blue',
        },
    },
};

export default textfieldStyles;
