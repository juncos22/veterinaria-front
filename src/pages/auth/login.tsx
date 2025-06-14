import { useEffect } from "react";
import { LoginLayout } from "../../components/login-layout";
import { LoginForm } from "../../components/login-form";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router";
import { Loader } from "../../components/loader";
import { Alert } from "../../components/alert";

export default function LoginPage() {
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
        <LoginForm
          onSubmit={async (form) => {
            await authState.login(form);
          }}
        />
        {authState.loading && (
          <Loader
            additionalClasses1="size-10 bg-transparent"
            additionalClasses2="text-orange-500"
          />
        )}
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
