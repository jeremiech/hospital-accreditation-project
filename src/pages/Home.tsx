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
                  The Hospital Activity Management System (HAMS) is a
                  cutting-edge project designed to streamline and optimize the
                  operations of a modern healthcare facility. Leveraging
                  advanced technologies such as artificial intelligence, machine
                  learning, and data analytics, HAMS empowers hospital
                  administrators, medical staff, and patients alike. The system
                  efficiently tracks patient admissions, appointments, and
                  discharges, ensuring a seamless flow of information throughout
                  the hospital. With real-time data visualization and predictive
                  modeling, HAMS assists in resource allocation, allowing for
                  better staffing decisions, reduced wait times, and enhanced
                  patient care. Additionally, HAMS integrates with electronic
                  health records (EHR) and offers personalized patient portals,
                  granting individuals access to their medical history,
                  treatment plans, and lab results.
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
                  Leveraging advanced technologies such as artificial
                  intelligence, machine learning, and data analytics, HAMS
                  empowers hospital administrators, medical staff, and patients
                  alike. The system efficiently tracks patient admissions,
                  appointments, and discharges, ensuring a seamless flow of
                  information throughout the hospital. With real-time data
                  visualization and predictive modeling, HAMS assists in
                  resource allocation, allowing for better staffing decisions,
                  reduced wait times, and enhanced patient care. Additionally,
                  HAMS integrates with electronic health records (EHR) and
                  offers personalized patient portals, granting individuals
                  access to their medical history, treatment plans, and lab
                  results.
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
