import {
  Title,
  Legend,
  Tooltip,
  BarElement,
  ArcElement,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
  Chart as ChartJS,
} from "chart.js";
import Layout from "@/layouts/admin";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { Doughnut, Bar } from "react-chartjs-2";
import { setMetrics } from "@/store/slice/AppSlice";
import { Grid, Card, Header, Statistic } from "semantic-ui-react";
import { useGetMetricsQuery, useGetReportQuery } from "@/services/default";

ChartJS.register(
  Title,
  Legend,
  Tooltip,
  BarElement,
  ArcElement,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale
);

const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
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

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const getReport = useGetReportQuery("");
  const { data, isSuccess } = useGetMetricsQuery("");
  const [labels1, setLabels1] = useState<string[]>([]);
  const [labels2, setLabels2] = useState<string[]>([]);
  const [patientCount1, setPatientCount1] = useState<number[]>([]);
  const [patientCount2, setPatientCount2] = useState<number[]>([]);

  useEffect(() => {
    let _labels1: string[] = [];
    let _labels2: string[] = [];
    let _patientCount1: number[] = [];
    let _patientCount2: number[] = [];

    if (isSuccess) dispatch(setMetrics(data));
    if (getReport.isSuccess) {
      getReport.data?.admissions?.map(
        (item: { _id: string; count: number }) => {
          _labels1.push(item?._id);
          _patientCount1.push(item?.count);
        }
      );
      getReport.data?.monthly?.map((item: { month: string; count: number }) => {
        _labels2.push(item?.month);
        _patientCount2.push(item?.count);
      });
      setLabels1(_labels1);
      setLabels2(_labels2);
      setPatientCount1(_patientCount1);
      setPatientCount2(_patientCount2);
    }
  }, [isSuccess, getReport.isSuccess]);

  const doughnutData = {
    labels: labels1,
    datasets: [
      {
        label: "# of Patients",
        data: patientCount1,
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

  const barData = {
    labels: labels2,
    datasets: [
      {
        label: "Admitted patients",
        data: patientCount2,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
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
            <Bar options={barOptions} data={barData} />
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
