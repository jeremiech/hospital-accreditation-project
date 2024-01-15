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
import { useAddMessageMutation, useGetMessagesQuery } from "@/services/message";

interface TheProps {
  [key: string]: string;
}

interface MessageProps {
  _id: string;
  content: string;
  sender: { name: string };
  recipient: { name: string };
}

const Compose = ({ refresh }: { refresh: VoidFunction }) => {
  const [user, setUser] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [userOptions, setUserOptions] = useState<TheProps[]>();
  const getUsers = useGetUsersQuery({ skip: 0, limit: 100 });
  const [addMessage, { isLoading, isSuccess }] = useAddMessageMutation();

  function handleSubmit(e: { preventDefault: VoidFunction }): void {
    e.preventDefault();
    addMessage({ content: message, recipient: user });
  }

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
    if (isSuccess) {
      refresh();
      setUser("");
      setMessage("");
    }
  }, [isSuccess, getUsers.isSuccess]);

  return (
    <Form onSubmit={handleSubmit}>
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
            disabled={isLoading}
            type="submit"
          >
            Submit
          </button>
          <button className="ui button teal right floated" onClick={refresh}>
            Refresh
          </button>
        </Grid.Column>
      </Grid>
    </Form>
  );
};

const Conversations = ({ messages }: { messages: MessageProps[] }) => {
  return (
    <List divided relaxed>
      {messages.map((item: MessageProps) => (
        <ListItem key={item?._id}>
          <ListIcon name="mail" size="large" verticalAlign="middle" />
          <ListContent>
            <ListHeader as="a">
              {item?.sender?.name} &rarr; {item?.recipient?.name}
            </ListHeader>
            <ListDescription as="a">{item?.content}</ListDescription>
          </ListContent>
        </ListItem>
      ))}
    </List>
  );
};

const Message = () => {
  const getSent = useGetMessagesQuery({ skip: 0, limit: 50, type: "sent" });
  const getInbox = useGetMessagesQuery({ skip: 0, limit: 50, type: "inbox" });

  function refresh(): void {
    getSent.refetch();
    getInbox.refetch();
  }

  const panes = [
    {
      menuItem: "Compose",
      render: () => (
        <TabPane>
          <Compose refresh={refresh} />
        </TabPane>
      ),
    },
    {
      menuItem: `Inbox (${getInbox.data?.total})`,
      render: () => (
        <TabPane>
          <Conversations messages={getInbox.data?.messages} />
        </TabPane>
      ),
    },
    {
      menuItem: `Sent (${getSent.data?.total})`,
      render: () => (
        <TabPane>
          <Conversations messages={getSent.data?.messages} />
        </TabPane>
      ),
    },
  ];

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
