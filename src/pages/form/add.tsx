import Layout from "@/layouts/admin";
import { useNavigate, Link } from "react-router-dom";
import { useAddFormMutation } from "@/services/form";
import { useState, useEffect, SetStateAction } from "react";
import { Form, Grid, Header, Message, TextArea } from "semantic-ui-react";

const AddForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [addForm, { data, error, isLoading, isSuccess, isError }] =
    useAddFormMutation();
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    addForm({ name, description });
  };

  useEffect(() => {
    if (isSuccess) {
      setMessage(data?.msg);
      if (data?.msg == "form saved") navigate("/form");
    }
    if (isError) console.log(error);
  }, [isError, isSuccess]);

  return (
    <Layout>
      <Header disabled as="h1">
        Add Form
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
                value={name}
                label="Name"
                placeholder="Pain assessment form"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setName(e.target.value as string)
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                required
                control={TextArea}
                value={description}
                label="Description"
                placeholder="details..."
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setDescription(e.target.value as string)
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
              <Link to="/form" className="ui right floated button">
                All forms
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </Layout>
  );
};

export default AddForm;
