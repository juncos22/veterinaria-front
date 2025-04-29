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
import { PetList } from "../../utils/types";

export default function PetDetailsPage() {
  const { petResponse, loading, getOnePet } = usePetStore();
  const {
    loading: loading2,
    saveMedication,
    medicationResponse: { message, success },
  } = useMedicationStore();
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
        {!petResponse.success && petResponse.message && (
          <Alert
            extraClasses="bg-red-500 text-black size-10"
            text={petResponse.message}
            title="Error"
          />
        )}
        {petResponse.data && (
          <div>
            <h3 className="text-3xl text-orange-800 text-center">
              Datos de la Mascota
            </h3>
            <div className="flex flex-wrap gap-y-5 items-center md:items-start justify-center md:justify-between">
              <div className="flex flex-col items-center md:items-start w-fit ml-10 mt-3">
                <div>
                  <span className="text-orange-500 font-bold">Nombre: </span>{" "}
                  <span>{(petResponse.data as PetList).pet}</span>
                </div>
                <div>
                  <span className="text-orange-500 font-bold">Género:</span>{" "}
                  <span>
                    {(petResponse.data as PetList).gender === "M"
                      ? "Masculino"
                      : "Femenino"}
                  </span>
                </div>
                <div>
                  <span className="text-orange-500 font-bold">Raza:</span>{" "}
                  <span>{(petResponse.data as PetList).breed}</span>
                </div>
                <div>
                  <span className="text-orange-500 font-bold">Dueño: </span>{" "}
                  <span>{(petResponse.data as PetList).owner}</span>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end w-fit mr-10 mt-3">
                <span className="text-xl">Medicación/es: </span>
                {(petResponse.data as PetList).medications &&
                (petResponse.data as PetList).medications.length > 0 ? (
                  <div className="flex flex-wrap">
                    {(petResponse.data as PetList).medications.map((m) => (
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
              form = { ...form, petId: (petResponse.data as PetList)?.id };
              // console.log(form);
              setOpenModal(false);
              await saveMedication(form);
              if (success && message) {
                if ((petResponse.data as PetList)?.id) {
                  getOnePet((petResponse.data as PetList)?.id);
                }
              }
            }}
          />
        </DialogComponent>
        {loading2 && <Loader bg="orange" color="black" size={30} />}
        {!success && message && (
          <Alert
            extraClasses="size-10 bg-red-500 text-black"
            text={message}
            title="Error"
          />
        )}
        {success && message && (
          <Alert
            extraClasses="size-10 bg-green-500 text-black"
            text={message}
            title="Exito"
          />
        )}
      </>
    </Layout>
  );
}
