import Layout from "@/layouts/admin";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetUsersQuery, useDeleteUserMutation } from "@/services/user";
import { Table, Icon, Input, Pagination, Header } from "semantic-ui-react";

interface UserProps {
  _id: string;
  name: string;
  image: string;
  role: string;
  email: string;
  date: Date;
}

const AllUsers = ({ filter = "" }) => {
  const limit: number = 10;
  const [page, setPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [rows, setRows] = useState<UserProps[]>([]);
  const { data, error, refetch, isSuccess, isError } = useGetUsersQuery({
    skip,
    limit,
    role: filter,
  });
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    if (isSuccess) {
      setRows(data?.users);
      setTotal(Math.ceil(parseInt(data?.total) / limit));
    }
    if (isError) console.log(error);
  }, [page, data, isSuccess, isError]);

  return (
    <Layout>
      <Header disabled as="h1">
        All Users
      </Header>
      <Input icon="search" placeholder="Search..." />
      <button className="ui icon button right floated" onClick={refetch}>
        <Icon name="refresh" />
      </button>
      <Table celled fixed singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Time</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows?.map((item) => (
            <Table.Row key={item._id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>{item.role}</Table.Cell>
              <Table.Cell>
                {new Date(item.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Table.Cell>
              <Table.Cell>
                <div className="ui icon tiny buttons">
                  <Link
                    to={"/user/view/" + item._id}
                    className="ui button basic positive"
                  >
                    <Icon name="eye" />
                  </Link>
                  <Link
                    to={"/user/edit/" + item._id}
                    className="ui button positive"
                  >
                    <Icon name="pencil" />
                  </Link>
                  <button className="ui button orange">
                    <Icon
                      name="trash alternate"
                      onClick={() => {
                        deleteUser({ id: item._id });
                        refetch();
                      }}
                    />
                  </button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Pagination
        activePage={page}
        onPageChange={(_e, { activePage }) => {
          setSkip(limit * ((activePage as number) - 1));
          setPage(activePage as number);
        }}
        totalPages={total}
      />
    </Layout>
  );
};

export default AllUsers;
