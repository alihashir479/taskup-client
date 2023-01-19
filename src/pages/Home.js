import Header from "./Header";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import axiosInstance from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../Redux/Task";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Task from "../components/Task";
import { Link } from "react-router-dom";
const Home = () => {
  const dispatch = useDispatch();
  const [typeFilter, setTypeFilter] = useState("");
  const [dayFilter, setDayFilter] = useState("");
  const types = ["default", "personal", "shopping", "wishlist", "work"];
  const days = [
    { label: "Today", value: "today" },
    { label: "Last Seven", value: "seven" },
    { label: "Last Thirty", value: "thirty" },
  ];

  useEffect(() => {
    axiosInstance
      .get(`/task?type=${typeFilter}&day=${dayFilter}`)
      .then((res) => {
        dispatch(setTasks(res.data.tasks));
      })
      .catch((err) => {});
  }, [typeFilter, dayFilter]);

  const { tasks } = useSelector((state) => state.task);

  const handleTypeChange = (e) => {
    setTypeFilter(e.target.value);
  };
  return (
    <Box>
      <Header />
      <Container>
        <Box display="flex" justifyContent="space-between" mt="2rem">
          <FormControl style={{ minWidth: 150 }}>
            <InputLabel>Select Type</InputLabel>
            <Select value={typeFilter} onChange={handleTypeChange}>
              {types.map((type, idx) => (
                <MenuItem key={`${idx}-${type}`} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack direction="row" spacing={2}>
            {days.map((day, idx) => (
              <Button
                variant="contained"
                size="small"
                color={day.value === dayFilter ? "success" : "secondary"}
                key={`${idx}-${day.value}`}
                onClick={() => {
                  setDayFilter(day.value);
                }}
              >
                {day.label}
              </Button>
            ))}
          </Stack>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button
            onClick={() => {
              setTypeFilter("");
              setDayFilter("");
            }}
          >
            Clear filters
          </Button>
        </Box>
        <Box mt="2rem">
          <Grid container spacing={2}>
            {tasks.map((task, idx) => (
              <Grid item xs={12} md={3} key={`${idx}-${task?._id}`}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/task/${task._id}`}
                >
                  <Task task={task} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
export default Home;
