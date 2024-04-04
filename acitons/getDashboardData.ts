import { UserDetails } from "@/types";
import { getSupabase } from "@/utils/supabaseSever";

const getDashboardData = async () => {
  const supabase = await getSupabase();

  let views: any[] = [];
  let profits: any[] = [];
  let usersFree: any[] = [];
  let usersPremium: any[] = [];

  // Lấy số view (số row = song)
  const viewResult = await supabase.from("songs").select("view");

  // Lấy số lợi nhuận
  const profitResult = await supabase.from("subscriptions").select("id");

  // Lấy số user free
  const userFreeResult = await supabase
    .from("users")
    .select("*")
    .ilike("role", "user");

  // Lấy số user premium
  const userPremiumResult = await supabase.from("customers").select("*");

  // Kiểm tra lỗi trong quá trình tìm kiếm
  if (
    viewResult.error ||
    profitResult.error ||
    userFreeResult.error ||
    userPremiumResult.error
  ) {
    console.log("Error occurred during search.");
    console.log(
      viewResult.error ??
        profitResult.error ??
        userFreeResult.error ??
        userPremiumResult.error
    );
    // Xử lý lỗi tại đây nếu cần thiết
  }

  if (viewResult.data) {
    views = viewResult.data;
  }
  if (profitResult.data) {
    profits = profitResult.data;
  }

  if (userFreeResult.data) {
    usersFree = userFreeResult.data;
  }

  if (userPremiumResult.data) {
    usersPremium = userPremiumResult.data;
  }

  return {
    views,
    profits,
    usersFree,
    usersPremium,
  };
};

export default getDashboardData;
