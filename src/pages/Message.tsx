import {
  Tab,
  List,
  Grid,
  Form,
  Header,
  Select,
  TabPane,
  ListIcon,
  ListItem,
  ListHeader,
  ListContent,
  ListDescription,
} from "semantic-ui-react";
import Layout from "@/layouts/admin";
import { useGetUsersQuery } from "@/services/user";
import { SetStateAction, useEffect, useState } from "react";

interface TheProps {
  [key: string]: string;
}

const panes = [
  {
    menuItem: "Compose",
    render: () => (
      <TabPane>
        <Compose />
      </TabPane>
    ),
  },
  {
    menuItem: "Inbox",
    render: () => (
      <TabPane>
        <Contacts />
      </TabPane>
    ),
  },
  {
    menuItem: "Sent",
    render: () => (
      <TabPane>
        <Contacts />
      </TabPane>
    ),
  },
];

const Compose = () => {
  const [user, setUser] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [userOptions, setUserOptions] = useState<TheProps[]>();
  const getUsers = useGetUsersQuery({ skip: 0, limit: 100 });

  useEffect(() => {
    if (getUsers.isSuccess) {
      let result: TheProps[] = [];
      getUsers?.data?.users?.map((a: TheProps) => {
        result.push({
          key: a?._id,
          value: a?._id,
          text: a?.name,
        });
      });
      setUserOptions(result);
    }
  }, [getUsers.isSuccess]);

  return (
    <Form>
      <Grid>
        <Grid.Column columns="equal">
          <Form.Field
            required
            control={Select}
            placeholder="User"
            value={user}
            label="Person"
            options={userOptions}
            onChange={(_e: object, a: { value: string }) => setUser(a.value)}
          />
          <Form.Field
            rows="3"
            required
            value={message}
            control="textarea"
            label="Write a message"
            placeholder="..."
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setMessage(e.target.value)
            }
          />
          <button
            className="ui button primary"
            // disabled={isLoading}
            type="submit"
          >
            Submit
          </button>
        </Grid.Column>
      </Grid>
    </Form>
  );
};

const Contacts = () => {
  return (
    <List divided relaxed>
      <ListItem>
        <ListIcon name="user outline" size="large" verticalAlign="middle" />
        <ListContent>
          <ListHeader as="a">Hello again</ListHeader>
          <ListDescription as="a">10 mins ago</ListDescription>
        </ListContent>
      </ListItem>
      <ListItem>
        <ListIcon name="user outline" size="large" verticalAlign="middle" />
        <ListContent>
          <ListHeader as="a">Respond ASAP</ListHeader>
          <ListDescription as="a">22 mins ago</ListDescription>
        </ListContent>
      </ListItem>
      <ListItem>
        <ListIcon name="user outline" size="large" verticalAlign="middle" />
        <ListContent>
          <ListHeader as="a">Stop crying</ListHeader>
          <ListDescription as="a">34 mins ago</ListDescription>
        </ListContent>
      </ListItem>
    </List>
  );
};

const Message = () => {
  useEffect(() => {}, []);

  return (
    <Layout>
      <Header disabled as="h1">
        Message
      </Header>
      <Tab panes={panes} />
    </Layout>
  );
};

export default Message;
