import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

/**
 * 화면 어디서든(맞춤 공연/아티스트 소식/캘린더/보관함 등) "검색" 버튼을 누르면
 * 같은 검색창이 화면 가운데 모달로 뜨도록 하는 전역 상태.
 */
interface SearchOverlayValue {
  isOpen: boolean;
  query: string;
  setQuery: (value: string) => void;
  openSearch: () => void;
  closeSearch: () => void;
}

const SearchOverlayContext = createContext<SearchOverlayValue | null>(null);

export function SearchOverlayProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const value = useMemo<SearchOverlayValue>(
    () => ({
      isOpen,
      query,
      setQuery,
      openSearch: () => setIsOpen(true),
      closeSearch: () => {
        setIsOpen(false);
        setQuery("");
      },
    }),
    [isOpen, query],
  );

  return <SearchOverlayContext.Provider value={value}>{children}</SearchOverlayContext.Provider>;
}

export function useSearchOverlay() {
  const ctx = useContext(SearchOverlayContext);
  if (!ctx) {
    throw new Error("useSearchOverlay는 SearchOverlayProvider 내부에서만 사용할 수 있습니다.");
  }
  return ctx;
}
