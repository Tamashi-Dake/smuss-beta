type SourceArrayItem =
  | { id: string; name: string }
  | { id: string; title: string };

export function filterRelationships(
  relationshipArray: any[],
  id: string
): any[] {
  return relationshipArray.filter((rel) => rel.song_id === id);
}

export function mapRelationshipToOption(
  relationshipArray: any[],
  targetArray: string,
  sourceArray: SourceArrayItem[]
): { value: string; label: string }[] {
  return relationshipArray.map((rel) => ({
    value: rel[targetArray].toString(),
    label: findLabel(sourceArray, rel[targetArray]),
  }));
}

function findLabel(sourceArray: SourceArrayItem[], targetId: string): string {
  const item = sourceArray.find((item) => item.id === targetId);
  if (item) {
    if ("name" in item) {
      return item.name;
    } else if ("title" in item) {
      return item.title;
    }
  }
  return "";
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
