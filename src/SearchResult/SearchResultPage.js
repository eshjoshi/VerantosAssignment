import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { EnterOriginCity, EnterDestinationCity } from '../App'


const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
    },
    image: {
        width: '500px',
        height: '200px',
        float: 'right'
    },
    button: {
        float: 'right',
        margin: '1%'
    },
    paperSpecing: {
        padding: '2%'
    },
    paperFixed: {
        position: 'fixed'
    }
});

function SearchResultPage(props) {
    const flightData = props;
    const classes = useStyles();
    const flightFrom = useContext(EnterOriginCity)
    const flightTo = useContext(EnterDestinationCity);
    return (
        <div>
            <Paper variant="outlined" square className={classes.paperSpecing} >
                {flightFrom || flightTo ? (
                    <Typography gutterBottom variant="h5" component="h2">
                        {flightFrom} > {flightTo}
                    </Typography>) : (<Typography gutterBottom variant="h5" component="h2">From > To </Typography>)
                }
            </Paper>
            <Paper variant="outlined" square className={classes.paperSpecing}>
                {flightData.flights.map((flight) => (
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                className={classes.image}
                                image="https://www.thestatesman.com/wp-content/uploads/2018/01/AIR-INDIA.jpg"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    RS {flight.fare}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {flight.flight_id}
                                </Typography>
                                <Typography variant="body1" component="h6">
                                    {flight.source_code} > {flight.destination_code}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Depart:- {flight.departs_at}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Arrive:- {flight.arrives_at}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <Button variant="contained" color="primary" className={classes.button}>
                            Book this Flight
                        </Button>

                    </Card>
                ))
                }
            </Paper>
        </div>
    )
}
SearchResultPage.propTypes = {
    flightData: PropTypes.shape({
        flights: PropTypes.array.isRequired,

    }).isRequired,
};

export default SearchResultPage
