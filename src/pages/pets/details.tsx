import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import usePetStore from "../../store/petStore";
import { Layout } from "../../components/layout";
import { Loader } from "../../components/loader";
import { Alert } from "../../components/alert";
import { DialogComponent } from "../../components/dialog";
import { MedicationForm } from "../../components/medication-form";
import useMedicationStore from "../../store/medicationStore";
import useAuthStore from "../../store/authStore";

export default function PetDetailsPage() {
  const { pet, loading, error, getOnePet } = usePetStore();
  const state = useMedicationStore();
  const { authenticated } = useAuthStore();
  const params = useParams();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/");
    }
    if (params.id) {
      getOnePet(parseInt(params.id));
    }
  }, [params.id]);

  return (
    <Layout>
      <>
        {loading && <Loader bg="orange" color="green" size={50} />}
        {error && (
          <Alert
            extraClasses="bg-red-500 text-black size-10"
            text={error}
            title="Error"
          />
        )}
        {pet && (
          <div>
            <h3 className="text-3xl text-orange-800 text-center">
              Datos de la Mascota
            </h3>
            <div className="flex flex-wrap gap-y-5 items-center md:items-start justify-center md:justify-between">
              <div className="flex flex-col items-center md:items-start w-fit ml-10 mt-3">
                <div>
                  <span className="text-orange-500 font-bold">Nombre: </span>{" "}
                  <span>{pet.pet}</span>
                </div>
                <div>
                  <span className="text-orange-500 font-bold">Género:</span>{" "}
                  <span>
                    {pet.gender === "Male" ? "Masculino" : "Femenino"}
                  </span>
                </div>
                <div>
                  <span className="text-orange-500 font-bold">Raza:</span>{" "}
                  <span>{pet.breed}</span>
                </div>
                <div>
                  <span className="text-orange-500 font-bold">Dueño: </span>{" "}
                  <span>{pet.owner}</span>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end w-fit mr-10 mt-3">
                <span className="text-xl">Medicación/es: </span>
                {pet.medications && pet.medications.length > 0 ? (
                  <div className="flex flex-wrap">
                    {pet.medications.map((m) => (
                      <span
                        key={m}
                        className="rounded-full my-3 bg-orange-100 px-2.5 py-0.5 text-sm whitespace-nowrap text-orange-700"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span>No tiene</span>
                )}
              </div>
            </div>
          </div>
        )}
        <button
          className="border border-orange-600 rounded-2xl px-3 hover:bg-orange-600 hover:text-white font-medium text-orange-600 md:right-0 md:fixed mr-5 mb-3 cursor-pointer"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Nueva Medicación
        </button>
        <DialogComponent
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title="Nueva Medicación"
        >
          <MedicationForm
            onSubmit={async (form) => {
              form = { ...form, petId: pet?.id };
              // console.log(form);
              setOpenModal(false);
              await state.saveMedication(form);
              if (!state.error) {
                if (pet?.id) {
                  getOnePet(pet?.id);
                }
              }
            }}
          />
        </DialogComponent>
        {state.loading && <Loader bg="orange" color="black" size={30} />}
        {state.error && (
          <Alert
            extraClasses="size-10 bg-red-500 text-black"
            text={state.error}
            title="Error"
          />
        )}
        {state.message && (
          <Alert
            extraClasses="size-10 bg-green-500 text-black"
            text={state.message}
            title="Exito"
          />
        )}
      </>
    </Layout>
  );
}
