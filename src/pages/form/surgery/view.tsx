import { SurgeryProps } from ".";
import Layout from "@/layouts/admin";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon, Table, Header } from "semantic-ui-react";
import { useGetSurgeryQuery } from "@/services/surgery";

const ViewSurgery = () => {
  const { surgery } = useParams();
  const [profile, setProfile] = useState<SurgeryProps>();
  const { isSuccess, data, isError, error, refetch } = useGetSurgeryQuery({
    id: surgery,
  });

  useEffect(() => {
    if (isSuccess) setProfile(data?.surgery);
    if (isError) console.log(error);
  }, [data, isSuccess, isError]);

  return (
    <Layout>
      <Header disabled as="h1">
        Surgery Consent Details
      </Header>
      <div style={{ paddingBottom: 30 }}>
        <Link to="/form/surgery/" className="ui button positive right floated">
          All surgery consent
        </Link>
        <Link
          to={"/form/surgery/edit/" + profile?._id}
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
            <Table.Cell>Date of Surgery</Table.Cell>
            <Table.Cell>
              {new Date(profile?.date || "").toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Doctor</Table.Cell>
            <Table.Cell>{profile?.doctor?.name}</Table.Cell>
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
            <Table.Cell>Next of Kin</Table.Cell>
            <Table.Cell>{profile?.nextOfKin}</Table.Cell>
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

export default ViewSurgery;
