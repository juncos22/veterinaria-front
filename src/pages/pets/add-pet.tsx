import { PetForm } from "../../components/pet-form";
import usePetStore from "../../store/petStore";
import { Loader } from "../../components/loader";
import { Alert } from "../../components/alert";
import { useNavigate } from "react-router";
import { Layout } from "../../components/layout";

export default function AddPetPage() {
  const { loading, savePet, message, error } = usePetStore();
  const navigate = useNavigate();

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
            await savePet({ ...form, ownerId: 1 });
            if (!error) {
              setTimeout(() => {
                navigate("/pets");
              }, 2000);
            }
          }}
        />
      </div>
    </Layout>
  );
}
