import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    menu: {
        margin: '5px 0',
    },
    anchor: {
        textDecoration: 'none',
        color: '#333',
    },
    paper: {
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#333',
            '& a': {
                color: '#fff'
            }
        }
    }
    
})

export default useStyles;