import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Hello from "./page";
import Layout from "./layout";
import Shahada from "./page/shahada/shahada";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Hello /> },
      { path: "shahada", element: <Shahada /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
