// helpers.ts

export function filterRelationships(
  relationshipArray: any[],
  id: string
): any[] {
  return relationshipArray.filter((rel) => rel.song_id === id);
}

export function mapRelationshipToOption(
  relationshipArray: any[],
  targetArray: string,
  sourceArray: { id: string; name: string }[]
): { value: string; label: string }[] {
  return relationshipArray.map((rel) => ({
    value: rel[targetArray].toString(),
    label: sourceArray.find((item) => item.id === rel[targetArray])?.name || "",
  }));
}

export function filterPreviousOptions(
  previousOptions: { value: string; label: string }[],
  currentOptions: { value: string; label: string }[]
): { value: string; label: string }[] {
  return previousOptions.filter(
    (option) =>
      !currentOptions.some((current) => current.value === option.value)
  );
}
