import { Subscription, UserDetails } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
// useUser is a custom hook so i must remap it to useSupaUser to avoid conflict with useUser hook
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
// import exp from "constants";
// import { get } from "http";
import { createContext, use, useContext, useEffect, useState } from "react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}
export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetails = () =>
    supabase.from("users").select("*").eq("id", user?.id).single();
  const getSubscription = async () =>
    await supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .eq("user_id", user?.id)
      .single();

  // if (user?.id === subscription?.user_id)
  //   console.log("user id trung", user?.id);

  useEffect(() => {
    // nếu user đã login và chưa load data
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);
      // load data
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (result) => {
          const userDetailsPromise = result[0];
          const subscriptionPromise = result[1];
          // nếu load data thành công
          if (userDetailsPromise.status === "fulfilled") {
            setUserDetails(userDetailsPromise.value.data as UserDetails);
          }
          if (subscriptionPromise.status === "fulfilled") {
            setSubscription(subscriptionPromise.value.data as Subscription);
          }
          setIsLoadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);
  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };
  return <UserContext.Provider value={value} {...props} />;
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};

// // read user session
// export const readUserSession = async (req:any) => {
//   const { data: session, error } = await supabase.auth.api.getUserByCookie(
//     req
//   );
//   if (error) {
//     throw error;
//   }
//   return session;
// }
