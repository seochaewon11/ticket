import { BottomNav } from "../../components/common/BottomNav";
import { Header } from "../../components/common/Header";
import { PagePlaceholder } from "../PagePlaceholder";

export function StoragePage() {
  return (
    <>
      <Header />
      <PagePlaceholder title="보관함" hasBottomNav />
      <BottomNav active="storage" />
    </>
  );
}
