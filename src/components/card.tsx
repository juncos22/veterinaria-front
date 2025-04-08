import { PetList } from "../utils/types";

type CardProps = {
  pet: PetList;
};
export const Card = ({ pet: { id, pet, breed, gender, owner } }: CardProps) => {
  return (
    <a
      href={`/pets/${id}`}
      className="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6"
    >
      <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
        <div className="sm:order-last sm:shrink-0">
          <img
            alt=""
            src="/brand.png"
            className="size-16 rounded-full object-cover sm:size-[72px]"
          />
        </div>

        <div className="mt-4 sm:mt-0">
          <h3 className="text-lg font-medium text-pretty text-gray-900">
            {pet}
          </h3>

          <p className="mt-1 text-sm text-gray-700">
            {gender} - {breed}
          </p>

          <p className="mt-4 line-clamp-2 text-sm text-pretty text-gray-700">
            {owner}
          </p>
        </div>
      </div>
    </a>
  );
};
