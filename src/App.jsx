import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Hello from "./page";
import Layout from "./layout";
import Shahada from "./page/shahada/shahada";
import ShahadaArb from "./page/shahada-arb/shahadaArb";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Hello /> },
      { path: "shahada", element: <Shahada /> },
      { path: "shahada-arabic", element: <ShahadaArb /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
