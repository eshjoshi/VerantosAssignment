import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function SearchPageAppBar() {
  return (
    <div >
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Flight Serach Engine
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
