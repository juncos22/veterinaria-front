import React from "react";

export const NavMenu = () => {
  return (
    <nav className="bg-orange-800 w-full h-fit py-3 px-3">
      <a href="/">
        <div className="flex gap-x-3 items-center justify-center md:justify-start">
          <img src="/brand.png" alt="" className="size-15 rounded-full" />
          <span className="text-2xl text-center text-white">
            Veterinaria {`"${"Caninos"}"`}
          </span>
        </div>
      </a>
      <ul className="flex flex-wrap items-center justify-center md:justify-end gap-x-3 text-white font-medium">
        <li className="hover:text-orange-300 cursor-pointer transition-colors delay-75">
          <a href="/">Inicio</a>
        </li>
        <li className="hover:text-orange-300 cursor-pointer transition-colors delay-75">
          <a href="/pets">Mascotas</a>
        </li>
        {/* Manejo de cuentas de usuario en caso de loguearse */}
        <li className="hover:text-orange-300 cursor-pointer transition-colors delay-75">
          Ingresar
        </li>
      </ul>
    </nav>
  );
};
