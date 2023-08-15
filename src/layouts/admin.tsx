import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import VerticalMenu from "@/components/VerticalMenu";
import { Container, Grid } from "semantic-ui-react";

interface LayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width="four">
              <VerticalMenu />
            </Grid.Column>
            <Grid.Column>{children}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
};

export default AdminLayout;
