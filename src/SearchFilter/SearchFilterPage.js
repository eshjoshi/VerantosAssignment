import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },

    },

}));

function valuetext(value) {
    return `RS ${value}`;
}
function SearchFilterPage(props) {
    const passengers = [{
        value: '1',
        label: 'One',
    },
    {
        value: '2',
        label: 'Two',
    },
    {
        value: '3',
        label: 'Three',
    }]

    const [value, setValue] = useState([0, 100000]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const classes = useStyles();
    const [selectedData, setSelectedData] = useState(props.flights);
    console.log("flights",selectedData);

    const [originCity, setOriginCity] = useState(""  )
    const originCityChange = (event) => {
        setOriginCity(event.target.value);
        console.log(event.target.value)
        const originCityData = selectedData.filter(value => value.source === event.target.value)
        setSelectedData(originCityData);
    }

    const [destinationCity, setDestinationCity] = useState("")
    const destinationCityChange = (event) => {
        setDestinationCity(event.target.value);
        console.log(event.target.value)
        const destinationCityData = selectedData.filter(value => value.destination === event.target.value)
        setSelectedData(destinationCityData);
    }

    return (
        <div className={classes.root}>
            <Typography variant="h6" color="inherit">
                One way
            </Typography>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Enter Origin City" onChange={originCityChange} value={originCity} />
                <TextField id="standard-basic" label="Enter Destination City" onChange={destinationCityChange} value={destinationCity}/>
                <TextField
                    id="datetime-local"
                    label="departure Date"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="datetime-local"
                    label="Return Date"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="standard-select-currency"
                    select
                    label="Passengers"
                // value={currency}
                // onChange={handleChange}

                >
                    {passengers.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <Button variant="contained" color="primary" onClick={(event) => props.searchFilter(event, selectedData)}>
                    Search
                </Button>
            </form>

            <div className={classes.root}>
                <Typography id="range-slider" gutterBottom>
                    Refine Flight Search
                </Typography>
                <Slider
                    value={value}
                    onChange={handleChange}
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    valueLabelDisplay="on"
                    defaultValue={0}
                    min={0}
                    max={100000}
                />
            </div>
        </div>
    )
}

export default SearchFilterPage
