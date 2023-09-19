import Layout from "@/layouts/admin";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ValueProps as FieldProps } from "./add";
import { useGetFormsQuery, useDeleteFormMutation } from "@/services/form";
import { Table, Icon, Input, Pagination, Header } from "semantic-ui-react";

interface FormProps {
  date: Date;
  _id: string;
  name: string;
  description: string;
  fields: FieldProps[];
}

const AllForms = () => {
  const limit: number = 10;
  const [page, setPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [rows, setRows] = useState<FormProps[]>([]);
  const { data, error, refetch, isSuccess, isError } = useGetFormsQuery({
    skip,
    limit,
  });
  const [deleteForm] = useDeleteFormMutation();

  useEffect(() => {
    if (isSuccess) {
      setRows(data?.forms);
      setTotal(Math.ceil(parseInt(data?.total) / limit));
    }
    if (isError) console.log(error);
  }, [page, data, isSuccess, isError]);

  return (
    <Layout>
      <Header disabled as="h1">
        All Forms
      </Header>
      <Input icon="search" placeholder="Search..." />
      <Link to="/form/add" className="ui button primary right floated">
        <Icon name="plus" />
        Add Form
      </Link>
      <button className="ui icon button right floated" onClick={refetch}>
        <Icon name="refresh" />
      </button>
      <Table celled fixed singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>No. Questions</Table.HeaderCell>
            <Table.HeaderCell>Time</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows?.map((item) => (
            <Table.Row key={item._id}>
              <Table.Cell>{item.name} </Table.Cell>
              <Table.Cell>{item.description} </Table.Cell>
              <Table.Cell>{item.fields.length} </Table.Cell>
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
                    to={"/form/view/" + item._id}
                    className="ui button basic positive"
                  >
                    <Icon name="eye" />
                  </Link>
                  <Link
                    to={"/form/edit/" + item._id}
                    className="ui button positive"
                  >
                    <Icon name="pencil" />
                  </Link>
                  <button className="ui button orange">
                    <Icon
                      name="trash alternate"
                      onClick={() => {
                        deleteForm({ id: item._id });
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

export default AllForms;
