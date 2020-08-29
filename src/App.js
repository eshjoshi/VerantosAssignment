import React, { useState } from 'react';
import './App.css';
import SearchAppbar from './Appbar/Appbar';
import SearchFilterPage from './SearchFilter/SearchFilterPage';
import SearchResultPage from './SearchResult/SearchResultPage';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Flights from './FlightData';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperFixed: {
    position: 'fixed'
  },
  containerSpecing: {
    marginTop: '3.8%'
  }
}));

function App() {
  const classes = useStyles();
  const [flightData, setFlightData] = useState(Flights);
  // console.log(flightData);
  const searchFilter = (event, filterData) => {
    console.log(event);
    console.log(filterData);
   setFlightData(filterData);
  }
  return (flightData &&
    <div className={classes.root}>
      <SearchAppbar />
      <Grid container className={classes.containerSpecing} >
        <Grid item xs={3}>
          <Paper variant="outlined" square className={classes.paperFixed} >
            <SearchFilterPage searchFilter={searchFilter} flights={flightData} />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper variant="outlined" square >
            <SearchResultPage flights={flightData} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
