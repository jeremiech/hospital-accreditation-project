import Layout from "@/layouts/default";
import { Segment, Header, Icon, Grid, Image } from "semantic-ui-react";

const Home = () => {
  return (
    <Layout>
      <Segment padded="very" secondary basic>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column width={10}>
              <Header as="h1">
                Hospital Accreditation
                <Header.Subheader>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                  aliquid quia deserunt quisquam, velit cupiditate nisi magnam
                  repudiandae id dolore hic autem reiciendis obcaecati dicta
                  quis, praesentium illo, possimus tempora.
                  <ul>
                    <li>item 1</li>
                    <li>item 1</li>
                    <li>item 1</li>
                    <li>item 1</li>
                    <li>item 1</li>
                    <li>item 1</li>
                    <li>item 1</li>
                  </ul>
                </Header.Subheader>
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Image
                src="https://images.pexels.com/photos/3936358/pexels-photo-3936358.jpeg?auto=compress&cs=tinysrgb&w=600"
                rounded
                fluid
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column>
            <Segment padded="very" tertiary>
              <Header as="h2" icon textAlign="center">
                <Icon name="users" circular />
                <Header.Content>Doctor</Header.Content>
              </Header>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment padded="very" secondary>
              <Header as="h2" icon textAlign="center">
                <Icon name="users" circular />
                <Header.Content>Nurse</Header.Content>
              </Header>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment padded="very" tertiary>
              <Header as="h2" icon textAlign="center">
                <Icon name="users" circular />
                <Header.Content>Patient</Header.Content>
              </Header>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Segment padded="very" secondary basic>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column>
              <Image
                src="https://images.pexels.com/photos/13779104/pexels-photo-13779104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                fluid
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as="h1" textAlign="center">
                What we do
                <Header.Subheader>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                  aliquid quia deserunt quisquam, velit cupiditate nisi magnam
                  repudiandae id dolore hic autem reiciendis obcaecati dicta
                  quis, praesentium illo, possimus tempora.
                </Header.Subheader>
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Image
                src="https://images.pexels.com/photos/13779104/pexels-photo-13779104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                fluid
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Layout>
  );
};

export default Home;
