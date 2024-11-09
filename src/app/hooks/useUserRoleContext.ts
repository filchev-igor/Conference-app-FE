import { useOutletContext } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { USER_ROLES } from "../constants/users.ts";

type OutletContextType = {
  userRole: string;
  setUserRole: Dispatch<SetStateAction<string>>;
};

const useUserRoleContext = () => {
  const { userData, isUserDataLoading, hasUserRole, hasAdminRole } =
    useOutletContext<OutletContextType>();

  const hasUserRole = userRole === USER_ROLES.USER;
  const hasAdminRole = userRole === USER_ROLES.ADMIN;

  return { userRole, setUserRole, hasUserRole, hasAdminRole };
};

export default useUserRoleContext;
