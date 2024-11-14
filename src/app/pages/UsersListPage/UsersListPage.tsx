import { useUsersList } from "../../api/users/queryHooks.ts";
import LoadingSpinner from "../../components/spinners/LoadingSpinner.tsx";
import useUserContext from "../../hooks/useUserContext.ts";

const UsersListPage = () => {
  const { hasAdminRole } = useUserContext();

  const { usersListData, isUsersListDataLoading } = useUsersList();

  if (!hasAdminRole) {
    return null;
  }

  if (isUsersListDataLoading) {
    return <LoadingSpinner />;
  }

  return (
    <table className={"table-auto w-full text-center bg-slate-100 rounded-lg"}>
      <thead>
        <tr className={"border-b border-slate-500 py-3 text-slate-500 "}>
          <th className={"py-3 pl-3 text-slate-700"}>Id</th>
          <th className={"py-3"}>Full name</th>
          <th className={"py-3"}>Email</th>
        </tr>
      </thead>

      <tbody>
        {usersListData?.map(({ id, name, email }, index) => {
          const isLastRow = index === usersListData.length - 1;

          return (
            <tr
              key={id}
              className={`${!isLastRow ? "border-b border-slate-500" : ""} hover:text-blue-400 hover:bg-black`}
            >
              <td className={"py-3 pl-3 font-bold"}>{id}</td>
              <td className={"py-3"}>{name}</td>
              <td className={"py-3"}>{email}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UsersListPage;
