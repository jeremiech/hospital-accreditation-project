import {
  Form,
  Grid,
  Select,
  Header,
  Message,
  Checkbox,
} from "semantic-ui-react";
import Layout from "@/layouts/admin";
import { useNavigate, Link } from "react-router-dom";
import { useAddPatientMutation } from "@/services/patient";
import { useState, useEffect, SetStateAction } from "react";

const AddAdmission = () => {
  const navigate = useNavigate();
  const [transferredFrom, setTransferredFrom] = useState<string>("");
  const [isRecovered, setIsRecovered] = useState<boolean>(false);
  const [isImproved, setIsImproved] = useState<boolean>(false);
  const [isUnimproved, setIsunimproved] = useState<boolean>(false);
  const [diedAfter48hr, setDiedAfter48hr] = useState<boolean>(false);
  const [diedBefore48hr, setDiedBefore48hr] = useState<boolean>(false);
  const [wasAutopsyRequested, setWasAutopsyRequested] =
    useState<boolean>(false);
  const [hasFled, setHasFled] = useState<boolean>(false);
  const [referredTo, setReferredTo] = useState<string>("");
  const [clinicalSummary, setClinicalSummary] = useState<string>("");
  const [finalDiagnosis, setFinalDiagnosis] = useState<string>("");
  const [investigationSummary, setInvestigationSummary] = useState<string>("");
  const [otherDiagnosis, setOtherDiagnosis] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [modeOfAdmission, setModeOfAdmission] = useState<string>("");
  const [admissionDate, setAdmissionDate] = useState<Date>();
  const [dischargeDate, setDischargeDate] = useState<Date>();
  const [addPatient, { data, error, isLoading, isSuccess, isError }] =
    useAddPatientMutation();
  const handleSubmit = (e: { preventDefault: VoidFunction }) => {
    e.preventDefault();
    addPatient({
      modeOfAdmission,
      transferredFrom,
      isRecovered,
      isImproved,
      isUnimproved,
      diedAfter48hr,
      diedBefore48hr,
      wasAutopsyRequested,
      hasFled,
      clinicalSummary,
      investigationSummary,
      otherDiagnosis,
      referredTo,
      admissionDate,
      dischargeDate,
      finalDiagnosis,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setMessage(data?.msg);
      if (data?.msg == "patient saved") navigate("/patient");
    }
    if (isError) console.log(error);
  }, [isError, isSuccess]);

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
                required
                control={Select}
                placeholder="Single"
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
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Form.Field
                type="text"
                control="input"
                value={referredTo}
                label="Referred to"
                placeholder="Referred to"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setReferredTo(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                required
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
