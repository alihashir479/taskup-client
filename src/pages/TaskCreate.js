import { Box } from "@mui/material";
import { Container } from "@mui/system";
import TaskForm from "../components/TaskForm";
import Header from "./Header";
const TaskCreate = () => {
  return (
    <Box>
      <Header />
      <Container>
        <TaskForm mode="create"/>
      </Container>
    </Box>
  );
};
export default TaskCreate;
