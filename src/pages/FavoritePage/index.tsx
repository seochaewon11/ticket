import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ArtistStep } from "../../components/favorite/ArtistStep";
import { CompleteStep } from "../../components/favorite/CompleteStep";
import { MoodStep } from "../../components/favorite/MoodStep";
import { useAppState } from "../../context/AppStateContext";
import { artistOptions, categoryOptions, moodOptions } from "../../data";
import { ROUTES } from "../../router/routes";

type SubStep = "mood" | "artist" | "complete";

const Screen = styled.div`
  padding: var(--space-6) var(--space-5) calc(96px + var(--space-6));
`;

function toggleInArray(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}

/**
 * 단일 라우트("/favorite") + 내부 step state로 Mood → Artist → Complete를 전환한다.
 * org/js/favorite.js를 이식하되, 진행바 표시는 Mood="Step 1 of 3", Artist="Step 2 of 3", Complete="Step 3 of 3"로 순증가시킨다.
 */
export function FavoritePage() {
  const navigate = useNavigate();
  const { userPreference, updatePreference, completeFavorite } = useAppState();
  const [subStep, setSubStep] = useState<SubStep>("mood");
  const [artistQuery, setArtistQuery] = useState("");

  const trimmedQuery = artistQuery.trim();
  const filteredArtists =
    trimmedQuery === ""
      ? artistOptions.filter((a) => a.id !== "leejoonyoung")
      : artistOptions.filter((a) => a.name.includes(trimmedQuery));

  const handleFinish = () => {
    completeFavorite();
    navigate(ROUTES.main);
  };

  return (
    <Screen>
      {subStep === "mood" && (
        <MoodStep
          step={1}
          totalSteps={userPreference.totalSteps}
          categoryOptions={categoryOptions}
          moodOptions={moodOptions}
          selectedCategories={userPreference.selectedCategories}
          selectedMoods={userPreference.selectedMoods}
          onToggleCategory={(id) =>
            updatePreference({ selectedCategories: toggleInArray(userPreference.selectedCategories, id) })
          }
          onToggleMood={(id) => updatePreference({ selectedMoods: toggleInArray(userPreference.selectedMoods, id) })}
          onNext={() => setSubStep("artist")}
        />
      )}

      {subStep === "artist" && (
        <ArtistStep
          step={2}
          totalSteps={userPreference.totalSteps}
          query={artistQuery}
          onQueryChange={setArtistQuery}
          results={filteredArtists}
          selectedArtists={userPreference.selectedArtists}
          onToggleArtist={(id) =>
            updatePreference({ selectedArtists: toggleInArray(userPreference.selectedArtists, id) })
          }
          onNext={() => setSubStep("complete")}
        />
      )}

      {subStep === "complete" && (
        <CompleteStep
          step={3}
          totalSteps={userPreference.totalSteps}
          userName={userPreference.userName}
          greetingName={userPreference.userGreetingName}
          tags={[
            ...categoryOptions.filter((c) => userPreference.selectedCategories.includes(c.id)).map((c) => c.label),
            ...moodOptions.filter((m) => userPreference.selectedMoods.includes(m.id)).map((m) => m.label),
            "차가운 도시",
            ...artistOptions.filter((a) => userPreference.selectedArtists.includes(a.id)).map((a) => a.name),
          ]}
          onFinish={handleFinish}
        />
      )}
    </Screen>
  );
}
