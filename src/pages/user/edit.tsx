import {
  useGetUserQuery,
  useGetUsersQuery,
  useEditUserMutation,
} from "@/services/user";
import Layout from "@/layouts/admin";
import { useGetPatientsQuery } from "@/services/patient";
import { useState, useEffect, SetStateAction } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Form, Grid, Select, Header, Message } from "semantic-ui-react";

interface TheProps {
  [key: string]: string;
}

const EditUser = () => {
  const { user } = useParams();
  const navigate = useNavigate();
  const [bio, setBio] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const getUser = useGetUserQuery({ id: user });
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [patient, setPatient] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [patientOptions, setPatientOptions] = useState<TheProps[]>();
  const [editUser, { data, error, isLoading, isSuccess, isError }] =
    useEditUserMutation();
  const getPatients = useGetPatientsQuery({ skip: 0, limit: 100 });
  const getDoctors = useGetUsersQuery({ skip: 0, limit: 100, role: "doctor" });

  const handleSubmit = (e: { preventDefault: VoidFunction }) => {
    e.preventDefault();
    editUser({
      id: user,
      name,
      bio,
      role,
      email,
      contact,
      patient,
      password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setMessage(data?.msg);
      if (data?.msg == "user updated") navigate("/user");
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
    if (getUser.isSuccess) {
      const u = getUser.data?.user;
      setBio(u.bio);
      setRole(u.role);
      setName(u.name);
      setEmail(u.email);
      setContact(u.contact);
      setPatient(u.patient);
    }
  }, [
    isError,
    isSuccess,
    getUser.isSuccess,
    getDoctors.isSuccess,
    getPatients.isSuccess,
  ]);

  return (
    <Layout>
      <Header disabled as="h1">
        Edit User
      </Header>
      {message && <Message info>{message}</Message>}
      <Form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Form.Field
                rows="3"
                value={name}
                control="input"
                label="Full Names"
                placeholder="Full Names"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setName(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                type="email"
                value={email}
                label="Email"
                control="input"
                placeholder="Email"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setEmail(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                required
                control={Select}
                placeholder="Role"
                value={role}
                label="Role"
                onChange={(_e: object, a: { value: string }) =>
                  setRole(a.value)
                }
                options={[
                  { key: "p", text: "Patient", value: "patient" },
                  { key: "n", text: "Nurse", value: "nurse" },
                  { key: "d", text: "Doctor", value: "doctor" },
                  { key: "a", text: "Admin", value: "admin" },
                ]}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Form.Field
                rows="3"
                value={contact}
                control="input"
                label="Contact"
                placeholder="Contact"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setContact(e.target.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                required
                control={Select}
                placeholder="Patient ID"
                value={patient}
                label="Patient Profile"
                options={patientOptions}
                onChange={(_e: object, a: { value: string }) =>
                  setPatient(a.value)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                type="password"
                control="input"
                value={password}
                label="New Password"
                placeholder="secret"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setPassword(e.target.value)
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Form.Field
                rows="3"
                value={bio}
                control="textarea"
                label="Bio"
                placeholder="Briefly describe yourself"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setBio(e.target.value)
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
              <Link to="/user" className="ui right floated button">
                All users
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </Layout>
  );
};

export default EditUser;
