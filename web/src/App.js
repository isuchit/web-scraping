import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import ProTip from "./ProTip";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import HttpIcon from "@material-ui/icons/Http";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import axios from "axios";
import Collapse from "@material-ui/core/Collapse";
import Paper from "@material-ui/core/Paper";
import ReactJson from "react-json-view";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  justifyGrid: {
    justifyContent: "center",
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://suchitrotti.com/">
        suchitrotti
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function App() {
  const classes = useStyles();

  const [url, setUrl] = useState(null);
  const [scrapedData, setScrapedData] = useState({});
  const [collapse, setCollapse] = useState(false);

  const getScrapData = async () => {
    try {
      let baseUrl = "https://api.suchitrotti.com/scrape/";
      let data = {
        url: url,
      };
      let response = await axios.post(baseUrl, data);
      setScrapedData(response.data);
      setCollapse(true);
    } catch (error) {
      setUrl(null);
      setCollapse(false);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Web Scraper
          </Typography>
          <Button href="lcov-report/index.html" color="inherit">Unit Test Report</Button>
          <Button href="api-report.html" color="inherit">API Test Report</Button>
          <IconButton
            href="https://github.com/isuchit/web-scraping"
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography align="center" variant="h5" component="h5" gutterBottom>
            Web Application Scrapper
          </Typography>
         <br/><br/>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              getScrapData();
            }}
          >
            <Grid
              className={classes.justifyGrid}
              container
              spacing={1}
              alignItems="center"
            >
              <Grid item>
                <HttpIcon />
              </Grid>
              <Grid item>
                <TextField
                  onChange={(e) => {
                    setUrl(e.target.value);
                  }}
                  id="input-with-icon-grid"
                  label="Enter Web App Url"
                  placeholder="https://www.apple.com/in/"
                />
              </Grid>
              <IconButton
                type="submit"
                disabled={!url}
                color="inherit"
                aria-label="menu"
              >
                <ArrowForwardIcon />
              </IconButton>
            </Grid>
          </form>
          <br />
          <Collapse in={collapse}>
            <Paper elevation={3}>
              <ReactJson src={scrapedData} />
            </Paper>
          </Collapse>
          <br />
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
