import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import moment from 'moment';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },

    },

}));



function SearchFilterPage(props) {
    const flightData = props;

    const passengersValues = [{
        value: "1",
        label: 'One',
    },
    {
        value: "2",
        label: 'Two',
    },
    {
        value:"3",
        label: 'Three',
    },
    {
        value: "4",
        label: 'Four',
    }

    ];

    const classes = useStyles();
    const [despartureDate, setDespartureDate] = useState(null);
    const onDepartureDateChnage = (event) => {
        setDespartureDate(moment(event.target.value).format('LT'));
    }


    const [passengers, setPassengers] = useState("");
    const onPassengersChange = (event) => {
        console.log(event.target.value);
        setPassengers(event.target.value);
    }

    const [selectedData, setSelectedData] = useState(flightData.flights);
    const onClickSearch = (event) => {

        console.log(selectedData);
        let filterData;
        if (flightData.destinationCity.toUpperCase() !== "" && flightData.originCity.toUpperCase() !== "" && despartureDate !== null && passengers !== "") {
            filterData = selectedData.filter((value) => value.destination.toUpperCase() === flightData.destinationCity.toUpperCase()
                && value.source.toUpperCase() === flightData.originCity.toUpperCase() && value.departs_at === despartureDate && value.passengers === passengers);
        }
        else if (flightData.destinationCity.toUpperCase() !== "" && flightData.originCity.toUpperCase() !== "") {
            filterData = selectedData.filter((value) => value.destination.toUpperCase() === flightData.destinationCity.toUpperCase()
                && value.source.toUpperCase() === flightData.originCity.toUpperCase()
            );
        }
        else if ((flightData.destinationCity.toUpperCase() !== "" && flightData.originCity.toUpperCase() !== "") && despartureDate !== null) {
            filterData = selectedData.filter((value) => value.destination.toUpperCase() === flightData.destinationCity.toUpperCase()
                && value.source.toUpperCase() === flightData.originCity.toUpperCase() && value.departs_at === despartureDate
            );
        }
        else if ((flightData.destinationCity.toUpperCase() !== "" && flightData.originCity.toUpperCase() !== "") && passengers !== "") {
            filterData = selectedData.filter((value) => value.destination.toUpperCase() === flightData.destinationCity.toUpperCase()
                && value.source.toUpperCase() === flightData.originCity.toUpperCase() && value.passengers === passengers
            );
        }
        else if(despartureDate !== null && passengers !== ""){
            filterData = selectedData.filter((value) => value.departs_at === despartureDate && value.passengers === passengers
            );
        }  
        else if (flightData.originCity.toUpperCase() !== "") {
            filterData = selectedData.filter((value) => value.source.toUpperCase() === flightData.originCity.toUpperCase());
        }
        else if (flightData.destinationCity.toUpperCase() !== "") {
            filterData = selectedData.filter((value) => value.destination.toUpperCase() === flightData.destinationCity.toUpperCase());
        }
        else if (despartureDate !== null) {
            filterData = selectedData.filter((value) => value.departs_at === despartureDate);
        }
        else if (passengers !== "" ) {
            filterData = selectedData.filter((value) => value.passengers === passengers);
        }

        return flightData.searchFilter(event, filterData)
    }

    return (
        <div className={classes.root}>
            <Typography variant="h6" color="inherit">
                One way
            </Typography>
            <form className={classes.root} validate autoComplete="on">
                <TextField id="standard-basic"  label="Enter Origin City" onChange={(event) => flightData.onChangeSource(event)} value={flightData.originCity} />
                <TextField id="standard-basic" label="Enter Destination City" onChange={(event) => flightData.onChangeDestination(event)} value={flightData.destinationCity} disabled={!flightData.originCity.toUpperCase()} />
                <TextField
                    id="datetime-local"
                    label="Departure Date"
                    type="datetime-local"
                    // defaultValue="2017-05-24T10:30"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event) => onDepartureDateChnage(event)}
                />

                <InputLabel id="demo-simple-select-label">Passengers</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={passengers}
                    onChange={onPassengersChange}
                >
                    {passengersValues.map((option) => (
                        <MenuItem value={option.value}>{option.label}</MenuItem>
                    ))}

                </Select>

                <Button variant="contained" color="primary" onClick={onClickSearch} disabled={!(despartureDate!==null || passengers!==""||(flightData.destinationCity.toUpperCase() !== "" && flightData.originCity.toUpperCase() !== ""))}>
                    Search
                </Button>
            </form>

            <div className={classes.root}>
                <Typography id="range-slider" gutterBottom>
                    Refine Flight Search
                </Typography>
                <Slider
                    value={flightData.sliderValue}
                    onChange={flightData.onSliderChange}
                    aria-labelledby="range-slider"
                    getAriaValueText={flightData.valuetext}
                    valueLabelDisplay="on"
                    defaultValue={0}
                    min={0}
                    max={20000}
                />
            </div>
        </div>
    )
}

SearchFilterPage.propTypes = {
    flightData: PropTypes.shape({
        flights: PropTypes.array.isRequired,

    }).isRequired,
};

export default SearchFilterPage;
