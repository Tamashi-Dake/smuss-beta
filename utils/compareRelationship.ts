interface ObjectItem {
  value: number;
  label: string;
}

export const compareObjects = (
  oldObjects: ObjectItem[],
  newObjects: ObjectItem[]
): [ObjectItem[], ObjectItem[]] => {
  const sortedOldObjects = [...oldObjects].sort((a, b) => a.value - b.value);
  const sortedNewObjects = [...newObjects].sort((a, b) => a.value - b.value);

  const added: ObjectItem[] = [];
  const removed: ObjectItem[] = [];

  // Find added items
  for (const newItem of sortedNewObjects) {
    if (!sortedOldObjects.some((oldItem) => isEqual(oldItem, newItem))) {
      added.push(newItem);
    }
  }

  // Find removed items
  for (const oldItem of sortedOldObjects) {
    if (!sortedNewObjects.some((newItem) => isEqual(oldItem, newItem))) {
      removed.push(oldItem);
    }
  }

  return [added, removed];
};

const isEqual = (obj1: ObjectItem, obj2: ObjectItem): boolean => {
  return obj1.value === obj2.value && obj1.label === obj2.label;
};
