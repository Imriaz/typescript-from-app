import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  footer: {
    color:"white",
    backgroundColor: "#1A76D2",
    padding: "10px",
    marginTop: "50px",
  },
});

const Footer = () => {
  const classes = useStyles();

    return (
      <div className={classes.footer}>
        <p>&copy; Md. Imriaz Uddin</p>
      </div>
    );
};

export default Footer;