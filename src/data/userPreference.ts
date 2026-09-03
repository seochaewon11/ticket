import type { UserPreference } from "../types";

/** AppStateContext의 초기 취향 설정 값 */
export const initialUserPreference: UserPreference = {
  userName: "소연",
  userGreetingName: "소연",
  step: 2,
  totalSteps: 3,
  selectedCategories: ["concert", "classic"],
  selectedMoods: ["warm"],
  selectedArtists: ["parkhaeil"],
  completed: false,
};
