import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import styled from "styled-components";
import { Icon, type IconName } from "./Icon";

export interface BottomSheetOption {
  id: string;
  icon: IconName;
  label: string;
  onSelect: () => void;
}

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  options: BottomSheetOption[];
}

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(10, 8, 20, 0.5);
  z-index: 100;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Sheet = styled(motion.div)`
  width: 100%;
  max-width: var(--app-max-width);
  background: var(--color-white);
  border-radius: 24px 24px 0 0;
  padding: var(--space-3) var(--space-5) var(--space-6);
  touch-action: none;
`;

const Handle = styled.div`
  width: 36px;
  height: 4px;
  border-radius: var(--radius-full);
  background: var(--color-border-strong);
  margin: 0 auto var(--space-4);
`;

const Title = styled.p`
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  margin-bottom: var(--space-3);
`;

const OptionRow = styled.button`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  padding: 14px 4px;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }
`;

const OptionIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);

  svg {
    width: 18px;
    height: 18px;
  }
`;

const OptionLabel = styled.span`
  flex: 1;
  text-align: left;
  font-size: 14.5px;
  font-weight: 600;
  color: var(--color-text);
`;

const OptionChevron = styled.span`
  display: flex;
  color: var(--color-text-placeholder);

  svg {
    width: 16px;
    height: 16px;
  }
`;

/** 아래로 이만큼(px) 끌거나, 이 속도(px/s) 이상으로 튕기면 드래그로 닫힌다 */
const DRAG_CLOSE_OFFSET = 80;
const DRAG_CLOSE_VELOCITY = 500;

/**
 * iOS 액션시트 스타일의 바텀시트: 화면 아래에서 슬라이드업 + 배경 dim + 드래그로 닫기.
 * 옵션은 좌측 아이콘 + 라벨 + 우측 화살표(chevron)로 구성된다.
 */
export function BottomSheet({ isOpen, onClose, title, options }: BottomSheetProps) {
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > DRAG_CLOSE_OFFSET || info.velocity.y > DRAG_CLOSE_VELOCITY) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <Sheet
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={handleDragEnd}
          >
            <Handle />
            {title && <Title>{title}</Title>}
            {options.map((option) => (
              <OptionRow key={option.id} type="button" onClick={option.onSelect}>
                <OptionIcon>
                  <Icon name={option.icon} />
                </OptionIcon>
                <OptionLabel>{option.label}</OptionLabel>
                <OptionChevron>
                  <Icon name="chevron" />
                </OptionChevron>
              </OptionRow>
            ))}
          </Sheet>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}
