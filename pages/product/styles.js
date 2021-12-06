import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    paper: {
        paddingLeft: 10,
        paddingRight: 20,
        paddingTop: 40,
        paddingBottom: 40
    },
    image: {
        paddingRight: 40,
    },
    description: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    }
})

export default useStyles;