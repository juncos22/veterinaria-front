import { useEffect, useState } from "react";
import { Layout } from "../../components/layout";
// import { pets } from "../utils/mock/data";
import { Card } from "../../components/card";
import { SearchBox } from "../../components/search-box";
import usePetStore from "../../store/petStore";
import { Loader } from "../../components/loader";
import { DialogComponent } from "../../components/dialog";
import { Alert } from "../../components/alert";
import { PetForm } from "../../components/pet-form";
import { PetList } from "../../utils/types";
import useAuthStore from "../../store/authStore";

export default function PetsPage() {
  const { loading, petResponse, getAllPets, deletePet, updatePet } =
    usePetStore();
  const { authenticated } = useAuthStore();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [idPet, setIdPet] = useState(0);

  useEffect(() => {
    getAllPets();
  }, []);

  return (
    <Layout>
      <>
        <SearchBox
          onSearch={(data) => {
            getAllPets(data);
          }}
        />
        {loading && (
          <Loader
            additionalClasses1="bg-transparent h-fit"
            additionalClasses2="text-orange-500"
          />
        )}
        {petResponse.message && (
          <Alert
            title={petResponse.success ? "Exito" : "Error"}
            text={petResponse.message}
            extraClasses={`size-10 text-black ${
              petResponse.success ? "bg-green-500" : "bg-red-500"
            }`}
          />
        )}
        <div className="flex flex-wrap items-center justify-evenly gap-x-3 gap-y-5 my-4">
          {petResponse.data &&
            (petResponse.data as PetList[]).length > 0 &&
            (petResponse.data as PetList[]).map((p) => (
              <Card
                key={p.id}
                pet={p}
                onEdit={(id) => {
                  setIdPet((_) => id);
                  setOpenUpdateModal(true);
                }}
                onDelete={async (id) => {
                  setIdPet(id);
                  setOpenDeleteModal(true);
                }}
              />
            ))}
        </div>

        <DialogComponent
          isOpen={openDeleteModal}
          onClose={() => {
            setOpenDeleteModal(false);
          }}
          title="Eliminar mascota"
        >
          <div>
            <span className="block rounded-full bg-white px-8 py-3 text-md text-center text-black font-medium group-hover:bg-transparent">
              Está seguro/a de eliminar a la mascota?
            </span>

            <div className="flex justify-center gap-x-2">
              <button
                onClick={async () => {
                  if (idPet) {
                    await deletePet(idPet);
                    await getAllPets();
                    setOpenDeleteModal(false);
                  }
                }}
                className="inline-flex items-center gap-2 rounded-sm border border-red-600 px-8 py-3 text-red-600 hover:bg-red-600 hover:text-white focus:ring-3 focus:outline-hidden cursor-pointer"
              >
                <span className="text-sm font-medium"> Si, adelante </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-trash size-4"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </button>

              <button
                onClick={() => setOpenDeleteModal(false)}
                className="inline-flex items-center gap-2 rounded-sm border border-green-600 px-8 py-3 text-green-600 hover:bg-green-600 hover:text-white focus:ring-3 focus:outline-hidden cursor-pointer"
              >
                <span className="text-sm font-medium"> No, no lo hagas </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon size-4 icon-tabler icons-tabler-outline icon-tabler-cancel"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M18.364 5.636l-12.728 12.728" />
                </svg>
              </button>
            </div>
          </div>
        </DialogComponent>

        {idPet > 0 && idPet !== undefined && (
          <DialogComponent
            isOpen={openUpdateModal}
            onClose={() => setOpenUpdateModal(false)}
            title="Modificar datos de mascota"
          >
            <PetForm
              mode={"Edit"}
              petId={idPet}
              onSubmit={async (data) => {
                // console.log(data);
                await updatePet({
                  id: idPet,
                  breedId: data.breedId,
                  gender: data.gender,
                  name: data.name,
                  ownerId: data.ownerId,
                });
                setOpenUpdateModal(false);
                await getAllPets();
              }}
            />
          </DialogComponent>
        )}
        {authenticated && (
          <a
            className="fixed right-0 mr-5 group inline-block rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:ring-3 focus:outline-hidden"
            href="/pets/new"
          >
            <span className="block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
              Nueva Mascota
            </span>
          </a>
        )}
      </>
    </Layout>
  );
}
