import { getSupabase } from "@/utils/supabaseSever";

const getDashboardDataByMonth = async () => {
  const supabase = await getSupabase();
  const thisYear = new Date().getFullYear();
  const monthlyData = [];

  for (let month = 1; month <= 12; month++) {
    const startOfMonth = new Date(thisYear, month - 1, 1)
      .toISOString()
      .split("T")[0];
    const endOfMonth = new Date(thisYear, month, 0).toISOString().split("T")[0];

    const { data: monthCustomers, error } = await supabase
      .from("subscriptions")
      .select("id")
      .gte("created", startOfMonth)
      .lte("created", endOfMonth);

    if (error) {
      console.error(`Error fetching data for month ${month}:`, error);
      continue;
    }

    monthlyData.push(monthCustomers);
  }
  return monthlyData;
};

export default getDashboardDataByMonth;
