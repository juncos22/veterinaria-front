import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import PetsPage from "./pages/pets/index";
import AddPetPage from "./pages/pets/add-pet";
import PetDetailsPage from "./pages/pets/details";

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/pets",
    Component: PetsPage,
  },
  { path: "/pets/new", Component: AddPetPage },
  { path: "/pets/:id", Component: PetDetailsPage },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
