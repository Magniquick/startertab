import { SuggestionData } from "@/types/suggestions";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { SuggestionForm } from "./SuggestionForm";
import { SuggestionList } from "./SuggestionList";

interface SuggestionsContainerProps {
  newSuggestionFormRef: React.Ref<HTMLDivElement>;
}

const fetchSuggestions = async () => {
  try {
    const res = await fetch(`/api/suggestions`);
    if (res.status >= 400) {
      throw new Error("Failed request");
    }

    const data = (await res.json()) as SuggestionData;
    return data;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const SuggestionsContainer: React.FC<SuggestionsContainerProps> = ({
  newSuggestionFormRef,
}) => {
  const { data, error, isLoading, refetch } = useQuery(["suggestions"], () =>
    fetchSuggestions()
  );

  return (
    <>
      <SuggestionList
        suggestionsData={data}
        isLoading={isLoading}
        error={error}
      />
      <SuggestionForm
        refetchSuggestions={refetch}
        newSuggestionFormRef={newSuggestionFormRef}
      />
    </>
  );
};
