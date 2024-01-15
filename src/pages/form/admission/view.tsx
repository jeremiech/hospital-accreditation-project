import Layout from "@/layouts/admin";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon, Table, Header } from "semantic-ui-react";
import { useGetAdmissionQuery } from "@/services/admission";

export interface AdmissionProps {
  _id: string;
  hasFled: boolean;
  isImproved: boolean;
  isRecovered: boolean;
  isUnimproved: boolean;
  diedAfter48hr: boolean;
  diedBefore48hr: boolean;
  wasAutopsyRequested: boolean;
  modeOfAdmission: string;
  transferredFrom: string;
  finalDiagnosis: string;
  otherDiagnosis: string;
  clinicalSummary: string;
  investigationSummary: string;
  referredTo: { name: string };
  patient: { firstName: string; lastName: string };
  admissionDate: Date;
  dischargeDate: Date;
}

const ViewAdmission = () => {
  const { admission } = useParams();
  const [profile, setProfile] = useState<AdmissionProps>();
  const { isSuccess, data, isError, error, refetch } = useGetAdmissionQuery({
    id: admission,
  });

  useEffect(() => {
    if (isSuccess) setProfile(data?.admission);
    if (isError) console.log(error);
  }, [data, isSuccess, isError]);

  return (
    <Layout>
      <Header disabled as="h1">
        Patient Admission Details
      </Header>
      <div style={{ paddingBottom: 30 }}>
        <Link
          to="/form/admission/"
          className="ui button positive right floated"
        >
          All admissions
        </Link>
        <Link
          to={"/form/admission/edit/" + profile?._id}
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
            <Table.Cell>Date of Admission</Table.Cell>
            <Table.Cell>
              {new Date(profile?.admissionDate || "").toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Discharge Date</Table.Cell>
            <Table.Cell>
              {new Date(profile?.dischargeDate || "").toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Referred to</Table.Cell>
            <Table.Cell>{profile?.referredTo?.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Mode of Admission</Table.Cell>
            <Table.Cell>{profile?.modeOfAdmission}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Transfer from</Table.Cell>
            <Table.Cell>{profile?.transferredFrom}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Final Diagnosis</Table.Cell>
            <Table.Cell>{profile?.finalDiagnosis}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Clinical Summary</Table.Cell>
            <Table.Cell>{profile?.clinicalSummary}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Investigation Summary</Table.Cell>
            <Table.Cell>{profile?.investigationSummary}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Other Diagnosis</Table.Cell>
            <Table.Cell>{profile?.otherDiagnosis}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Layout>
  );
};

export default ViewAdmission;
