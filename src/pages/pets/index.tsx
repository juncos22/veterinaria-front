import React, { useEffect } from "react";
import { Layout } from "../../components/layout";
// import { pets } from "../utils/mock/data";
import { Card } from "../../components/card";
import { SearchBox } from "../../components/search-box";
import usePetStore from "../../store/petStore";
import { Loader } from "../../components/loader";

export default function PetsPage() {
  const { loading, getAllPets, pets } = usePetStore();
  useEffect(() => {
    getAllPets();
  }, []);

  return (
    <Layout>
      <>
        <SearchBox
          onSearch={(data) => {
            getAllPets(data);
          }}
        />
        {loading && <Loader bg="orange" color="orange" size={80} />}
        <div className="flex flex-wrap items-center justify-evenly gap-x-3 gap-y-5 my-4">
          {pets.map((pet) => (
            <Card key={pet.id} pet={pet} />
          ))}
        </div>
      </>
    </Layout>
  );
}
