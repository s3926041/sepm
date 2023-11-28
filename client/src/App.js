
import NotFound from "./page/NotFound";


import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { checkTokenExpiration } from "./service/authService";


function App() {
  // checkTokenExpiration();
 
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
