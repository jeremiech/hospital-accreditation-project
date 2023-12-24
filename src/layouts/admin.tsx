import { ReactNode } from "react";
import { useAppSelector } from "@/store/hooks";
import { Container } from "semantic-ui-react";
import VerticalMenu from "@/components/VerticalMenu";

interface LayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: LayoutProps) => {
  const appState = useAppSelector((state) => state.app);

  return (
    <div style={{ display: "flex" }}>
      <VerticalMenu metrics={appState.metrics} />
      <Container style={{ margin: 10 }}>{children}</Container>
    </div>
  );
};

export default AdminLayout;
