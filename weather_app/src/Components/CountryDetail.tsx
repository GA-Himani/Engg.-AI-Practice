import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { fetchedData, toShow } from "../Redux/SliceReducer";
import axios from "axios";
import {Grid,Box} from '@mui/material';
import Detail from "./ModalJson";
import Container from '@mui/material/Container';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const classes = {
  title: {
    marginBottom: "3rem",
   marginLeft :'40%'
  },
}

const CountryDetail = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dataForModal, setDataForModal]: any[] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const data: any = useSelector(fetchedData);
  const showDetail: boolean = useSelector(toShow);

  const showWeatherHandler = async (capital: any) => {
    try {
      const response: any = await axios.get(
        `http://api.weatherstack.com/current?access_key=762df29437a5db4b20e896a0e55db961&query=${capital}`
      );
      if (response.status === 200) {
        setConfirmOpen(true);
        setDataForModal(response.data);
        setShowModal(true);
      }
    } catch (err) {
      throw new Error("Cannot Fetch weather Data");
    }
  };
  console.log(data)
  return (
    <>
      {showModal ? (
        <Detail
          data={dataForModal}
          title="Capital Weather"
          open={confirmOpen}
          setOpen={setConfirmOpen}
        />
      ) : null}
      <Container >
        <h2 data-testid="weather-heading" style = {classes.title}>Weather Details</h2>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} >
      {showDetail &&
        data.map((val: any, index: number) => {
          return (
            <Grid item xs={2} sm={4} md={4} key={index}>
            <Card sx={{ maxWidth: 300}} >
              <CardMedia
                component="img"
                height="140"
                image={val.flags["svg"]}
                alt="country_flag"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Name : {val.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Capital : {val.capital}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Population : {val.population}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Latitude : {val.latlng ? val.latlng[0] : "0"}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Longitude : {val.latlng ? val.latlng[1] : "0"}
                </Typography>
    
              <Button
                style={{ marginTop: "1rem" }}
                type="submit"
                variant="contained"
                color="primary"
                disabled={!val.capital}
                onClick={(e: React.MouseEvent) =>
                  showWeatherHandler(val.capital)
                }

              >
                Capital Weather
              </Button>
              </CardContent>
            </Card>
            </Grid>
          );
        })}
        </Grid>
        </Box>
        </Container>
    </>
  );
};

export default CountryDetail;
