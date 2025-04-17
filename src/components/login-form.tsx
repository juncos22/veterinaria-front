import React, { ChangeEvent, useState } from "react";
import { LoginUserDTO } from "../utils/types";

type LoginFormProps = {
  onSubmit: (data: LoginUserDTO) => Promise<void>;
};
export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [userForm, setUserForm] = useState<LoginUserDTO>({
    email: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit(userForm);
      }}
      className="block w-fit m-auto my-10 rounded-md border border-gray-300 p-4 shadow-sm sm:p-6"
    >
      <div className="flex flex-col sm:flex sm:justify-between sm:gap-4 lg:gap-6">
        <div className="mt-4 sm:mt-0">
          <h3 className="text-lg font-bold text-center text-pretty text-orange-900">
            Ingresá tus Credenciales
          </h3>

          <label htmlFor="Email" className="relative">
            <input
              type="email"
              id="Email"
              placeholder=""
              name="email"
              required
              onChange={handleChange}
              className="peer mt-10 h-13 text-center outline-none w-full rounded border-orange-300 shadow-sm md:text-lg sm:text-sm"
            />

            <span className="absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-orange-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
              Email
            </span>
          </label>

          <label htmlFor="Password" className="relative">
            <input
              type="password"
              id="Password"
              placeholder=""
              name="password"
              required
              onChange={handleChange}
              className="peer mt-10 h-13 text-center outline-none w-full rounded border-orange-300 shadow-sm md:text-lg sm:text-sm"
            />

            <span className="absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-orange-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
              Password
            </span>
          </label>

          {/* Pill */}

          <button
            type="submit"
            className="group w-full text-center text-orange-500 my-5 inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white cursor-pointer focus:ring-3 focus:outline-hidden"
          >
            <span className="block rounded-full bg-white px-8 py-3 text-md font-bold group-hover:bg-transparent">
              Ingresar
            </span>
          </button>

          <div className="flex items-center justify-evenly">
            <a
              href="#"
              className="mt-4 line-clamp-2 text-sm text-pretty text-orange-700"
            >
              ¿Olvidaste tus credenciales?
            </a>
            <a
              href="#"
              className="mt-4 line-clamp-2 text-sm text-pretty text-orange-900"
            >
              ¿No posee una cuenta?
            </a>
          </div>
        </div>
      </div>
    </form>
  );
};
