export interface Breed {
  id?: number;
  name: string;
}

export interface Owner {
  id?: number;
  fullName: string;
  phone: string;
  address: string;
}
export interface Pet {
  id?: number;
  name: string;
  breed?: Breed;
  gender?: string;
  owner?: Owner;
}

export interface CreatePetDTO {
  name?: string;
  breedId?: number;
  genderId?: string;
  ownerId?: number;
}

export interface PetList {
  id: number;
  pet: string;
  gender: string;
  breed: string;
  owner: string;
  medications: string[];
}

export interface CreateMedicationDTO {
  name?: string;
  petId?: number;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}
export interface RegisterUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  id?: number;
  email?: string;
  name?: string;
  token?: string;
}
