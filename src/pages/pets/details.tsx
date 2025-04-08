import React, { useEffect } from "react";
import { useParams } from "react-router";
import usePetStore from "../../store/petStore";
import { Layout } from "../../components/layout";
import { Loader } from "../../components/loader";
import { Alert } from "../../components/alert";

export default function PetDetailsPage() {
  const { pet, loading, error, getOnePet } = usePetStore();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      getOnePet(parseInt(params.id));
    }
  }, [params.id]);

  return (
    <Layout>
      <>
        {loading && <Loader bg="orange" color="green" size={50} />}
        {error && (
          <Alert bg="red" color="black" size={10} text={error} title="Error" />
        )}
        {pet && (
          <div>
            <h3 className="text-3xl text-orange-800 text-center">
              Datos de la Mascota
            </h3>
            <div className="flex items-start justify-between flex-wrap">
              <div className="flex flex-col items-start w-fit ml-10">
                <span>Nombre: {pet.pet}</span>
                <span>
                  Género: {pet.gender === "Male" ? "Masculino" : "Femenino"}
                </span>
                <span>Raza: {pet.breed}</span>
                <span>Dueño: {pet.owner}</span>
              </div>
              <div className="flex flex-col items-start w-fit mr-10">
                <h4 className="text-2xl text-center">Medicación/es: </h4>
                {pet.medication ? (
                  <span>{pet.medication}</span>
                ) : (
                  <span>No tiene</span>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </Layout>
  );
}
