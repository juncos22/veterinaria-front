import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import PetsPage from "./pages/pets/index";
import AddPetPage from "./pages/pets/add-pet";
import PetDetailsPage from "./pages/pets/details";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";

const router = createBrowserRouter([
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
  { path: "/auth/login", Component: LoginPage },
  { path: "/auth/register", Component: RegisterPage },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
