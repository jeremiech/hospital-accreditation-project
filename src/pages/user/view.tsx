import {
  Icon,
  List,
  Table,
  Header,
  Button,
  ListItem,
  Pagination,
} from "semantic-ui-react";
import img from "@/assets/user.png";
import Layout from "@/layouts/admin";
import { useEffect, useState } from "react";
import { useGetUserQuery } from "@/services/user";
import { Link, useParams } from "react-router-dom";
import { AdmissionProps } from "../form/admission";
import { useGetAdmissionsQuery } from "@/services/admission";

interface ProfileProps {
  [key: string]: string;
}

const ViewUser = () => {
  const limit: number = 10;
  const { user } = useParams();
  const [page, setPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const getUser = useGetUserQuery({ id: user });
  const [profile, setProfile] = useState<ProfileProps>();
  const [admissionRows, setAdmissionRows] = useState<AdmissionProps[]>([]);
  const getAdmissions = useGetAdmissionsQuery({
    id: user,
    skip,
    limit,
  });

  useEffect(() => {
    if (getAdmissions.isSuccess) {
      setAdmissionRows(getAdmissions.data?.admissions);
      setTotal(Math.ceil(parseInt(getAdmissions.data?.total) / limit));
    }
    if (getAdmissions.isError) console.log(getAdmissions.error);
    if (getUser.isSuccess) setProfile(getUser.data?.user);
  }, [page, getAdmissions.isSuccess, getAdmissions.isError, getUser.isSuccess]);

  return (
    <Layout>
      <Table celled fixed signleLine>
        <Table.Row>
          <Table.Cell width={2}>
            <center>
              <img
                alt={profile?.firstName}
                src={
                  profile?.image
                    ? import.meta.env.VITE_API + "/uploads/" + profile?.image
                    : img
                }
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
            <center>
              <Link to={"/user/edit/" + user} className="ui right button">
                Edit Profile
              </Link>
            </center>
          </Table.Cell>
        </Table.Row>
      </Table>
      {["doctor", "nurse"].includes(profile?.role || "") && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Header as="h2" style={{ margin: 0, padding: 0 }}>
              Admitted Patients
            </Header>
            <Button primary>
              <Icon name="print" />
              print
            </Button>
          </div>
          <Table celled fixed singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Patient</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Final Diagnosis</Table.HeaderCell>
                <Table.HeaderCell>Admission date</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {admissionRows?.map((item) => (
                <Table.Row key={item._id}>
                  <Table.Cell>
                    {item.patient.firstName} {item.patient.lastName}
                  </Table.Cell>
                  <Table.Cell>
                    {item?.hasFled != false && "fled"}
                    {item?.isRecovered != false && "recovered"}
                    {item?.isImproved != false && "improved health"}
                    {item?.diedAfter48hr != false && "died after 48hr"}
                    {item?.diedBefore48hr != false && "died before 48hr"}
                    {item?.isUnimproved != false && "health not improving"}
                    {item?.wasAutopsyRequested != false && "requested autopsy"}
                  </Table.Cell>
                  <Table.Cell>{item.finalDiagnosis}</Table.Cell>
                  <Table.Cell>
                    {new Date(item.admissionDate).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="ui icon tiny buttons">
                      <Link
                        to={"/form/admission/view/" + item._id}
                        className="ui button basic positive"
                      >
                        <Icon name="eye" />
                      </Link>
                      <Link
                        to={"/form/admission/edit/" + item._id}
                        className="ui button positive"
                      >
                        <Icon name="pencil" />
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
        </>
      )}
    </Layout>
  );
};

export default ViewUser;
