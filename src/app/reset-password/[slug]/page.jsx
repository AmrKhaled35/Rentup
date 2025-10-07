import ForgotPassword from "@/components/forgotPassword/ForgotPassword";
import Container from "@/components/shared/Container";

export const metadata = {
  title: 'Reset Password'
}

const page = ({ params: { slug } }) => {
  return (
    <Container>
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
        <ForgotPassword token={slug} />
      </div>
    </Container>
  );
};

export default page;
