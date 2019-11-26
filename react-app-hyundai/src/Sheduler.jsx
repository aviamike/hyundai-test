import React, { useState, useEffect, useCallback } from "react";
// import { useSelector } from "react-redux";
import { eachDayOfInterval } from "date-fns";
import { Grid, Button } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker
} from "@material-ui/pickers";
import axios from "axios";

import { useSnackbar } from "notistack";

export default function Sheduler() {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [carId, ] = useState("1");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [carData, setFetchedCarData] = useState(null);
  // /* reservations data from redux */
  // const reservations = useSelector(state => state.reservations).map(date =>
  //   date.toISOString()
  // );

  useEffect(() => {
    const fetchCarData = async () => {
      const { data } = await axios.get(`http://0.0.0.0:9000/cars/${carId}`);
      setFetchedCarData(data);
    };
    fetchCarData();
  }, [carId, endDate]);

  const handleCalendarChange = date => {
    // console.log(date.toISOString());
  };
  const handleStartDayChange = date => {
    setStartDate(date);
    if (date && endDate && date <= endDate) {
      checkPeriodAvailability({ start: date, end: endDate });
    }
  };
  const handleEndDayChange = date => {
    setEndDate(date);
    if (date && startDate && date >= startDate) {
      checkPeriodAvailability({ start: startDate, end: date });
    }
  };

  const checkPeriodAvailability = period => {
    if (!startDate && !endDate) {
      return showSnackbarNoInput();
    }
    const selectedPeriod = eachDayOfInterval({
      start: period.start,
      end: period.end
    });
    const selectedPeriodISO = selectedPeriod.map(date => date.toISOString());

    if (
      selectedPeriod.some(date =>
        carData.reservations.includes(date.toISOString())
      )
    ) {
      return showSnackbarError();
    } else {
      if (period.bookingIsDone) {
        const updateCarData = async () => {
          carData.reservations = [
            ...new Set([...carData.reservations, ...selectedPeriodISO])
          ];
          await axios.put(`http://0.0.0.0:9000/cars/${carId}`, {
            model: carData.model,
            license: carData.license,
            reservations: carData.reservations
          });
          setFetchedCarData(carData);
        };
        updateCarData();
        enqueueSnackbar("Выбранный период забронирован", {
          variant: "success"
        });
        forceUpdate();
      } else {
        showSnackbarSuccess();
      }
    }
  };

  const { enqueueSnackbar } = useSnackbar();
  const showSnackbarError = () => {
    enqueueSnackbar("Выбранный вами период не доступен для бронирования", {
      variant: "error"
    });
  };
  const showSnackbarSuccess = () => {
    enqueueSnackbar("Выбранный период доступен для бронирования", {
      variant: "success"
    });
  };
  const showSnackbarNoInput = () => {
    enqueueSnackbar("Выберите период бронирования", {
      variant: "warning"
    });
  };

  const monthStart = new Date("2019/01/01");
  const monthEnd = new Date("2019/01/31");

  return (
    <>
      {carData ? (
        <>
          <h3>
            Бронирование дат для авто модель:{carData.model} рег.номер:
            {carData.license}{" "}
          </h3>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
            <Grid container justify="center">
              <Grid item xs={6} justify="center">
                <Grid item xs={12}>
                  <KeyboardDatePicker
                    shouldDisableDate={date =>
                      carData.reservations.includes(date.toISOString())
                    }
                    autoOk
                    clearable
                    margin="normal"
                    id="start-date-picker"
                    label="Start date"
                    format="dd/MM/yyyy"
                    value={startDate}
                    onChange={handleStartDayChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                    minDate={monthStart}
                    maxDate={endDate || monthEnd}
                  />
                  <KeyboardDatePicker
                    shouldDisableDate={date =>
                      carData.reservations.includes(date.toISOString())
                    }
                    autoOk
                    clearable
                    margin="normal"
                    id="end-date-picker"
                    label="End date"
                    format="dd/MM/yyyy"
                    value={endDate}
                    onChange={handleEndDayChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                    minDate={startDate || monthStart}
                    maxDate={monthEnd}
                  />
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    checkPeriodAvailability({
                      start: startDate,
                      end: endDate,
                      bookingIsDone: true
                    })
                  }
                >
                  Забронировать
                </Button>
              </Grid>
              <DatePicker
                value={monthStart}
                shouldDisableDate={date =>
                  carData.reservations.includes(date.toISOString())
                }
                readOnly
                variant="static"
                margin="normal"
                onChange={handleCalendarChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
}
