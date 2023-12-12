import {
  useGetPatientsQuery,
  useDeletePatientMutation,
} from "@/services/patient";
import Layout from "@/layouts/admin";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table, Icon, Input, Pagination, Header } from "semantic-ui-react";

interface PatientProps {
  _id: string;
  patientId: string;
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

const AllAnesthesia = () => {
  const limit: number = 10;
  const [page, setPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [rows, setRows] = useState<Array<PatientProps>>([]);
  const { data, error, refetch, isSuccess, isError } = useGetPatientsQuery({
    skip,
    limit,
  });
  const [deletePatient] = useDeletePatientMutation();

  useEffect(() => {
    if (isSuccess) {
      setRows(data?.patients);
      setTotal(Math.ceil(parseInt(data?.total) / limit));
    }
    if (isError) console.log(error);
  }, [page, data, isSuccess, isError]);

  return (
    <Layout>
      <Header disabled as="h1">
        All Anesthesia Consent
      </Header>
      <Input icon="search" placeholder="Search..." />
      <Link
        to="/form/anesthesia/add"
        className="ui button primary right floated"
      >
        <Icon name="plus" />
        Add Anesthesia
      </Link>
      <button className="ui icon button right floated" onClick={refetch}>
        <Icon name="refresh" />
      </button>
      <Table celled fixed singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>Patient ID</Table.HeaderCell>
            <Table.HeaderCell>National ID</Table.HeaderCell>
            <Table.HeaderCell>Date of Birth</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows?.map((item) => (
            <Table.Row key={item._id}>
              <Table.Cell>
                {item.firstName} {item.lastName}
              </Table.Cell>
              <Table.Cell>{item.phone} </Table.Cell>
              <Table.Cell>{item.patientId} </Table.Cell>
              <Table.Cell>{item.nationalID} </Table.Cell>
              <Table.Cell>
                {new Date(item.dob).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Table.Cell>
              <Table.Cell>
                <div className="ui icon tiny buttons">
                  <Link
                    to={"/patient/view/" + item._id}
                    className="ui button basic positive"
                  >
                    <Icon name="eye" />
                  </Link>
                  <Link
                    to={"/patient/edit/" + item._id}
                    className="ui button positive"
                  >
                    <Icon name="pencil" />
                  </Link>
                  <button className="ui button orange">
                    <Icon
                      name="trash alternate"
                      onClick={() => {
                        deletePatient({ id: item._id });
                        refetch();
                      }}
                    />
                  </button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Pagination
        activePage={page}
        onPageChange={(_e, { activePage }) => {
          setSkip(limit * ((activePage as number) - 1));
          setPage(activePage as number);
        }}
        totalPages={total}
      />
    </Layout>
  );
};

export default AllAnesthesia;
