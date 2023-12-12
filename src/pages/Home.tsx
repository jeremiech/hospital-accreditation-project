import Layout from "@/layouts/default";
import doctor from "@/assets/doctor.png";
import patient from "@/assets/patient.png";
import hospital from "@/assets/hospital.png";
import { Segment, Header, Icon, Grid, Image } from "semantic-ui-react";

const Home = () => {
  return (
    <Layout>
      <Segment padded="very" secondary basic>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column width={13}>
              <Header as="h1">
                CLINICAL CARE OF PATIENT DATA ANALYSIS SYSTEM
                <Header.Subheader>
                  The clinical care of patients includes medications, laboratory and diagnostic imaging services,
                  surgery, anesthesia, and many types of treatments that place patients at risk. These risks may
                  result in the mix-up of test results between patients, delays in diagnosis and treatment, wrong
                  side or wrong patient surgical procedures, incorrect medications or doses, and many other
                  harmful outcomes that for the most part are preventable. While health care providers intend
                  to do the right thing, the lack of consistent systems and checks and balances in health care
                  processes may mean that a minor incorrect act or decision may cause harm or even death to
                  the patient.
                </Header.Subheader>
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Image src={hospital} fluid />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Grid columns="equal" style={{ marginTop: 10 }}>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Header as="h1">Key Features</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment padded="very" secondary>
              <Header as="h2" icon textAlign="center">
                <Icon name="archive" circular />
                <Header.Content>Less Paperwork</Header.Content>
              </Header>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment padded="very" secondary>
              <Header as="h2" icon textAlign="center">
                <Icon name="unlock alternate" circular />
                <Header.Content>Secure Access</Header.Content>
              </Header>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment padded="very" secondary>
              <Header as="h2" icon textAlign="center">
                <Icon name="line graph" circular />
                <Header.Content>Quick Insight</Header.Content>
              </Header>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Segment padded="very" secondary basic>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column>
              <Image src={doctor} fluid />
            </Grid.Column>
            <Grid.Column width={10}>
              <Header as="h1" textAlign="center">
                What we do
                <Header.Subheader>
                The clinical care of patients, all the systems of care (for example, human resource 
management, information management, diagnostic imaging, clinical laboratory, and patient 
rights) and other systems come together. Planning, accurate and timely documentation, and 
sound patient assessment and re-assessment must come together completely and correctly. 
This is not an easy task in most organizations but an essential one that requires constant 
attention to risk, risk intervention, and risk reduction.
                </Header.Subheader>
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Image src={patient} fluid />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Layout>
  );
};

export default Home;
