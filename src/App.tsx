import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/appRouter";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
