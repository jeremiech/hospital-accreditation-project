import Layout from "@/layouts/admin";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetPatientsQuery } from "@/services/patient";
import { Table, Icon, Input, Pagination, Header } from "semantic-ui-react";

interface PatientProps {
  _id: string;
  firstName: string;
  lastName: string;
  dob: Date;
  nationalID: string;
  phone: string;
  homeAddress: {
    country: string;
    province: string;
    district: string;
    sector: string;
    cell: string;
    village: string;
  };
  date: Date;
}

const AllPatients = () => {
  const [skip, setSkip] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [rows, setRows] = useState<Array<PatientProps>>([]);
  const { data, error, refetch, isLoading, isSuccess, isError } =
    useGetPatientsQuery({ skip, limit });

  useEffect(() => {
    if (isSuccess) setRows(data?.patients);
    if (isError) console.log(error);
  }, [isSuccess, isError]);

  return (
    <Layout>
      <Header disabled as="h1">
        All Patients
      </Header>
      <Input icon="search" placeholder="Search..." />
      <Link to="/patient/add" className="ui button primary right floated">
        <Icon name="plus" />
        Add Patient
      </Link>
      <Table celled fixed singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>National ID</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Date of Birth</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows?.map((item) => (
            <Table.Row key={item._id}>
              <Table.Cell>
                {item.firstName} {item.lastName}
              </Table.Cell>
              <Table.Cell>{item.phone} </Table.Cell>
              <Table.Cell>{item.nationalID} </Table.Cell>
              <Table.Cell>
                {item.homeAddress.country} &middot; {item.homeAddress.province}{" "}
                &middot; {item.homeAddress.district}
              </Table.Cell>
              <Table.Cell>
                {new Date(item.dob).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Pagination
        boundaryRange={0}
        defaultActivePage={1}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={10}
      />
    </Layout>
  );
};

export default AllPatients;
