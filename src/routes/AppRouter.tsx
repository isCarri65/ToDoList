import { Route, Routes } from "react-router-dom";
import { BacklogScreen } from "../components/screens/BacklogScreen/BacklogScreen";
import { SprintScreen } from "../components/screens/SprintScreen/SprintScreen";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<BacklogScreen />} />
        <Route path="/Sprints/:id" element={<SprintScreen />} />
      </Routes>
    </>
  );
};
