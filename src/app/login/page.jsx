import { getGoogleConfig } from "@/actions/actions";
import LoginForm from "@/components/login/LoginForm";
import Container from "@/components/shared/Container";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata = {
  title: "Login",
};

const LoginPage = async () => {
  const { data } = await getGoogleConfig();

  return (
    <GoogleOAuthProvider clientId={data?.google_client_id}>
      <Container>
        <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
          <LoginForm />
        </div>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
