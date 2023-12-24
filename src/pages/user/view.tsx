import user from "@/assets/doctor.jpeg";
import { useEffect, useState } from "react";
import Layout from "@/layouts/admin";
import { Icon, Header, Table, Button, Pagination } from "semantic-ui-react";
import {
  useGetPatientsQuery,
  useDeletePatientMutation,
} from "@/services/patient";
import { Link } from "react-router-dom";
import { PatientProps } from "../patient";

const ViewUser = () => {
  const limit: number = 7;
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
      <Table celled fixed signleLine>
        <Table.Row>
          <Table.Cell width={2}>
            <center>
              <img alt="logo" src={user} width="100" height="100" />
            </center>
          </Table.Cell>
          <Table.Cell>
            <ul>
              <li>Dr. Samuel Rukundo</li>
              <li>+250 480604006, samuel@clinic.rw</li>
              <li>
                I am Dr. Samuel, a board-certified with over 5 years of
                experience. My practice is rooted in a compassionate approach to
                patient care, and I specialize in surgery, striving to improve
                the health and well-being of those under my care.
              </li>
            </ul>
          </Table.Cell>
        </Table.Row>
      </Table>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Header as="h2" style={{ margin: 0, padding: 0 }}>
          Treated Patients
        </Header>
        <Button primary>
          <Icon name="print" />
          print
        </Button>
      </div>
      <Table celled fixed singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}>#</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>Patient ID</Table.HeaderCell>
            <Table.HeaderCell>National ID</Table.HeaderCell>
            <Table.HeaderCell>Date of Birth</Table.HeaderCell>
            <Table.HeaderCell width={1}>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows?.map((item, id) => (
            <Table.Row key={item._id}>
              <Table.Cell>{id + 1}</Table.Cell>
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

export default ViewUser;
