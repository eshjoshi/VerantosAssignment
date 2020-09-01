import React, { useState, createContext } from 'react';
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
const EnterOriginCity = createContext();
const EnterDestinationCity = createContext();


function App() {
  const classes = useStyles();
  const valuetext = (sliderValue) => {
    return `RS ${sliderValue}`;
  }

  const [sliderValue, setSliderValue] = useState([0, 20000]);
  const [flightData, setFlightData] = useState(Flights);
  const searchFilter = (event, data) => {
    setFlightData(data);
  }
  const sliderChange = (event, newValue) => {
    setSliderValue(newValue);
    setFlightData(Flights.filter((value) => value.fare < newValue[1] && value.fare > newValue[0]));
  };

  const [originCity, setOriginCity] = useState("")
  const originCityChange = (event) => {
    setOriginCity(event.target.value);
  }

  const [destinationCity, setDestinationCity] = useState("")
  const destinationCityChange = (event) => {
    setDestinationCity(event.target.value);
  }



  return (
    <div className={classes.root}>
      <SearchAppbar />
      <Grid container className={classes.containerSpecing} >
        <Grid item xs={3}>
          <Paper variant="outlined" square className={classes.paperFixed} >
            <SearchFilterPage
              searchFilter={searchFilter}
              flights={flightData}
              onChangeSource={originCityChange}
              originCity={originCity}
              onChangeDestination={destinationCityChange}
              destinationCity={destinationCity}
              onSliderChange={sliderChange}
              sliderValue={sliderValue}
              valuetext={valuetext}
            />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper variant="outlined" square >
            <EnterOriginCity.Provider value={originCity?originCity:""}>
              <EnterDestinationCity.Provider value={destinationCity?destinationCity:""}>
                <SearchResultPage flights={flightData} />
              </EnterDestinationCity.Provider>
            </EnterOriginCity.Provider>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
export { EnterOriginCity, EnterDestinationCity };
