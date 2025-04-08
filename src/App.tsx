import { CTAComponent } from "./components/cta";
import { Layout } from "./components/layout";

function App() {
  return (
    <Layout>
      <>
        <CTAComponent
          title="Mantené la salud de tu mejor amigo al día"
          body="Registrá a tu mascota, completá todos sus datos con medicaciones incluidas y cuidalo siempre"
          image="/cta_image.jpg"
        />
      </>
    </Layout>
  );
}

export default App;
