import type { ReactNode } from "react";

type IMainProps = {
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="px w-full">
    <div className="mx-auto max-w-screen-md">
      <div className="py-5">{props.children}</div>
    </div>
  </div>
);

export { Main };
