import Layout from "@/layouts/default";
import { Form, Header, Grid } from "semantic-ui-react";

const Register = () => {
  return (
    <Layout>
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h2" textAlign="center">
              Register
            </Header>
            <Form>
              <Form.Field
                required
                type="text"
                control="input"
                label="Full Names"
                placeholder="Mr User"
              />
              <Form.Field
                required
                type="email"
                label="Email"
                control="input"
                placeholder="my@email.com"
              />
              <Form.Field
                required
                type="password"
                control="input"
                label="Password"
                placeholder="secret"
              />
              <Form.Field
                required
                type="password"
                control="input"
                placeholder="secret"
                label="Confirm password"
              />
              <button className="ui button" type="submit">
                Submit
              </button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export default Register;
