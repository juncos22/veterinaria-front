import { CreatePetDTO } from "../types";

export const validateForm = (form: CreatePetDTO) => {
  return (
    form.name &&
    form.breedId &&
    form.breedId > 0 &&
    form.genderId &&
    form.genderId > 0
  );
};
