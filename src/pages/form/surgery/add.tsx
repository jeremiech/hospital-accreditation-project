import { Form, Grid, Select, Header, Message } from "semantic-ui-react";
import Layout from "@/layouts/admin";
import { useGetUsersQuery } from "@/services/user";
import { useNavigate, Link } from "react-router-dom";
import { useGetPatientsQuery } from "@/services/patient";
import { useState, useEffect, SetStateAction } from "react";
import { useAddSurgeryMutation } from "@/services/surgery";

interface TheProps {
  [key: string]: string;
}

const AddSurgery = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const [patient, setPatient] = useState<string>("");
  const [doctor, setDoctor] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [nextOfKin, setNextOfKin] = useState<string>("");
  const [witness, setWitness] = useState<string>("");
  const [operationDetails, setOperationDetails] = useState<string>("");
  const [authorizingPerson, setAuthorizingPerson] = useState<string>("");
  const [patientOptions, setPatientOptions] = useState<TheProps[]>();
  const [doctorOptions, setDoctorOptions] = useState<TheProps[]>();
  const [addSurgery, { data, error, isLoading, isSuccess, isError }] =
    useAddSurgeryMutation();
  const getPatients = useGetPatientsQuery({ skip: 0, limit: 100 });
  const getDoctors = useGetUsersQuery({ skip: 0, limit: 100, role: "doctor" });

  const handleSubmit = (e: { preventDefault: VoidFunction }) => {
    e.preventDefault();
    addSurgery({
      date,
      patient,
      witness,
      nextOfKin,
      doctor,
      operationDetails,
      authorizingPerson,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setMessage(data?.msg);
      if (data?.msg == "surgery saved") navigate("/form/surgery");
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
        Add Surgery Consent
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
                label="Patient"
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
                value={doctor}
                label="Doctor"
                options={doctorOptions}
                placeholder="Doctor"
                onChange={(_e: object, a: { value: string }) =>
                  setDoctor(a.value)
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
            <Grid.Column>
              <Form.Field
                rows="3"
                value={nextOfKin}
                control="input"
                label="Next of kin"
                placeholder="Next of kin"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setNextOfKin(e.target.value)
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column>
              <p>
                this consent form is designed to provide a written confirmation
                of the discussion with the provider by recording some of the non
                significant medical information. it is intended to inform so as
                to give or with hold consent to proposed procedure
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Form.Field
                rows="3"
                value={operationDetails}
                control="textarea"
                label="Operation details"
                placeholder="Operation details"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setOperationDetails(e.target.value)
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
              <Link to="/form/surgery" className="ui right floated button">
                All surgery consent
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </Layout>
  );
};

export default AddSurgery;
