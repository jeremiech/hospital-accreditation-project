import Layout from "@/layouts/admin";
import { Icon, Header, Table, Button } from "semantic-ui-react";

const Report = () => {
  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Header as="h1">
          Final Diagnosis Report
          <Header.Subheader>December 20, 2023</Header.Subheader>
        </Header>
        <div>
          <Button primary>
            <Icon name="print" />
            print
          </Button>
        </div>
      </div>
      <Table celled fixed signleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}>#</Table.HeaderCell>
            <Table.HeaderCell>Illness</Table.HeaderCell>
            <Table.HeaderCell>No. of Patients</Table.HeaderCell>
            <Table.HeaderCell>Average Days in Hospital</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>Malaria</Table.Cell>
            <Table.Cell>20</Table.Cell>
            <Table.Cell>3</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>Diabetes</Table.Cell>
            <Table.Cell>15</Table.Cell>
            <Table.Cell>2</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>Heart Disease</Table.Cell>
            <Table.Cell>25</Table.Cell>
            <Table.Cell>5</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>Influenza</Table.Cell>
            <Table.Cell>12</Table.Cell>
            <Table.Cell>1</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>5</Table.Cell>
            <Table.Cell>Cancer</Table.Cell>
            <Table.Cell>30</Table.Cell>
            <Table.Cell>8</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>6</Table.Cell>
            <Table.Cell>Asthma</Table.Cell>
            <Table.Cell>18</Table.Cell>
            <Table.Cell>4</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>7</Table.Cell>
            <Table.Cell>Alzheimer's</Table.Cell>
            <Table.Cell>22</Table.Cell>
            <Table.Cell>6</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>8</Table.Cell>
            <Table.Cell>Stroke</Table.Cell>
            <Table.Cell>17</Table.Cell>
            <Table.Cell>3</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>9</Table.Cell>
            <Table.Cell>Obesity</Table.Cell>
            <Table.Cell>28</Table.Cell>
            <Table.Cell>7</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>10</Table.Cell>
            <Table.Cell>HIV/AIDS</Table.Cell>
            <Table.Cell>10</Table.Cell>
            <Table.Cell>1</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>11</Table.Cell>
            <Table.Cell>Arthritis</Table.Cell>
            <Table.Cell>14</Table.Cell>
            <Table.Cell>2</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>12</Table.Cell>
            <Table.Cell>Osteoporosis</Table.Cell>
            <Table.Cell>16</Table.Cell>
            <Table.Cell>3</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>13</Table.Cell>
            <Table.Cell>Others</Table.Cell>
            <Table.Cell>8</Table.Cell>
            <Table.Cell>6</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Layout>
  );
};

export default Report;
