import { getUser } from "@/actions/actions";
import UserInfo from "@/components/myProfile/UserInfo";

export const metadata = {
  title: "Profile Settings",
};

const ProfilePage = async () => {
  const { data } = await getUser();

  return <UserInfo user={data} />;
};

export default ProfilePage;
