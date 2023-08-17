import Layout from "@/layouts/admin";
import { useNavigate } from "react-router-dom";
import { useAddPatientMutation } from "@/services/patient";
import { useState, useEffect, SetStateAction } from "react";
import {
  Form,
  Grid,
  Input,
  Select,
  Header,
  Message,
  Checkbox,
} from "semantic-ui-react";

const AddPatient = () => {
  const navigate = useNavigate();
  const [dob, setDob] = useState<Date>();
  const [phone, setPhone] = useState<string>("");
  const [father, setFather] = useState<string>("");
  const [mother, setMother] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [passport, setPassport] = useState<string>("");
  const [religion, setReligion] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [nationalID, setNationalID] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [maritalStatus, setMaritalStatus] = useState<string>("");
  const [insuranceType, setInsuranceType] = useState<string>("");
  const [hasInsurance, setHasInsurance] = useState<boolean>(false);
  const [insuranceNumber, setInsuranceNumber] = useState<string>("");
  const [contactPersonName, setContactPersonName] = useState<string>("");
  const [contactPersonPhone, setContactPersonPhone] = useState<string>("");
  const [addPatient, { data, error, isLoading, isSuccess, isError }] =
    useAddPatientMutation();
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    addPatient({
      dob,
      phone,
      father,
      mother,
      passport,
      lastName,
      religion,
      firstName,
      nationalID,
      occupation,
      nationality,
      hasInsurance,
      maritalStatus,
      insuranceType,
      insuranceNumber,
      contactPersonName,
      contactPersonPhone,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      //   setMessage(data?.msg);
      //   if (data?.msg == "welcome aboard") navigate("/login");
    }
    if (isError) console.log(error);
  }, [isError, isSuccess]);

  return (
    <Layout>
      <Header disabled as="h1">
        Add Patient
      </Header>
      {message && <Message info>{message}</Message>}
      <Form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Form.Field
                required
                type="text"
                control="input"
                value={firstName}
                label="First Name"
                placeholder="Mr/s"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setFirstName(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                required
                type="text"
                control="input"
                value={lastName}
                label="Last Name"
                placeholder="Patient"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setLastName(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                required
                type="date"
                value={dob}
                control="input"
                label="Date of Birth"
                onChange={(e: {
                  target: { value: SetStateAction<Date | undefined> };
                }) => setDob(e.target.value || new Date())}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Form.Field
                required
                control={Select}
                placeholder="Single"
                value={maritalStatus}
                label="Marital Status"
                onChange={(_e: object, a: { value: string }) =>
                  setMaritalStatus(a.value)
                }
                options={[
                  { key: "s", text: "Single", value: "single" },
                  { key: "m", text: "Married", value: "married" },
                  { key: "d", text: "Divorced", value: "divorced" },
                ]}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                type="text"
                value={mother}
                control="input"
                label="Mother Name"
                placeholder="Mother"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setMother(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                type="text"
                value={father}
                control="input"
                label="Father Name"
                placeholder="Father"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setFather(e.target.value)
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Form.Field
                required
                type="text"
                control="input"
                value={nationality}
                label="Nationality"
                placeholder="Rwandese"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setNationality(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                required
                type="text"
                control="input"
                value={nationalID}
                label="National ID"
                placeholder="119903759209404"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setNationalID(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                type="text"
                control="input"
                value={passport}
                label="Passport"
                placeholder="PC 820408"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setPassport(e.target.value)
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Form.Field
                required
                type="text"
                value={phone}
                control="input"
                label="Telephone"
                placeholder="07350590450"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setPhone(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                required
                type="text"
                control="input"
                value={occupation}
                label="Occupation"
                placeholder="Accountant"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setOccupation(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                type="text"
                control="input"
                label="Religion"
                value={religion}
                placeholder="Adventist"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setReligion(e.target.value)
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Form.Field
                required
                type="text"
                control="input"
                value={contactPersonName}
                label="Contact Person Name"
                placeholder="Mr/s Contact Person"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setContactPersonName(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                required
                type="text"
                control="input"
                placeholder="07803903504"
                value={contactPersonPhone}
                label="Contact Person Phone"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setContactPersonPhone(e.target.value)
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Form.Field
                required
                control={Checkbox}
                value={hasInsurance}
                label="Patient has Insurance?"
                onChange={(e: { target: { value: SetStateAction<boolean> } }) =>
                  setHasInsurance(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                type="text"
                control="input"
                value={insuranceType}
                label="Type of Insurance"
                placeholder="Individual, Company, Family"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setInsuranceType(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                type="text"
                control="input"
                value={insuranceNumber}
                label="Insurance Number"
                placeholder="24803903504"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setInsuranceNumber(e.target.value)
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
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </Layout>
  );
};

export default AddPatient;
