import { ReactNode } from "react";

const HomePageLayout = ({ children }: { children: ReactNode }) => (
  <div className={`grid grid-cols-1 gap-5 place-items-center`}>{children}</div>
);

export default HomePageLayout;
