import { useOutletContext } from "react-router-dom";
import { USER_ROLES } from "../constants/users.ts";
import { UserType } from "../types/userType.ts";

type OutletContextType = {
  userData: UserType;
  isUserDataLoading: boolean;
};

const useUserContext = () => {
  const { userData, isUserDataLoading } = useOutletContext<OutletContextType>();

  //Maybe ? is not needed
  const hasUserRole = userData?.role === USER_ROLES.USER;
  const hasAdminRole = userData?.role === USER_ROLES.ADMIN;

  return { userData, isUserDataLoading, hasUserRole, hasAdminRole };
};

export default useUserContext;
