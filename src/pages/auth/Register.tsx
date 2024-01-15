import Layout from "@/layouts/default";
import { useNavigate } from "react-router-dom";
import { useAttemptSignupMutation } from "@/services/auth";
import { useState, useEffect, SetStateAction } from "react";
import { Form, Grid, Header, Message, Checkbox } from "semantic-ui-react";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [verify, setVerify] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [attemptSignup, { data, error, isLoading, isSuccess, isError }] =
    useAttemptSignupMutation();

  const handleSubmit = (e: { preventDefault: VoidFunction }) => {
    e.preventDefault();
    attemptSignup({ name, email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      setMessage(data?.msg);
      if (data?.msg == "welcome aboard") navigate("/login");
    }
    if (isError) console.log(error);
  }, [isError, isSuccess]);

  return (
    <Layout>
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h2" textAlign="center">
              Register
            </Header>
            {message && <Message info>{message}</Message>}
            <Form onSubmit={handleSubmit}>
              <Form.Field
                required
                type="text"
                value={name}
                control="input"
                label="Full Names"
                placeholder="Mr User"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setName(e.target.value)
                }
              />
              <Form.Field
                required
                type="email"
                value={email}
                label="Email"
                control="input"
                placeholder="my@email.com"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setEmail(e.target.value)
                }
              />
              <Form.Field
                required
                type="password"
                control="input"
                value={password}
                label="Password"
                placeholder="secret"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setPassword(e.target.value)
                }
              />
              <Form.Field
                required
                value={verify}
                type="password"
                control="input"
                placeholder="secret"
                label="Confirm password"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setVerify(e.target.value)
                }
              />
              <Form.Field
                toggle
                control={Checkbox}
                label={<label>Staff member</label>}
              />
              <button
                className="ui button primary"
                disabled={isLoading}
                type="submit"
              >
                Submit
              </button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export default Register;
