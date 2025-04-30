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
  const {
    petDetail,
    petResponse: { success, message },
    loading,
    getOnePet,
  } = usePetStore();
  const {
    loading: loading2,
    saveMedication,
    medicationResponse,
  } = useMedicationStore();
  const { authenticated } = useAuthStore();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!authenticated) {
      navigate("/");
    }
    if (params.id) {
      getOnePet(parseInt(params.id));
    }
  }, [params.id, authenticated]);

  return (
    <Layout>
      <>
        {loading && (
          <Loader
            additionalClasses1="size-10 bg-transparent"
            additionalClasses2="text-orange-500"
          />
        )}
        {message && (
          <Alert
            extraClasses={`bg-${
              success ? "green" : "red"
            }-500 text-black size-10`}
            text={message}
            title={success ? "Exito" : "Error"}
          />
        )}
        {petDetail && (
          <div>
            <h3 className="text-3xl text-orange-800 text-center">
              Datos de la Mascota
            </h3>
            <div className="flex flex-wrap gap-y-5 items-center md:items-start justify-center md:justify-between">
              <div className="flex flex-col items-center md:items-start w-fit ml-10 mt-3">
                <div>
                  <span className="text-orange-500 font-bold">Nombre: </span>{" "}
                  <span>{petDetail.pet}</span>
                </div>
                <div>
                  <span className="text-orange-500 font-bold">Género:</span>{" "}
                  <span>
                    {petDetail.gender === "M" ? "Masculino" : "Femenino"}
                  </span>
                </div>
                <div>
                  <span className="text-orange-500 font-bold">Raza:</span>{" "}
                  <span>{petDetail.breed}</span>
                </div>
                <div>
                  <span className="text-orange-500 font-bold">Dueño: </span>{" "}
                  <span>{petDetail.owner}</span>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end w-fit mr-10 mt-3">
                <span className="text-xl">Medicación/es: </span>
                {petDetail.medications.length > 0 && (
                  <div className="flex flex-wrap">
                    {petDetail.medications.map((m) =>
                      m.id != null && m.name != null ? (
                        <span
                          key={m.id}
                          className="rounded-full my-3 bg-orange-100 px-2.5 py-0.5 text-sm whitespace-nowrap text-orange-700"
                        >
                          {m.name}
                        </span>
                      ) : (
                        <span>No tiene</span>
                      )
                    )}
                  </div>
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
              form = { ...form, petId: petDetail?.id };
              // console.log(form);
              setOpenModal(false);
              await saveMedication(form);
              await getOnePet(petDetail?.id!);
            }}
          />
        </DialogComponent>
        {loading2 && (
          <Loader
            additionalClasses1="size-10 bg-transparent"
            additionalClasses2="text-orange-500"
          />
        )}
        {medicationResponse.message && (
          <Alert
            extraClasses={`size-10 bg-${
              medicationResponse.success === true ? "green" : "red"
            }-500 text-black`}
            text={medicationResponse.message}
            title={
              medicationResponse.success && medicationResponse.success === true
                ? "Exito"
                : "Error"
            }
          />
        )}
      </>
    </Layout>
  );
}
