import { Grid, Card, Header, Statistic } from "semantic-ui-react";
import Layout from "@/layouts/admin";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Overall performance of...",
    },
  },
};

const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Percentage of...",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const lineData = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => Math.floor(Math.random() * 10)),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => Math.floor(Math.random() * 10)),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const doughnutData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const Dashboard = () => {
  return (
    <Layout>
      <Header disabled as="h1">
        Dashboard
      </Header>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Card>
              <Card.Content textAlign="center">
                <Statistic color="teal">
                  <Statistic.Value>850</Statistic.Value>
                  <Statistic.Label>Patients</Statistic.Label>
                </Statistic>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={4}>
            <Card>
              <Card.Content textAlign="center">
                <Statistic color="blue">
                  <Statistic.Value>12</Statistic.Value>
                  <Statistic.Label>Forms</Statistic.Label>
                </Statistic>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={4}>
            <Card>
              <Card.Content textAlign="center">
                <Statistic color="green">
                  <Statistic.Value>4,020</Statistic.Value>
                  <Statistic.Label>Form fill-ins</Statistic.Label>
                </Statistic>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={4}>
            <Card>
              <Card.Content textAlign="center">
                <Statistic color="orange">
                  <Statistic.Value>329</Statistic.Value>
                  <Statistic.Label>Care Plans</Statistic.Label>
                </Statistic>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={11}>
            <Line options={lineOptions} data={lineData} />
          </Grid.Column>
          <Grid.Column width={5}>
            <Doughnut options={doughnutOptions} data={doughnutData} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
