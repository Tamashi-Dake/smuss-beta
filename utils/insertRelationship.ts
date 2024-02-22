export const insertRelationship = async (
  supabaseClient: any,
  tableName: string,
  options: any[],
  songId: number,
  columnName: string
) => {
  const { error } = await supabaseClient.from(tableName).insert(
    options &&
      options.map((item: any) => ({
        song_id: songId,
        [columnName]: item.value,
      }))
  );
  if (error) {
    return console.error(error.message);
  }
};
