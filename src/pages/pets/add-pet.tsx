import { PetForm } from "../../components/pet-form";
import usePetStore from "../../store/petStore";
import { Loader } from "../../components/loader";
import { Alert } from "../../components/alert";
import { useNavigate } from "react-router";
import { Layout } from "../../components/layout";
import useAuthStore from "../../store/authStore";
import { useEffect, useState } from "react";
import { DialogComponent } from "../../components/dialog";
import { OwnerForm } from "../../components/owner-form";
import useOwnerStore from "../../store/ownerStore";
import useBreedStore from "../../store/breedStore";

export default function AddPetPage() {
  const [openOwnerModal, setOpenOwnerModal] = useState(false);
  const [openBreedModal, setOpenBreedModal] = useState(false);
  const [breed, setBreed] = useState("");
  const { loading, savePet, message, error, getPetOwners, getPetBreeds } =
    usePetStore();
  const ownerState = useOwnerStore();
  const breedState = useBreedStore();
  const authState = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.authenticated) {
      navigate("/");
    }
  }, [authState.authenticated]);

  return (
    <Layout>
      <div>
        <h3 className="text-2xl text-orange-800 text-center my-3">
          Registrá a tu Mascota Acá
        </h3>

        <div className="flex flex-wrap items-center justify-start">
          <button
            className="inline-block w-[12%] h-auto mx-3 rounded-full border border-orange-600 py-2 text-xs font-medium text-orange-600 hover:bg-orange-600 cursor-pointer hover:text-white focus:ring-3 focus:outline-hidden"
            onClick={() => setOpenOwnerModal(true)}
          >
            Nuevo Dueño
          </button>
          <button
            className="inline-block w-[12%] h-auto mx-3 rounded-full border border-orange-600 py-2 text-xs font-medium text-orange-600 hover:bg-orange-600 cursor-pointer hover:text-white focus:ring-3 focus:outline-hidden"
            onClick={() => setOpenBreedModal(true)}
          >
            Nueva Raza
          </button>
        </div>
        {message && (
          <Alert
            extraClasses="bg-green-500 text-black size-10"
            text={message}
            title="Registro de mascota"
          />
        )}
        {error && (
          <Alert
            extraClasses="bg-red-500 text-black size-10"
            text={error}
            title="Error"
          />
        )}
        {loading && <Loader bg="orange" color="green" size={50} />}
        <PetForm
          mode="Create"
          onSubmit={async (form) => {
            await savePet({
              name: form.name,
              breedId: form.breedId,
              gender: form.gender,
              ownerId: form.ownerId,
            });
            if (!error) {
              setTimeout(() => {
                navigate("/pets");
              }, 2000);
            }
          }}
        />

        <DialogComponent
          isOpen={openOwnerModal}
          onClose={() => setOpenOwnerModal(false)}
          title="Nuevo Dueño"
        >
          <OwnerForm
            onSubmit={async (data) => {
              console.log(data);
              await ownerState.saveOwner(data);
              await getPetOwners();
              setOpenOwnerModal(false);
            }}
          />
        </DialogComponent>

        <DialogComponent
          isOpen={openBreedModal}
          onClose={() => setOpenBreedModal(false)}
          title="Nueva Raza"
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              // console.log("Sent:", breed);
              await breedState.saveBreed(breed);
              await getPetBreeds();
              setOpenBreedModal(false);
            }}
          >
            <label htmlFor="Breed" className="relative">
              <input
                type="text"
                id="Breed"
                placeholder=""
                name="breed"
                required
                onChange={(e) => setBreed((_prev) => e.target.value)}
                className="peer mt-10 h-13 text-center outline-none w-full rounded border-orange-300 shadow-sm md:text-lg sm:text-sm"
              />

              <span className="absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-orange-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
                Raza
              </span>
            </label>

            <button
              type="submit"
              disabled={breedState.loading}
              className="group w-full text-center text-orange-500 my-5 inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white cursor-pointer focus:ring-3 focus:outline-hidden disabled:bg-gray-500"
            >
              <span className="block rounded-full bg-white px-8 py-3 text-md font-bold group-hover:bg-transparent">
                Guardar Raza
              </span>
            </button>

            {breedState.error && (
              <Alert
                text={breedState.error}
                title="Owner Error"
                extraClasses="size-10 text-black bg-red-500"
              />
            )}
          </form>
        </DialogComponent>

        {ownerState.error && (
          <Alert
            text={ownerState.error}
            title="Owner Error"
            extraClasses="size-10 text-black bg-red-500"
          />
        )}
      </div>
    </Layout>
  );
}
