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

export default function AddPetPage() {
  const [openModal, setOpenModal] = useState(false);
  const { loading, savePet, message, error, getPetOwners } = usePetStore();
  const ownerState = useOwnerStore();

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
          onSubmit={async (form) => {
            await savePet(form);
            if (!error) {
              setTimeout(() => {
                navigate("/pets");
              }, 2000);
            }
          }}
        />

        <button
          className="inline-block fixed bottom-0 right-0 mr-10 mb-10 rounded-full border border-orange-600 px-12 py-3 text-sm font-medium text-orange-600 hover:bg-orange-600 cursor-pointer hover:text-white focus:ring-3 focus:outline-hidden"
          onClick={() => setOpenModal(true)}
        >
          Nuevo Dueño
        </button>

        <DialogComponent
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title="Nuevo Dueño"
        >
          <OwnerForm
            onSubmit={async (data) => {
              console.log(data);
              await ownerState.saveOwner(data);
              await getPetOwners();
              setOpenModal(false);
            }}
          />
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
