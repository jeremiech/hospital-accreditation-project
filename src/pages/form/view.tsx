import {
  Grid,
  Form,
  Input,
  Select,
  Header,
  Segment,
  TextArea,
  Checkbox,
  SemanticWIDTHS,
} from "semantic-ui-react";
import { useEffect } from "react";
import { ValueProps } from "./add";
import Layout from "@/layouts/admin";
import { useParams } from "react-router-dom";
import { useLazyGetFormQuery } from "@/services/form";

const widths: Record<string, SemanticWIDTHS | undefined> = {
  "1/2": 8,
  "1/3": 5,
  "1/4": 4,
  "full width": 16,
};

const fields: Record<string, typeof Input | typeof TextArea | typeof Select> = {
  "Single choice": Select,
  "Short answer": Input,
  Paragraph: TextArea,
  Multiple: Input,
  Date: Input,
  Time: Input,
};

const ViewForm = () => {
  const { form } = useParams();
  const [getForm, { data, isLoading }] = useLazyGetFormQuery();

  const formatChoices = (list: string[]) => {
    const ans: { key: number; text: string; value: string }[] = [];
    list.map((a, id) => {
      ans.push({ key: id, text: a, value: a });
    });
    return ans;
  };

  const handleSubmit = (e: { preventDefault: VoidFunction }) => {
    e.preventDefault();
    for (let a = 0; a < data?.form?.fields?.length; a++) {
      console.log(document.getElementById(`${a}`)?.value);
    }
  };

  useEffect(() => {
    getForm({ id: form });
  }, []);

  return (
    <Layout>
      <Segment secondary textAlign="center">
        <Header as="h2">{data?.form?.name}</Header>
        {data?.form?.description}
      </Segment>
      <Form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Row>
            {data?.form?.fields?.map((a: ValueProps) => (
              <Grid.Column
                key={a.id}
                width={widths[a.width]}
                style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
              >
                {a.qType == "Multiple choice" ? (
                  <>
                    <label>
                      <b>{a.question}</b>
                    </label>
                    {a.choices.map((b) => (
                      <Checkbox
                        key={b}
                        label={b}
                        style={{ display: "block", marginTop: 5 }}
                      />
                    ))}
                  </>
                ) : (
                  <Form.Field
                    id={a.id}
                    required={a.isRequired}
                    control={fields[a.qType]}
                    type={["Date", "Time"].includes(a.qType) ? a.qType : ""}
                    placeholder={a.question}
                    label={a.question}
                    options={formatChoices(a.choices)}
                  />
                )}
              </Grid.Column>
            ))}
            <Grid.Column
              width={16}
              style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
            >
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

export default ViewForm;
