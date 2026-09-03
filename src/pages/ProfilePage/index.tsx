import { useNavigate } from "react-router-dom";
import { BottomNav } from "../../components/common/BottomNav";
import { Header } from "../../components/common/Header";
import { ROUTES } from "../../router/routes";
import { PagePlaceholder } from "../PagePlaceholder";

export function ProfilePage() {
  const navigate = useNavigate();

  return (
    <>
      <Header back onBack={() => navigate(ROUTES.main)} />
      <PagePlaceholder title="프로필" hasBottomNav />
      <BottomNav active="profile" />
    </>
  );
}
