export interface Breed {
  id?: number;
  name: string;
}
export interface Gender {
  id?: number;
  name: string;
}
export interface Owner {
  id?: number;
  name: string;
  email: string;
  password: string;
}
export interface Pet {
  id?: number;
  name: string;
  breed?: Breed;
  gender?: Gender;
  owner?: Owner;
}

export interface CreatePetDTO {
  name?: string;
  breedId?: number;
  genderId?: number;
  ownerId?: number;
}

export interface PetList {
  id: number;
  pet: string;
  gender: string;
  breed: string;
  owner: string;
  medication: string;
}
