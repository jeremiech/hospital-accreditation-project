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

const AddAnesthesia = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const [patient, setPatient] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);
  const [anesthesist, setAnesthesist] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [sideEffect, setSideEffect] = useState<string>("");
  const [patientQuestion, setPatientQuestion] = useState<string>("");
  const [witness, setWitness] = useState<string>("");
  const [operationDetails, setOperationDetails] = useState<string>("");
  const [authorizingPerson, setAuthorizingPerson] = useState<string>("");
  const [patientOptions, setPatientOptions] = useState<TheProps[]>();
  const [doctorOptions, setDoctorOptions] = useState<TheProps[]>();
  const [addAdmission, { data, error, isLoading, isSuccess, isError }] =
    useAddAdmissionMutation();
  const getPatients = useGetPatientsQuery({ skip: 0, limit: 100 });
  const getDoctors = useGetUsersQuery({ skip: 0, limit: 100, role: "doctor" });

  const handleSubmit = (e: { preventDefault: VoidFunction }) => {
    e.preventDefault();
    addAdmission({
      agreed,
      patient,
      anesthesist,
      date,
      patientQuestion,
      sideEffect,
      authorizingPerson,
      witness,
      operationDetails,
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
        Add Anesthesia
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
                type="date"
                control="input"
                value={date}
                label="Date"
                placeholder="Date"
                onChange={(e: {
                  target: { value: SetStateAction<Date | undefined> };
                }) => setDate(e.target.value || new Date())}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                control={Select}
                value={anesthesist}
                label="Anesthesist"
                options={doctorOptions}
                placeholder="Anesthesist"
                onChange={(_e: object, a: { value: string }) =>
                  setAnesthesist(a.value)
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column>
              <p>
                The anesthesia procedure is necessary for undertaking this
                surgery / medical procedure in order to alleviate pain and fear
                during the operation. The anesthesist has explained the risks
                and procedure of anesthesia to me. I fully understand the
                information provided relating to the anesthesia. I had addressed
                my concerns and doubts regarding the anesthesia to the
                anesthesist and s/he has given me satisfactory response. I
                voluntarily give my authorization and consent to the
                administration of the proposed anesthesia.
              </p>
              <Form.Field
                control={Checkbox}
                value={agreed}
                label="Agreed"
                onChange={(e: { target: { value: SetStateAction<boolean> } }) =>
                  setAgreed(e.target.value)
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Form.Field
                type="text"
                value={authorizingPerson}
                control="input"
                label="Authorizing person"
                placeholder="Authorizing person"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setAuthorizingPerson(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                rows="3"
                value={witness}
                control="input"
                label="Witness"
                placeholder="Witness"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setWitness(e.target.value)
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Form.Field
                rows="3"
                value={sideEffect}
                control="textarea"
                label="Possible side effects"
                placeholder="Possible side effects"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setSideEffect(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                rows="3"
                value={patientQuestion}
                control="textarea"
                label="Patient's questions"
                placeholder="Patient's questions"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setPatientQuestion(e.target.value)
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
              <Link to="/form/anesthesia" className="ui right floated button">
                All anesthesia
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </Layout>
  );
};

export default AddAnesthesia;
