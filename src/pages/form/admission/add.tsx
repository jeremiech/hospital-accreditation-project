import {
  Form,
  Grid,
  Select,
  Header,
  Message,
  Checkbox,
} from "semantic-ui-react";
import Layout from "@/layouts/admin";
import { useGetUsersQuery } from "@/services/user";
import { useNavigate, Link } from "react-router-dom";
import { useGetPatientsQuery } from "@/services/patient";
import { useState, useEffect, SetStateAction } from "react";
import { useAddAdmissionMutation } from "@/services/admission";

interface TheProps {
  [key: string]: string;
}

const AddAdmission = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const [patient, setPatient] = useState<string>("");
  const [hasFled, setHasFled] = useState<boolean>(false);
  const [referredTo, setReferredTo] = useState<string>("");
  const [admissionDate, setAdmissionDate] = useState<Date>();
  const [dischargeDate, setDischargeDate] = useState<Date>();
  const [isImproved, setIsImproved] = useState<boolean>(false);
  const [isRecovered, setIsRecovered] = useState<boolean>(false);
  const [finalDiagnosis, setFinalDiagnosis] = useState<string>("");
  const [otherDiagnosis, setOtherDiagnosis] = useState<string>("");
  const [isUnimproved, setIsunimproved] = useState<boolean>(false);
  const [clinicalSummary, setClinicalSummary] = useState<string>("");
  const [transferredFrom, setTransferredFrom] = useState<string>("");
  const [modeOfAdmission, setModeOfAdmission] = useState<string>("");
  const [diedAfter48hr, setDiedAfter48hr] = useState<boolean>(false);
  const [diedBefore48hr, setDiedBefore48hr] = useState<boolean>(false);
  const [investigationSummary, setInvestigationSummary] = useState<string>("");
  const [patientOptions, setPatientOptions] = useState<TheProps[]>();
  const [doctorOptions, setDoctorOptions] = useState<TheProps[]>();
  const [wasAutopsyRequested, setWasAutopsyRequested] =
    useState<boolean>(false);
  const [addAdmission, { data, error, isLoading, isSuccess, isError }] =
    useAddAdmissionMutation();
  const getPatients = useGetPatientsQuery({ skip: 0, limit: 100 });
  const getDoctors = useGetUsersQuery({ skip: 0, limit: 100, role: "doctor" });

  const handleSubmit = (e: { preventDefault: VoidFunction }) => {
    e.preventDefault();
    addAdmission({
      hasFled,
      patient,
      isImproved,
      referredTo,
      isRecovered,
      isUnimproved,
      diedAfter48hr,
      admissionDate,
      dischargeDate,
      diedBefore48hr,
      otherDiagnosis,
      finalDiagnosis,
      modeOfAdmission,
      clinicalSummary,
      transferredFrom,
      wasAutopsyRequested,
      investigationSummary,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setMessage(data?.msg);
      if (data?.msg == "admission saved") navigate("/form/admission");
    }
    if (isError) console.log(error);
    if (getPatients.isSuccess) {
      let result: TheProps[] = [];
      getPatients?.data?.patients?.map((a: TheProps) => {
        result.push({
          key: a?._id,
          value: a?._id,
          text: a?.firstName + " " + a?.lastName,
        });
      });
      setPatientOptions(result);
    }
    if (getDoctors.isSuccess) {
      let result: TheProps[] = [];
      getDoctors?.data?.users?.map((a: TheProps) => {
        result.push({
          key: a?._id,
          value: a?._id,
          text: a?.name,
        });
      });
      setDoctorOptions(result);
    }
  }, [isError, isSuccess, getDoctors.isSuccess, getPatients.isSuccess]);

  return (
    <Layout>
      <Header disabled as="h1">
        Add Admission
      </Header>
      {message && <Message info>{message}</Message>}
      <Form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Form.Field
                required
                control={Select}
                placeholder="Patient ID"
                value={patient}
                label="Patient ID"
                options={patientOptions}
                onChange={(_e: object, a: { value: string }) =>
                  setPatient(a.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                required
                type="date"
                control="input"
                value={admissionDate}
                label="Date of Admission"
                placeholder="Date of Admission"
                onChange={(e: {
                  target: { value: SetStateAction<Date | undefined> };
                }) => setAdmissionDate(e.target.value || new Date())}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                type="date"
                control="input"
                value={dischargeDate}
                label="Discharge Date"
                placeholder="Discharge Date"
                onChange={(e: {
                  target: { value: SetStateAction<Date | undefined> };
                }) => setDischargeDate(e.target.value || new Date())}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Form.Field
                control={Select}
                value={referredTo}
                label="Referred to"
                options={doctorOptions}
                placeholder="Referred to"
                onChange={(_e: object, a: { value: string }) =>
                  setReferredTo(a.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                required
                control={Select}
                placeholder="Mode of Admission"
                value={modeOfAdmission}
                label="Mode of Admission"
                onChange={(_e: object, a: { value: string }) =>
                  setModeOfAdmission(a.value)
                }
                options={[
                  { key: "v", text: "Voluntary", value: "voluntary" },
                  { key: "t", text: "Transferred", value: "transferred" },
                ]}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                type="text"
                value={transferredFrom}
                control="input"
                label="Transfer from"
                placeholder="Transfer from"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setTransferredFrom(e.target.value)
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Form.Field
                control={Checkbox}
                value={isRecovered}
                label="Recovered"
                onChange={(e: { target: { value: SetStateAction<boolean> } }) =>
                  setIsRecovered(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                control={Checkbox}
                value={isImproved}
                label="Improved"
                onChange={(e: { target: { value: SetStateAction<boolean> } }) =>
                  setIsImproved(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                control={Checkbox}
                value={isUnimproved}
                label="Unimproved"
                onChange={(e: { target: { value: SetStateAction<boolean> } }) =>
                  setIsunimproved(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                control={Checkbox}
                value={hasFled}
                label="Fled"
                onChange={(e: { target: { value: SetStateAction<boolean> } }) =>
                  setHasFled(e.target.value)
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Form.Field
                control={Checkbox}
                value={diedBefore48hr}
                label="Died before 48 hr"
                onChange={(e: { target: { value: SetStateAction<boolean> } }) =>
                  setDiedBefore48hr(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                control={Checkbox}
                value={diedAfter48hr}
                label="Died after 48 hr"
                onChange={(e: { target: { value: SetStateAction<boolean> } }) =>
                  setDiedAfter48hr(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                control={Checkbox}
                value={wasAutopsyRequested}
                label="Autopsy requested"
                onChange={(e: { target: { value: SetStateAction<boolean> } }) =>
                  setWasAutopsyRequested(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column />
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Form.Field
                rows="3"
                value={clinicalSummary}
                control="textarea"
                label="Clinical summary"
                placeholder="Clinical summary"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setClinicalSummary(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                rows="3"
                value={finalDiagnosis}
                control="textarea"
                label="Final diagnosis"
                placeholder="Final diagnosis"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setFinalDiagnosis(e.target.value)
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Form.Field
                rows="3"
                value={investigationSummary}
                control="textarea"
                label="Investigation summary"
                placeholder="Investigation summary"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setInvestigationSummary(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                rows="3"
                value={otherDiagnosis}
                control="textarea"
                label="Other diagnosis"
                placeholder="Other diagnosis"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setOtherDiagnosis(e.target.value)
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <button
                className="ui button primary"
                disabled={isLoading}
                type="submit"
              >
                Submit
              </button>
              <Link to="/form/admission" className="ui right floated button">
                All admissions
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </Layout>
  );
};

export default AddAdmission;
