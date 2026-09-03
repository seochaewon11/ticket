import { BottomNav } from "../../components/common/BottomNav";
import { Header } from "../../components/common/Header";
import { PagePlaceholder } from "../PagePlaceholder";

export function ReportPage() {
  return (
    <>
      <Header />
      <PagePlaceholder title="리포트" hasBottomNav />
      <BottomNav active="report" />
    </>
  );
}
