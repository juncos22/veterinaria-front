import { ChangeEvent, useEffect, useState } from "react";
import { CreatePetDTO, UpdatePetDTO } from "../utils/types";
import { genders } from "../utils/mock/data";
import usePetStore from "../store/petStore";
import { Alert } from "./alert";
// import { validateForm } from "../utils/validations/pet-form";

type PetFormProps = {
  mode: "Create" | "Edit";
  petId?: number;
  onSubmit: (form: CreatePetDTO | UpdatePetDTO) => Promise<void>;
};

export const PetForm = ({ mode, petId, onSubmit }: PetFormProps) => {
  const {
    breeds,
    loading,
    pet,
    getPetBreeds,
    getOnePet,
    getPetOwners,
    owners,
    error,
  } = usePetStore();
  const [petForm, setPetForm] = useState<CreatePetDTO | UpdatePetDTO>({});

  useEffect(() => {
    getPetBreeds();
    getPetOwners();
  }, []);

  useEffect(() => {
    if (mode === "Edit" && petId) {
      getOnePet(petId);
    }
  }, [petId]);

  const handleForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // console.log(e.target.name, e.target.value);
    setPetForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // setFormDisabled(!validateForm(petForm));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // console.log(petForm);
        onSubmit(petForm);
      }}
      className="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6 w-fit mx-auto"
    >
      <div className="sm:flex-col sm:justify-between sm:gap-4 lg:gap-6">
        <div className="mt-4 sm:mt-0">
          <h3 className="text-lg font-medium text-pretty text-gray-900">
            Datos de tu Mascota
          </h3>
        </div>
      </div>

      <dl className="mt-6 flex-col gap-4 lg:gap-6">
        <div className="my-5">
          <label htmlFor="name">
            <span className="text-sm font-medium text-orange-700">
              Nombre de tu mascota
            </span>

            <input
              type="text"
              id="name"
              name="name"
              placeholder={mode === "Edit" && pet ? pet.pet : ""}
              value={petForm.name}
              required
              onChange={handleForm}
              className="mt-0.5 w-full text-center rounded border border-orange-300 shadow-sm sm:text-sm h-10"
            />
          </label>
        </div>

        <div className="my-5">
          <label htmlFor="Gender">
            <span className="text-sm font-medium text-orange-700">
              {" "}
              Género de tu Mascota{" "}
            </span>

            <select
              name="gender"
              value={petForm.gender}
              id="Gender"
              required
              onChange={handleForm}
              className="mt-0.5 w-full text-center h-10 rounded border border-orange-300 shadow-sm sm:text-sm"
            >
              <option value="0">Género</option>
              {genders.map((g) => (
                <option
                  key={g.id}
                  value={g.id}
                  selected={pet && g.id === pet.gender}
                >
                  {g.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="my-5">
          <label htmlFor="Breed">
            <span className="text-sm font-medium text-orange-700">
              {" "}
              Raza de tu Mascota{" "}
            </span>

            <select
              name="breedId"
              id="Breed"
              required
              value={petForm.breedId}
              onChange={handleForm}
              className="mt-0.5 w-full text-center h-10 rounded border border-orange-300 shadow-sm sm:text-sm"
            >
              <option value="0">Raza</option>
              {breeds.map((b) => (
                <option
                  key={b.id}
                  value={b.id}
                  selected={pet && b.id === pet.breedId}
                >
                  {b.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="my-5">
          <label htmlFor="Owner">
            <span className="text-sm font-medium text-orange-700"> Dueño </span>

            <select
              name="ownerId"
              id="Owner"
              required
              value={petForm.ownerId}
              onChange={handleForm}
              className="mt-0.5 w-full text-center h-10 rounded border border-orange-300 shadow-sm sm:text-sm"
            >
              <option value="0">Dueño</option>
              {owners.map((o) => (
                <option
                  key={o.id}
                  value={o.id}
                  selected={pet && o.id === pet.ownerId}
                >
                  {o.fullName}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="my-5">
          <button
            disabled={loading}
            className="inline-block rounded-sm border border-orange-600 bg-orange-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-orange-600 focus:ring-3 focus:outline-hidden w-full transition-colors delay-75 cursor-pointer disabled:bg-orange-300 disabled:text-gray-600"
            type="submit"
          >
            {mode === "Create" ? `Registrar` : `Actualizar`} Mascota
          </button>
        </div>
      </dl>
      {error && (
        <Alert title="Error" text={error} extraClasses="size-8 color-red" />
      )}
    </form>
  );
};
