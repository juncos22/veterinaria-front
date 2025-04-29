import useAuthStore from "../store/authStore";
import { PetList } from "../utils/types";

type CardProps = {
  pet: PetList;
  onEdit: (id: number) => void;
  onDelete: (id: number) => Promise<void>;
};
export const Card = ({
  pet: { id, pet, breed, gender, owner },
  onDelete,
  onEdit,
}: CardProps) => {
  const { authenticated } = useAuthStore();
  return (
    <div className="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6">
      <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
        <div className="sm:order-last sm:shrink-0">
          {authenticated && (
            <>
              <button
                className="inline-block size-8 rounded-full border border-orange-600 bg-orange-600 mx-1 p-2 text-white hover:bg-transparent hover:text-orange-600 focus:ring-3 focus:outline-hidden cursor-pointer"
                onClick={() => onEdit(id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-edit size-4"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                  <path d="M16 5l3 3" />
                </svg>
              </button>

              <button
                className="inline-block size-8 rounded-full border mx-1 border-red-600 p-2 text-red-600 hover:bg-red-600 hover:text-white focus:ring-3 focus:outline-hidden cursor-pointer"
                onClick={() => onDelete(id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-trash size-4"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </button>
            </>
          )}
          <a href={`/pets/${id}`}>
            <img
              alt=""
              src="/brand.png"
              className="size-16 rounded-full object-cover sm:size-[72px]"
            />
          </a>
        </div>

        <div className="mt-4 sm:mt-0">
          <a href={`/pets/${id}`}>
            <h3 className="text-lg font-medium text-pretty text-gray-900 hover:text-orange-500 hover:font-semibold transition-colors delay-75">
              {pet}
            </h3>
          </a>
          <p className="mt-1 text-sm text-gray-700">
            {gender} - {breed}
          </p>

          <p className="mt-4 line-clamp-2 text-sm text-pretty text-gray-700">
            {owner}
          </p>
        </div>
      </div>
    </div>
  );
};
