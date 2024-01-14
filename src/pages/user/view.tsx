import {
  Icon,
  List,
  Table,
  Header,
  Button,
  ListItem,
  Pagination,
} from "semantic-ui-react";
import Layout from "@/layouts/admin";
import img from "@/assets/doctor.jpeg";
import { PatientProps } from "../patient";
import { useEffect, useState } from "react";
import { useGetUserQuery } from "@/services/user";
import { Link, useParams } from "react-router-dom";
import { useGetPatientsQuery } from "@/services/patient";

interface ProfileProps {
  [key: string]: string;
}

const ViewUser = () => {
  const limit: number = 7;
  const { user } = useParams();
  const [page, setPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const getUser = useGetUserQuery({ id: user });
  const [profile, setProfile] = useState<ProfileProps>();
  const [rows, setRows] = useState<Array<PatientProps>>([]);
  const { data, error, refetch, isSuccess, isError } = useGetPatientsQuery({
    skip,
    limit,
  });

  useEffect(() => {
    if (isSuccess) {
      setRows(data?.patients);
      setTotal(Math.ceil(parseInt(data?.total) / limit));
    }
    if (isError) console.log(error);
    if (getUser.isSuccess) setProfile(getUser.data?.user);
  }, [page, data, isSuccess, isError, getUser.isSuccess]);

  return (
    <Layout>
      <Table celled fixed signleLine>
        <Table.Row>
          <Table.Cell width={2}>
            <center>
              <img
                alt="logo"
                src={profile?.image || img}
                width="100"
                height="100"
              />
            </center>
          </Table.Cell>
          <Table.Cell>
            <List>
              <ListItem>{profile?.name}</ListItem>
              <ListItem>{profile?.contact}</ListItem>
              <ListItem>{profile?.bio}</ListItem>
            </List>
          </Table.Cell>
          <Table.Cell width={2}>
            <Link to={"/user/edit/" + user} className="ui right floated button">
              Edit Profile
            </Link>
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
