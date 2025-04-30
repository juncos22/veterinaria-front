import { ChangeEvent, useEffect, useState } from "react";
import {
  Breed,
  CreatePetDTO,
  Owner,
  PetList,
  UpdatePetDTO,
} from "../utils/types";
import { genders } from "../utils/mock/data";
import usePetStore from "../store/petStore";

type PetFormProps = {
  mode: "Create" | "Edit";
  petId?: number;
  onSubmit: (form: CreatePetDTO | UpdatePetDTO) => Promise<void>;
};

export const PetForm = ({ mode, petId, onSubmit }: PetFormProps) => {
  const {
    breedResponse: { data: breeds },
    ownerResponse: { data: owners },
    petResponse: { data },
    petDetail,
    loading,
    getPetBreeds,
    getOnePet,
    getPetOwners,
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

    return () => {
      setPetForm({ name: "", breedId: 0, gender: "", ownerId: 0, id: 0 });
    };
  }, [petId, mode]);
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
        setPetForm({ name: "", breedId: 0, gender: "", ownerId: 0, id: 0 });
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
              placeholder={mode === "Edit" && petDetail ? petDetail.pet : ""}
              value={petForm.name}
              required={mode !== "Edit"}
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
              required={mode !== "Edit"}
              onChange={handleForm}
              className="mt-0.5 w-full text-center h-10 rounded border border-orange-300 shadow-sm sm:text-sm"
            >
              <option value="0">Género</option>
              {genders.map((g) => (
                <option
                  key={g.id}
                  value={g.id}
                  selected={petDetail && g.id === petDetail?.gender}
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
              required={mode !== "Edit"}
              value={petForm.breedId}
              onChange={handleForm}
              className="mt-0.5 w-full text-center h-10 rounded border border-orange-300 shadow-sm sm:text-sm"
            >
              <option value="0">Raza</option>
              {breeds &&
                (breeds as Breed[]).map((b) => (
                  <option
                    key={b.id}
                    value={b.id}
                    selected={petDetail && b.id === petDetail.breedId}
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
              required={mode !== "Edit"}
              value={petForm.ownerId}
              onChange={handleForm}
              className="mt-0.5 w-full text-center h-10 rounded border border-orange-300 shadow-sm sm:text-sm"
            >
              <option value="0">Dueño</option>
              {owners &&
                (owners as Owner[]).map((o) => (
                  <option
                    key={o.id}
                    value={o.id}
                    selected={petDetail && o.id === petDetail.ownerId}
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
    </form>
  );
};
