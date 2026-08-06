import { InfoCardWrap, InfoIcon, InfoLabel, InfoRow, InfoValue } from '../styles'

interface InfoCardProps {
  period: string
  runtimeText?: string
  priceRangeText?: string
}

export function InfoCard({ period, runtimeText, priceRangeText }: InfoCardProps) {
  return (
    <InfoCardWrap>
      <InfoRow>
        <InfoIcon>📅</InfoIcon>
        <InfoLabel>기간</InfoLabel>
        <InfoValue>{period}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoIcon>⏱️</InfoIcon>
        <InfoLabel>러닝타임</InfoLabel>
        <InfoValue>{runtimeText || '-'}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoIcon>🎟️</InfoIcon>
        <InfoLabel>티켓 가격</InfoLabel>
        <InfoValue>{priceRangeText || '-'}</InfoValue>
      </InfoRow>
    </InfoCardWrap>
  )
}
