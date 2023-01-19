import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../services/api";
import { setTask } from "../Redux/Task";
import { Box, Container } from "@mui/system";
import Header from "./Header";
import TaskForm from "../components/TaskForm";

const Task = () => {
  const { id } = useParams();
  const [currentTask , setCurrentTask] = useState(null)
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchTask() {
      await axiosInstance.get(`/task/${id}`).then((res) => {
        setCurrentTask(res.data.task)
        dispatch(setTask(res.data.task));
      });
    }
    fetchTask()
  }, [id , dispatch]);
 
  if (!currentTask) {
    return;
  }
  return (
    <Box>
      <Header />
      <Container>
        <TaskForm task={currentTask} />
      </Container>
    </Box>
  );
};

export default Task;
