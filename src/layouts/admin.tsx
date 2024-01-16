import { ReactNode } from "react";
import { useAppSelector } from "@/store/hooks";
import { Container } from "semantic-ui-react";
import VerticalMenu from "@/components/VerticalMenu";

interface LayoutProps {
  showSideBar?: boolean;
  children: ReactNode;
}

const AdminLayout = ({ children, showSideBar }: LayoutProps) => {
  const appState = useAppSelector((state) => state.app);

  return (
    <div style={{ display: "flex" }}>
      {!showSideBar && <VerticalMenu metrics={appState.metrics} />}
      <Container style={{ margin: 10 }}>{children}</Container>
    </div>
  );
};

export default AdminLayout;
