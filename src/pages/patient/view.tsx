import { PatientProps } from ".";
import Layout from "@/layouts/admin";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetPatientQuery } from "@/services/patient";
import { Table, Icon, Header } from "semantic-ui-react";

const ViewPatient = () => {
  const { patient } = useParams();
  const [profile, setProfile] = useState<PatientProps>();
  const { isSuccess, data, isError, error, refetch } = useGetPatientQuery({
    id: patient,
  });

  useEffect(() => {
    if (isSuccess) setProfile(data?.patient);
    if (isError) console.log(error);
  }, [data, isSuccess, isError]);

  return (
    <Layout>
      <Header disabled as="h1">
        Patient Information
      </Header>
      <div style={{ paddingBottom: 30 }}>
        <Link to="/patient" className="ui button positive right floated">
          All patients
        </Link>
        <Link
          to={"/patient/edit/" + profile?._id}
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
            <Table.Cell>Full Names</Table.Cell>
            <Table.Cell>
              {profile?.firstName} {profile?.lastName}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Patient ID</Table.Cell>
            <Table.Cell>{profile?.patientId} </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Date of Birth</Table.Cell>
            <Table.Cell>
              {new Date(profile?.dob || "").toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Phone</Table.Cell>
            <Table.Cell>{profile?.phone}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Gender</Table.Cell>
            <Table.Cell>{profile?.gender}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Marital Status</Table.Cell>
            <Table.Cell>{profile?.maritalStatus}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Father</Table.Cell>
            <Table.Cell>{profile?.father}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Mother</Table.Cell>
            <Table.Cell>{profile?.mother}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Nationality</Table.Cell>
            <Table.Cell>{profile?.nationality}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>National ID</Table.Cell>
            <Table.Cell>{profile?.nationalID}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Passport</Table.Cell>
            <Table.Cell>{profile?.passport}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Occupation</Table.Cell>
            <Table.Cell>{profile?.occupation}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Religion</Table.Cell>
            <Table.Cell>{profile?.religion}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Contact Person</Table.Cell>
            <Table.Cell>
              {profile?.contactPersonName} {profile?.contactPersonPhone}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Insurance</Table.Cell>
            <Table.Cell>
              {profile?.insuranceType} {profile?.insuranceNumber}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Address</Table.Cell>
            <Table.Cell>
              {profile?.homeAddress?.country} &middot;
              {profile?.homeAddress?.province} &middot;
              {profile?.homeAddress?.district} &middot;
              {profile?.homeAddress?.sector} &middot;
              {profile?.homeAddress?.cell} &middot;
              {profile?.homeAddress?.village}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Layout>
  );
};

export default ViewPatient;
