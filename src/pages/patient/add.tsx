import Layout from "@/layouts/admin";
import { useNavigate } from "react-router-dom";
import { useAddPatientMutation } from "@/services/patient";
import { useState, useEffect, SetStateAction } from "react";
import { Icon, Input, Message, Header, Form, Grid } from "semantic-ui-react";

const AddPatient = () => {
  const navigate = useNavigate();
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [dob, setDob] = useState<Date>();
  const [maritalStatus, setMaritalStatus] = useState<string>("");
  const [father, setFather] = useState<string>("");
  const [mother, setMother] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [nationalID, setNationalID] = useState<string>("");
  const [passport, setPassport] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [religion, setReligion] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [contactPersonName, setContactPersonName] = useState<string>("");
  const [contactPersonPhone, setContactPersonPhone] = useState<string>("");
  const [hasInsurance, setHasInsurance] = useState<boolean>(false);
  const [insuranceType, setInsuranceType] = useState<string>("");
  const [insuranceNumber, setInsuranceNumber] = useState<string>("");
  const [addPatient, { data, error, isLoading, isSuccess, isError }] =
    useAddPatientMutation();
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    addPatient({
      firstName,
      lastName,
      dob,
      maritalStatus,
      father,
      mother,
      nationality,
      nationalID,
      passport,
      occupation,
      religion,
      phone,
      contactPersonName,
      contactPersonPhone,
      hasInsurance,
      insuranceType,
      insuranceNumber,
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
        <Form.Field
          required
          type="text"
          value={firstName}
          control="input"
          label="First Name"
          placeholder="Mr/s"
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setFirstName(e.target.value)
          }
        />
        <Form.Field
          required
          type="text"
          value={lastName}
          control="input"
          label="Last Name"
          placeholder="Patient"
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setLastName(e.target.value)
          }
        />
        <Form.Field
          required
          type="date"
          value={dob}
          control="input"
          label="Date of Birth"
          onChange={(e: { target: { value: SetStateAction<Date> } }) =>
            setDob(e.target.value)
          }
        />
        <Form.Field
          required
          value={maritalStatus}
          control="select"
          label="Marital Status"
          placeholder="Single"
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setLastName(e.target.value)
          }
          options={[
            { key: "m", text: "Male", value: "male" },
            { key: "f", text: "Female", value: "female" },
            { key: "o", text: "Other", value: "other" },
          ]}
        />
        <Form.Field
          required
          type="text"
          value={mother}
          control="input"
          label="Mother Name"
          placeholder="Mother"
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setMother(e.target.value)
          }
        />
        <Form.Field
          required
          type="text"
          value={father}
          control="input"
          label="Father Name"
          placeholder="Father"
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setFather(e.target.value)
          }
        />
        <button
          className="ui button primary"
          disabled={isLoading}
          type="submit"
        >
          Submit
        </button>
      </Form>
    </Layout>
  );
};

export default AddPatient;
