import { getCities, getCountries, getGoogleConfig } from "@/actions/actions";
import Container from "@/components/shared/Container";
import SignupForm from "@/components/signup/SignupForm";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata = {
  title: "Signup",
};

const RegisterPage = async () => {
  const [{ data: google }, { data: countries }, { data: cities }] =
    await Promise.all([getGoogleConfig(), getCountries(), getCities()]);

  return (
    <GoogleOAuthProvider clientId={google?.google_client_id}>
      <Container>
        <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
          <SignupForm countries={countries} cities={cities} />
        </div>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default RegisterPage;
