import Layout from "@/layouts/admin";
import { useNavigate, Link } from "react-router-dom";
import { useAddFormMutation } from "@/services/form";
import { useState, useEffect, SetStateAction } from "react";
import {
  Menu,
  Card,
  Icon,
  Form,
  Grid,
  Select,
  Header,
  Message,
  TextArea,
} from "semantic-ui-react";

const NewQuestion = () => {
  return (
    <Card fluid>
      <Card.Content>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <Form.Field
                required
                type="text"
                control="input"
                label="Question"
                placeholder="What is ..."
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <Form.Field
                required
                control={Select}
                label="Type"
                placeholder="Question type"
                options={[
                  {
                    key: "s",
                    text: "Short answer",
                    value: "short-answer",
                  },
                  { key: "p", text: "Paragraph", value: "paragraph" },
                  {
                    key: "m",
                    text: "Multiple choice",
                    value: "multiple-choice",
                  },
                  { key: "c", text: "Checkbox", value: "checkbox" },
                  { key: "d", text: "Dropdown", value: "dropdown" },
                  { key: "a", text: "Date", value: "date" },
                  { key: "t", text: "Time", value: "time" },
                ]}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Form.Field control={TextArea} placeholder="Short answer text" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  );
};

const AddForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [fieldCount, setFieldCount] = useState<number>(1);
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
          <Grid.Row>
            <Grid.Column width={14}>
              <Form.Field
                required
                type="text"
                control="input"
                value={name}
                label="Name"
                placeholder="Assessment form"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setName(e.target.value as string)
                }
              />
              <Form.Field
                required
                control={TextArea}
                value={description}
                label="Description"
                placeholder="additional information..."
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setDescription(e.target.value as string)
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={14}>
              {[...Array(fieldCount)]?.map((_a, id) => (
                <NewQuestion key={id} />
              ))}
            </Grid.Column>
            <Grid.Column
              width={2}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div style={{ marginTop: "auto" }}>
                <Menu icon vertical>
                  <Menu.Item name="add">
                    <Icon
                      name="plus circle"
                      onClick={() => setFieldCount(fieldCount + 1)}
                    />
                  </Menu.Item>
                  <Menu.Item name="duplicate">
                    <Icon name="copy" />
                  </Menu.Item>
                  <Menu.Item name="duplicate">
                    <Icon name="copy" />
                  </Menu.Item>
                  <Menu.Item name="duplicate">
                    <Icon name="copy" />
                  </Menu.Item>
                  <Menu.Item
                    name="delete"
                    disabled={fieldCount == 1}
                    onClick={() => setFieldCount(fieldCount - 1)}
                  >
                    <Icon name="trash alternate" />
                  </Menu.Item>
                </Menu>
              </div>
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
