import {
  Grid,
  Icon,
  Form,
  List,
  Table,
  Select,
  Header,
  Button,
  ListItem,
  Pagination,
} from "semantic-ui-react";
import img from "@/assets/user.png";
import Layout from "@/layouts/admin";
import { useEffect, useState } from "react";
import { SurgeryProps } from "../form/surgery";
import { useGetUserQuery } from "@/services/user";
import { Link, useParams } from "react-router-dom";
import { AdmissionProps } from "../form/admission";
import { AnesthesiaProps } from "../form/anesthesia";
import { useGetSurgeriesQuery } from "@/services/surgery";
import { useGetAdmissionsQuery } from "@/services/admission";
import { useGetAnesthesiasQuery } from "@/services/anesthesia";

interface ProfileProps {
  [key: string]: string;
}

const showOptions = [
  { key: "a", value: "all", text: "all" },
  { key: "d", value: "admitted", text: "admitted" },
  { key: "n", value: "anesthesia", text: "anesthesia" },
  { key: "s", value: "surgery", text: "surgery" },
];

const ViewUser = () => {
  const limit: number = 10;
  const { user } = useParams();
  const [page, setPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const getUser = useGetUserQuery({ id: user });
  const [show, setShow] = useState<string>("all");
  const [hide, setHide] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileProps>();
  const getSurgery = useGetSurgeriesQuery({ id: user, skip, limit });
  const [surgeryRows, setSurgeryRows] = useState<SurgeryProps[]>([]);
  const getAdmissions = useGetAdmissionsQuery({ id: user, skip, limit });
  const getAnesthesia = useGetAnesthesiasQuery({ id: user, skip, limit });
  const [admissionRows, setAdmissionRows] = useState<AdmissionProps[]>([]);
  const [anesthesiaRows, setAnesthesiaRows] = useState<AnesthesiaProps[]>([]);

  function printReport(): void {
    setHide(true);
    setTimeout(() => {
      window.print();
      setHide(false);
    }, 2000);
  }

  useEffect(() => {
    if (getAdmissions.isSuccess) {
      setAdmissionRows(getAdmissions.data?.admissions);
      setTotal(
        Math.ceil(
          parseInt(
            getSurgery.data?.total +
              getAnesthesia.data?.total +
              getAdmissions.data?.total
          ) /
            (limit * 3)
        )
      );
    }
    if (getSurgery.isSuccess) setSurgeryRows(getSurgery.data?.surgeries);
    if (getAnesthesia.isSuccess)
      setAnesthesiaRows(getAnesthesia.data?.anesthesias);
    if (getUser.isError) console.log(getUser.error);
    if (getUser.isSuccess) setProfile(getUser.data?.user);
  }, [
    page,
    getUser.isError,
    getUser.isSuccess,
    getSurgery.isSuccess,
    getAnesthesia.isSuccess,
    getAdmissions.isSuccess,
  ]);

  return (
    <Layout showSideBar={hide}>
      <Grid style={{ marginBottom: 3 }}>
        <Grid.Row>
          <Grid.Column width={14}>
            <Table celled fixed signleLine>
              <Table.Row>
                <Table.Cell width={3}>
                  <center>
                    <img
                      alt={profile?.firstName}
                      src={
                        profile?.image
                          ? import.meta.env.VITE_API +
                            "/uploads/" +
                            profile?.image
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
              </Table.Row>
            </Table>
          </Grid.Column>
          <Grid.Column width={2}>
            <Link to={"/user/edit/" + user} className="ui button fluid">
              Edit Profile
            </Link>
            <br />
            <Button primary fluid onClick={printReport}>
              <Icon name="print" />
              print
            </Button>
            <Form.Field
              fluid
              control={Select}
              value={show}
              options={showOptions}
              onChange={(_e: object, a: { value: string }) => setShow(a.value)}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {["doctor", "nurse"].includes(profile?.role || "") && (
        <>
          {["all", "admitted"].includes(show) && (
            <>
              <Header as="h3" style={{ margin: 0, padding: 0 }}>
                Admitted Patients
              </Header>
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
                        {item?.wasAutopsyRequested != false &&
                          "requested autopsy"}
                      </Table.Cell>
                      <Table.Cell>{item.finalDiagnosis}</Table.Cell>
                      <Table.Cell>
                        {new Date(item.admissionDate).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
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
            </>
          )}
          {["all", "anesthesia"].includes(show) && (
            <>
              <Header as="h3" style={{ margin: 0, padding: 0 }}>
                Anesthesia Patients
              </Header>
              <Table celled fixed singleLine>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Patient</Table.HeaderCell>
                    <Table.HeaderCell>Anesthesist</Table.HeaderCell>
                    <Table.HeaderCell>Operation</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {anesthesiaRows?.map((item) => (
                    <Table.Row key={item._id}>
                      <Table.Cell>
                        {item?.patient?.firstName} {item?.patient?.lastName}
                      </Table.Cell>
                      <Table.Cell>{item?.anesthesist?.name} </Table.Cell>
                      <Table.Cell>{item.operationDetails} </Table.Cell>
                      <Table.Cell>
                        {new Date(item.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </Table.Cell>
                      <Table.Cell>
                        <div className="ui icon tiny buttons">
                          <Link
                            to={"/form/anesthesia/view/" + item._id}
                            className="ui button basic positive"
                          >
                            <Icon name="eye" />
                          </Link>
                          <Link
                            to={"/form/anesthesia/edit/" + item._id}
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
            </>
          )}
          {["all", "surgery"].includes(show) && (
            <>
              <Header as="h3" style={{ margin: 0, padding: 0 }}>
                Surgery Patients
              </Header>
              <Table celled fixed singleLine>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Patient</Table.HeaderCell>
                    <Table.HeaderCell>Doctor</Table.HeaderCell>
                    <Table.HeaderCell>Operation</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {surgeryRows?.map((item) => (
                    <Table.Row key={item._id}>
                      <Table.Cell>
                        {item?.patient?.firstName} {item?.patient?.lastName}
                      </Table.Cell>
                      <Table.Cell>{item?.doctor?.name} </Table.Cell>
                      <Table.Cell>{item.operationDetails} </Table.Cell>
                      <Table.Cell>
                        {new Date(item.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </Table.Cell>
                      <Table.Cell>
                        <div className="ui icon tiny buttons">
                          <Link
                            to={"/form/surgery/view/" + item._id}
                            className="ui button basic positive"
                          >
                            <Icon name="eye" />
                          </Link>
                          <Link
                            to={"/form/surgery/edit/" + item._id}
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
            </>
          )}
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
