export const fetchRecordData = async (
  supabaseClient: any,
  tableName: string,
  id: string
) => {
  const { data, error } = await supabaseClient
    .from(tableName)
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Failed to fetch record data:", error);
    return null;
  }
  return data;
};
