import  { ChangeEvent, useState } from "react";
import { CreateMedicationDTO } from "../utils/types";

type MedicationFormProps = {
  onSubmit: (data: CreateMedicationDTO) => Promise<void>;
};
export const MedicationForm = ({ onSubmit }: MedicationFormProps) => {
  const [medication, setMedication] = useState<CreateMedicationDTO>({});

  const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
    setMedication((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <dl className="mt-6 flex-col gap-4 lg:gap-6">
      <div className="my-5">
        <label htmlFor="name">
          <span className="text-sm font-medium text-orange-700">
            Nombre de la Medicación
          </span>

          <input
            type="text"
            id="name"
            name="name"
            required
            onChange={handleForm}
            className="mt-0.5 w-full text-center rounded border border-orange-300 shadow-sm sm:text-sm h-10"
          />
        </label>
      </div>
      <button
        onClick={() => (medication.name ? onSubmit(medication) : null)}
        className="inline-block rounded-sm border border-orange-600 bg-orange-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-orange-600 focus:ring-3 focus:outline-hidden w-full transition-colors delay-75 cursor-pointer disabled:bg-orange-300 disabled:text-gray-600"
        type="submit"
      >
        Guardar Cambios
      </button>
    </dl>
  );
};
