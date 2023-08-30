import Layout from "@/layouts/default";
import hospital from "@/assets/hospital.png";
import { Header, Grid, Image } from "semantic-ui-react";

const About = () => {
  return (
    <Layout>
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column width={13}>
            <Header as="h2">
              About - Hospital Activity
              <Header.Subheader style={{ marginTop: 10 }}>
                The Hospital Activity Management System (HAMS) is a cutting-edge
                project designed to streamline and optimize the operations of a
                modern healthcare facility. Leveraging advanced technologies
                such as artificial intelligence, machine learning, and data
                analytics, HAMS empowers hospital administrators, medical staff,
                and patients alike. The system efficiently tracks patient
                admissions, appointments, and discharges, ensuring a seamless
                flow of information throughout the hospital. With real-time data
                visualization and predictive modeling, HAMS assists in resource
                allocation, allowing for better staffing decisions, reduced wait
                times, and enhanced patient care. Additionally, HAMS integrates
                with electronic health records (EHR) and offers personalized
                patient portals, granting individuals access to their medical
                history, treatment plans, and lab results.
              </Header.Subheader>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Image src={hospital} fluid />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export default About;
