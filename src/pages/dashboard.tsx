import {
  Title,
  Legend,
  Tooltip,
  ArcElement,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
  Chart as ChartJS,
} from "chart.js";
import { useEffect, useState } from "react";
import Layout from "@/layouts/admin";
import { useAppDispatch } from "@/store/hooks";
import { Line, Doughnut } from "react-chartjs-2";
import { setMetrics } from "@/store/slice/AppSlice";
import { useGetMetricsQuery, useGetReportQuery } from "@/services/default";
import { Grid, Card, Header, Statistic } from "semantic-ui-react";

ChartJS.register(
  Title,
  Legend,
  Tooltip,
  ArcElement,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale
);

const lineOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" as const },
    title: {
      display: true,
      text: "Treated Patients",
    },
  },
};

const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" as const },
    title: {
      display: true,
      text: "Disease",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const lineData = {
  labels,
  datasets: [
    {
      label: "Staying",
      data: labels.map(() => Math.floor(Math.random() * 10)),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Discharged",
      data: labels.map(() => Math.floor(Math.random() * 10)),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const Dashboard = () => {
  const { data, isSuccess } = useGetMetricsQuery("");
  const getReport = useGetReportQuery("");
  const [labels, setLabels] = useState<string[]>([]);
  const [patientCount, setPatientCount] = useState<number[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let _labels: string[] = [];
    let _patientCount: number[] = [];

    if (isSuccess) dispatch(setMetrics(data));
    if (getReport.isSuccess) {
      getReport.data?.admissions?.map(
        (item: { _id: string; count: number }) => {
          _labels.push(item?._id);
          _patientCount.push(item?.count);
        }
      );
      setLabels(_labels);
      setPatientCount(_patientCount);
    }
  }, [isSuccess, getReport.isSuccess]);

  const doughnutData = {
    labels,
    datasets: [
      {
        label: "# of Patients",
        data: patientCount,
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

  return (
    <Layout>
      <Header disabled as="h1">
        Dashboard
      </Header>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Card>
              <Card.Content textAlign="center">
                <Statistic color="teal">
                  <Statistic.Value>{data?.patients}</Statistic.Value>
                  <Statistic.Label>Patients</Statistic.Label>
                </Statistic>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={3}>
            <Card>
              <Card.Content textAlign="center">
                <Statistic color="blue">
                  <Statistic.Value>{data?.forms}</Statistic.Value>
                  <Statistic.Label>Forms</Statistic.Label>
                </Statistic>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={3}>
            <Card>
              <Card.Content textAlign="center">
                <Statistic color="green">
                  <Statistic.Value>{data?.formResponses}</Statistic.Value>
                  <Statistic.Label>Filled Forms</Statistic.Label>
                </Statistic>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={3}>
            <Card>
              <Card.Content textAlign="center">
                <Statistic color="orange">
                  <Statistic.Value>{data?.carePlans}</Statistic.Value>
                  <Statistic.Label>Care Plans</Statistic.Label>
                </Statistic>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={3}>
            <Card>
              <Card.Content textAlign="center">
                <Statistic color="violet">
                  <Statistic.Value>{data?.users}</Statistic.Value>
                  <Statistic.Label>Users</Statistic.Label>
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
