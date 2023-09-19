import {
  Menu,
  Card,
  Icon,
  Form,
  Grid,
  Input,
  Select,
  Header,
  Message,
  Checkbox,
  TextArea,
} from "semantic-ui-react";
import Layout from "@/layouts/admin";
import { useNavigate, Link } from "react-router-dom";
import { useAddFormMutation } from "@/services/form";
import { useState, useEffect, SetStateAction, Dispatch } from "react";

interface ValueProps {
  id: number;
  qType: string;
  width: string;
  question: string;
  choices: string[];
  isRequired: boolean;
}

interface QuestionProps {
  id: number;
  values: ValueProps[];
  setValues: Dispatch<SetStateAction<ValueProps[]>>;
}

const NewQuestion = ({ id, values, setValues }: QuestionProps) => {
  const [qType, setQType] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [choices, setChoices] = useState<string[]>([]);
  const [thisChoice, setThisChoice] = useState<string>("");
  const [isRequired, setRequired] = useState<boolean>(false);

  useEffect(() => {
    setValues([
      ...values.filter((a) => a.id != id),
      {
        id,
        qType,
        width,
        choices,
        question,
        isRequired,
      },
    ]);
  }, [width, qType, choices, question, isRequired]);

  return (
    <Card fluid>
      <Card.Content>
        <Grid>
          <Grid.Row>
            <Grid.Column width={14}>
              <Form.Field
                required
                type="text"
                control="input"
                label="Question"
                value={question}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setQuestion(e.target.value)
                }
                placeholder="What, why, who ..."
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <Form.Field
                required
                value={qType}
                control={Select}
                placeholder="Question type"
                onChange={(e: {
                  target: { innerText: SetStateAction<string> };
                }) => setQType(e.target.innerText)}
                options={[
                  {
                    key: "s",
                    text: "Short answer",
                    value: "Short answer",
                  },
                  { key: "p", text: "Paragraph", value: "Paragraph" },
                  { key: "c", text: "Single choice", value: "Single choice" },
                  {
                    key: "m",
                    text: "Multiple choice",
                    value: "Multiple choice",
                  },
                  { key: "d", text: "Date", value: "Date" },
                  { key: "t", text: "Time", value: "Time" },
                ]}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <Form.Field
                required
                control={Select}
                value={width}
                placeholder="Question width"
                onChange={(e: {
                  target: { innerText: SetStateAction<string> };
                }) => setWidth(e.target.innerText)}
                options={[
                  {
                    key: "q",
                    text: "full width",
                    value: "full width",
                  },
                  { key: "b", text: "1/2", value: "1/2" },
                  { key: "c", text: "1/3", value: "1/3" },
                  { key: "d", text: "1/4", value: "1/4" },
                ]}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <Checkbox
                toggle
                label="Required"
                style={{ marginTop: 8 }}
                value={isRequired ? 1 : 0}
                onChange={() => setRequired(!isRequired)}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            {qType.includes("choice") && (
              <Grid.Column width={14}>
                {choices.length > 0 && (
                  <ol
                    style={{
                      border: "2px dashed #333",
                      padding: "10px 25px 10px 25px",
                    }}
                  >
                    {choices.map((a, id) => (
                      <li key={id}>{a}</li>
                    ))}
                  </ol>
                )}
                <Input
                  fluid
                  value={thisChoice}
                  onChange={(e) => setThisChoice(e.target.value)}
                  action={{
                    color: "teal",
                    content: "Add",
                    onClick: (e: { preventDefault: () => void }) => {
                      e.preventDefault();
                      setChoices([...choices, thisChoice]);
                      setThisChoice("");
                    },
                  }}
                  placeholder="Option name..."
                  disabled={!qType.includes("choice")}
                />
              </Grid.Column>
            )}
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
  const [values, setValues] = useState<ValueProps[]>([]);
  const [fieldCount, setFieldCount] = useState<number>(1);
  const [description, setDescription] = useState<string>();
  const [addForm, { data, error, isLoading, isSuccess, isError }] =
    useAddFormMutation();
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    addForm({ name, description, rows: values });
    // console.log({ name, description, rows: values });
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
                <NewQuestion
                  id={id}
                  key={id}
                  values={values}
                  setValues={setValues}
                />
              ))}
            </Grid.Column>
            <Grid.Column
              width={2}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div style={{ marginTop: "auto" }}>
                <Menu icon="labeled" vertical>
                  <Menu.Item
                    name="add"
                    onClick={() => {
                      setFieldCount(fieldCount + 1);
                      window.location.href =
                        window.location.origin +
                        window.location.pathname +
                        "#bottom";
                    }}
                  >
                    <Icon name="plus circle" />
                    Question
                  </Menu.Item>
                  <Menu.Item name="duplicate">
                    <Icon name="copy" />
                    Duplicate
                  </Menu.Item>
                  <Menu.Item
                    name="delete"
                    disabled={fieldCount == 1}
                    onClick={() => setFieldCount(fieldCount - 1)}
                  >
                    <Icon name="trash alternate" />
                    Delete
                  </Menu.Item>
                </Menu>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row id="bottom">
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
