import { Grid, Card, Header, Statistic } from "semantic-ui-react";
import {
  AreaChart,
  Area,
  Pie,
  Cell,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Layout from "@/layouts/admin";

interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const data = [
  {
    name: "Jan",
    uv: 40,
    pv: 24,
    amt: 24,
  },
  {
    name: "Feb",
    uv: 30,
    pv: 13,
    amt: 22,
  },
  {
    name: "Mar",
    uv: 20,
    pv: 98,
    amt: 22,
  },
  {
    name: "Apr",
    uv: 27,
    pv: 39,
    amt: 20,
  },
  {
    name: "May",
    uv: 18,
    pv: 48,
    amt: 21,
  },
  {
    name: "Jun",
    uv: 23,
    pv: 38,
    amt: 25,
  },
  {
    name: "Jul",
    uv: 34,
    pv: 43,
    amt: 21,
  },
];

const data1 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: CustomLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
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
          <Grid.Column width={8}>
            <ResponsiveContainer width="100%" height={500}>
              <AreaChart
                height={400}
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
                <Area
                  type="monotone"
                  dataKey="amt"
                  stackId="1"
                  stroke="#ffc658"
                  fill="#ffc658"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Grid.Column>
          <Grid.Column width={8}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  data={data1}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={160}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data1.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
