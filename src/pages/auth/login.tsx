import React, { useEffect } from "react";
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
        {authState.loading && <Loader bg="black" color="orange" size={10} />}
        {authState.error && (
          <Alert
            title="Login Error"
            text={authState.error}
            extraClasses="size-10 mx-auto"
          />
        )}
      </>
    </LoginLayout>
  );
}
