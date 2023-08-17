import Layout from "@/layouts/default";
import { Segment, Header } from "semantic-ui-react";

const NotFound = () => {
  return (
    <Layout>
      <Segment textAlign="center" placeholder>
        <Header as="h1">404 &middot; page not found</Header>
      </Segment>
    </Layout>
  );
};

export default NotFound;
