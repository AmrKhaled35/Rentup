import ContactForm from "@/components/contact/ContactForm";
import Container from "@/components/shared/Container";
import PageHeader from "@/components/shared/PageHeader";
import { GoogleMapsEmbed } from "@next/third-parties/google";

export const metadata = {
  title: "اتصل بنا",
};

const ContactUsPage = () => {

  return (
    <Container>
      <PageHeader src="/property/contact.jpg" title="اتصل بنا" />
      <ContactForm />
      <div className="my-24 rounded-[10px] h-80 overflow-hidden">
        <GoogleMapsEmbed
          apiKey="AIzaSyDpn07mObwbPevigwGfuvqPKLpqkm_LL8E"
          height={320}
          width="100%"
          q="D-Bug Station Limited"
        />
      </div>
    </Container>
  );
};

export default ContactUsPage;
