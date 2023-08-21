import { ReactNode } from "react";
import VerticalMenu from "@/components/VerticalMenu";
import { Container, Grid } from "semantic-ui-react";

interface LayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <VerticalMenu />
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={3}></Grid.Column>
          <Grid.Column width={13} padded="true">
            <Container>{children}</Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default AdminLayout;
