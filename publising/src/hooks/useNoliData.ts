import { useContext } from 'react'
import { NoliDataContext, type NoliDataValue } from '../data/NoliDataContext'

// NoliDataProvider 하위에서 데이터 레이어(Context)를 소비하는 훅
export function useNoliData(): NoliDataValue {
  const ctx = useContext(NoliDataContext)
  if (!ctx) {
    throw new Error('useNoliData는 NoliDataProvider 내부에서만 사용할 수 있습니다.')
  }
  return ctx
}
