import Layout from "@/layouts/default";
import { useState, SetStateAction } from "react";
import { Form, Header, Grid, Message, TextArea } from "semantic-ui-react";

const Contact = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [verify, setVerify] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setMessage("We'll get back to you as soon as possible");
  };

  return (
    <Layout>
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h2" textAlign="center">
              Contact Us
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
                value={verify}
                control={TextArea}
                placeholder="details..."
                label="Description"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setVerify(e.target.value)
                }
              />
              <button className="ui button primary" type="submit">
                Submit
              </button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export default Contact;
