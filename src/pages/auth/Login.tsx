import jwtDecode from "jwt-decode";
import Layout from "@/layouts/default";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { Form, Header, Grid, Message } from "semantic-ui-react";
import { useAttemptLoginMutation } from "@/services/auth";
import { useState, useEffect, SetStateAction } from "react";
import { AuthState, login as loginAction } from "@/store/slice/AuthSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [attemptLogin, { data, error, isLoading, isSuccess, isError }] =
    useAttemptLoginMutation();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    attemptLogin({ email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      setMessage(data?.msg);
      if (data?.token) {
        const { id, exp, iat, name, role, image }: AuthState = jwtDecode(
          data?.token
        );
        dispatch(
          loginAction({
            id,
            exp,
            iat,
            name,
            role,
            image,
            token: data?.token,
          })
        );
        localStorage.setItem("hospital-token", data?.token);
        navigate("/dashboard");
      }
    }
    if (isError) console.log(error);
  }, [isError, isSuccess]);

  return (
    <Layout>
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h2" textAlign="center">
              Login
            </Header>
            {message && <Message info>{message}</Message>}
            <Form onSubmit={handleSubmit}>
              <Form.Field
                required
                type="email"
                label="Email"
                value={email}
                control="input"
                placeholder="my@email.com"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setEmail(e.target.value)
                }
              />
              <Form.Field
                required
                control="input"
                type="password"
                label="Password"
                value={password}
                placeholder="secret"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setPassword(e.target.value)
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
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export default Login;
