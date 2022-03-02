import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  DialogTitle,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

const Detail = (props?: any) => {
  const { title, open, setOpen, data } = props;
  return (
    <Dialog
      maxWidth="sm"
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent >
        <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
          Temperature:{data.current.temperature}°C
          </Typography>
          <Typography component="div" variant="h5">
          Wind Speed:{data.current.wind_speed}kM/h
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={data.current.weather_icons[0]}
        alt="weather-icon"
      />
    </Card>
      </DialogContent>
    </Dialog>
  );
};
export default Detail;
