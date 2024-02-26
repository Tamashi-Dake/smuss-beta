export const deleteRecord = async (
  supabaseClient: any,
  tableName: string,
  id: string,
  setIsLoading: (value: boolean) => void
) => {
  const { error } = await supabaseClient.from(tableName).delete().eq("id", id);
  if (error) {
    setIsLoading(false);
    return console.error(error.message);
  }
};

export const deleteStogare = async (
  supabaseClient: any,
  bucket: string,
  path: string
) => {
  const { error } = await supabaseClient.storage.from(bucket).remove([path]);
  if (error) {
    return console.error(error.message);
  }
};
