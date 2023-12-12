import { ReactNode } from "react";
import { useAppSelector } from "@/store/hooks";
import { Container, Grid } from "semantic-ui-react";
import VerticalMenu from "@/components/VerticalMenu.1";

interface LayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: LayoutProps) => {
  const appState = useAppSelector((state) => state.app);

  return (
    <>
      <VerticalMenu metrics={appState.metrics} />
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={4}></Grid.Column>
          <Grid.Column width={11} padded="true">
            <Container>{children}</Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default AdminLayout;
