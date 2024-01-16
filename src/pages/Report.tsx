import Layout from "@/layouts/admin";
import { useState, useEffect } from "react";
import { useGetReportQuery } from "@/services/default";
import { Icon, Header, Table, Button } from "semantic-ui-react";
import { AdmissionTable } from "./form/admission";

interface DataProps {
  _id: string;
  count: number;
}

const Report = () => {
  const [hide, setHide] = useState<boolean>(false);
  const [rows, setRows] = useState<DataProps[]>([]);
  const { data, error, isSuccess, isError } = useGetReportQuery("");

  function printReport(): void {
    setHide(true);
    setTimeout(() => {
      window.print();
      setHide(false);
    }, 2000);
  }

  useEffect(() => {
    if (isSuccess) setRows(data?.admissions);
    if (isError) console.log(error);
  }, [data, isSuccess, isError]);

  return (
    <Layout showSideBar={hide}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Header as="h1">
          Final Diagnosis Report
          <Header.Subheader>December 20, 2023</Header.Subheader>
        </Header>
        <div>
          <Button primary onClick={printReport}>
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
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows?.map((item, id) => (
            <Table.Row key={item._id}>
              <Table.Cell>{id + 1}</Table.Cell>
              <Table.Cell>{item._id}</Table.Cell>
              <Table.Cell>{item.count}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <AdmissionTable />
    </Layout>
  );
};

export default Report;
