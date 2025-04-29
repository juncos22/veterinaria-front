import { useEffect } from "react";
import { LoginLayout } from "../../components/login-layout";
import { RegisterForm } from "../../components/register-form";
import { useNavigate } from "react-router";
import useAuthStore from "../../store/authStore";
import { Loader } from "../../components/loader";
import { Alert } from "../../components/alert";

export default function RegisterPage() {
  const authState = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (authState.authenticated) {
      navigate("/pets");
    }
  }, [authState.authenticated]);

  return (
    <LoginLayout>
      <>
        <RegisterForm
          onSubmit={async (data) => {
            await authState.register(data);
          }}
        />
        {authState.loading && <Loader bg="black" color="orange" size={10} />}
        {!authState.authResponse.success && authState.authResponse.message && (
          <Alert
            title="Login Error"
            text={authState.authResponse.message}
            extraClasses="size-10 mx-auto"
          />
        )}
      </>
    </LoginLayout>
  );
}
