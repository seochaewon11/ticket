import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

/**
 * 화면 어디서든 "공유하기" 버튼을 누르면 같은 공유 대상 시트가
 * 화면 하단 모달로 뜨도록 하는 전역 상태 (SearchOverlayContext와 동일한 패턴).
 */
interface ShareSheetValue {
  isOpen: boolean;
  query: string;
  setQuery: (value: string) => void;
  openShare: () => void;
  closeShare: () => void;
}

const ShareSheetContext = createContext<ShareSheetValue | null>(null);

export function ShareSheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const value = useMemo<ShareSheetValue>(
    () => ({
      isOpen,
      query,
      setQuery,
      openShare: () => setIsOpen(true),
      closeShare: () => {
        setIsOpen(false);
        setQuery("");
      },
    }),
    [isOpen, query],
  );

  return <ShareSheetContext.Provider value={value}>{children}</ShareSheetContext.Provider>;
}

export function useShareSheet() {
  const ctx = useContext(ShareSheetContext);
  if (!ctx) {
    throw new Error("useShareSheet는 ShareSheetProvider 내부에서만 사용할 수 있습니다.");
  }
  return ctx;
}
