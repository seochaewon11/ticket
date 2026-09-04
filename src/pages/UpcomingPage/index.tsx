import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Header } from "../../components/common/Header";
import { Icon } from "../../components/common/Icon";
import { PosterPlaceholder } from "../../components/common/PosterPlaceholder";
import { Pill } from "../../components/common/ui";
import { upcomingShows } from "../../data";

const Screen = styled.div`
  padding: var(--space-5);
  padding-bottom: var(--space-8);
`;

const Subtitle = styled.p`
  font-size: 13px;
  color: var(--color-text-sub);
  margin-bottom: var(--space-5);
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
`;

const Thumb = styled.div`
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: var(--radius-sm);
  overflow: hidden;
`;

const Body = styled.div`
  min-width: 0;
  flex: 1;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
`;

const DateText = styled.span`
  font-size: 12px;
  color: var(--color-text-sub);
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 2px;
`;

const Venue = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--color-text-sub);

  svg {
    width: 12px;
    height: 12px;
    flex-shrink: 0;
  }
`;

/** 캘린더 화면 "예정된 공연" 섹션의 + 버튼으로 진입하는 전체 목록 화면 */
export function UpcomingPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header back title="예정된 공연" onBack={() => navigate(-1)} />
      <Screen>
        <Subtitle>다가오는 모든 공연 일정을 한눈에 확인하세요.</Subtitle>
        {upcomingShows.map((u) => (
          <Item key={u.id}>
            <Thumb>
              <PosterPlaceholder $theme={u.theme} imageUrl={u.imageUrl} alt={u.title} />
            </Thumb>
            <Body>
              <Meta>
                <Pill $variant="pink">{u.category}</Pill>
                <DateText>{u.date}</DateText>
              </Meta>
              <Title>{u.title}</Title>
              <Venue>
                <Icon name="pin" />
                {u.venue}
              </Venue>
            </Body>
          </Item>
        ))}
      </Screen>
    </>
  );
}
