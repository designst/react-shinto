import React from 'react';
import PropTypes from 'prop-types';

import { renderRoutes } from 'react-router-config';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const Auth = ({ route, classes }) => (
  <Grid container justify="center" alignItems="center">
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper className={classes.root}>{renderRoutes(route.routes)}</Paper>
    </Grid>
  </Grid>
);

Auth.propTypes = {
  route: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Auth);
