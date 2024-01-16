import { AnesthesiaProps } from ".";
import Layout from "@/layouts/admin";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon, Table, Header } from "semantic-ui-react";
import { useGetAnesthesiaQuery } from "@/services/anesthesia";

const ViewAnesthesia = () => {
  const { anesthesia } = useParams();
  const [profile, setProfile] = useState<AnesthesiaProps>();
  const { isSuccess, data, isError, error, refetch } = useGetAnesthesiaQuery({
    id: anesthesia,
  });

  useEffect(() => {
    if (isSuccess) setProfile(data?.anesthesia);
    if (isError) console.log(error);
  }, [data, isSuccess, isError]);

  return (
    <Layout>
      <Header disabled as="h1">
        Anesthesia Consent Details
      </Header>
      <div style={{ paddingBottom: 30 }}>
        <Link
          to="/form/anesthesia/"
          className="ui button positive right floated"
        >
          All anesthesia
        </Link>
        <Link
          to={"/form/anesthesia/edit/" + profile?._id}
          className="ui icon button teal right floated"
        >
          <Icon name="pencil" />
        </Link>
        <button className="ui icon button right floated" onClick={refetch}>
          <Icon name="refresh" />
        </button>
      </div>
      <Table celled fixed singleLine>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Patient</Table.Cell>
            <Table.Cell>
              {profile?.patient?.firstName} {profile?.patient?.lastName}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Date of Anesthesia</Table.Cell>
            <Table.Cell>
              {new Date(profile?.date || "").toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Anesthesist</Table.Cell>
            <Table.Cell>{profile?.anesthesist?.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Agreed to procedure</Table.Cell>
            <Table.Cell>{profile?.agreed ? "yes" : "no"}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Authorizing Person</Table.Cell>
            <Table.Cell>{profile?.authorizingPerson}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Witness</Table.Cell>
            <Table.Cell>{profile?.witness}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Possible Side Effects</Table.Cell>
            <Table.Cell>{profile?.sideEffect}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Patient's Questions</Table.Cell>
            <Table.Cell>{profile?.patientQuestion}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Operation Details</Table.Cell>
            <Table.Cell>{profile?.operationDetails}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Layout>
  );
};

export default ViewAnesthesia;
