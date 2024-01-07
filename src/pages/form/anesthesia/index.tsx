import {
  useGetAnesthesiasQuery,
  useDeleteAnesthesiaMutation,
} from "@/services/anesthesia";
import Layout from "@/layouts/admin";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table, Icon, Input, Pagination, Header } from "semantic-ui-react";

interface AnesthesiaProps {
  _id: string;
  sideEffect: string;
  patientQuestion: string;
  agreed: boolean;
  witness: string;
  operationDetails: string;
  authorizingPerson: string;
  date: Date;
  anesthesist: { name: string };
  patient: { firstName: string; lastName: string };
  user: { name: string };
}

const AllAnesthesia = () => {
  const limit: number = 10;
  const [page, setPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [rows, setRows] = useState<Array<AnesthesiaProps>>([]);
  const { data, error, refetch, isSuccess, isError } = useGetAnesthesiasQuery({
    skip,
    limit,
  });
  const [deleteAnesthesia] = useDeleteAnesthesiaMutation();

  useEffect(() => {
    if (isSuccess) {
      setRows(data?.anesthesias);
      setTotal(Math.ceil(parseInt(data?.total) / limit));
    }
    if (isError) console.log(error);
  }, [page, data, isSuccess, isError]);

  return (
    <Layout>
      <Header disabled as="h1">
        All Anesthesia Consent
      </Header>
      <Input icon="search" placeholder="Search..." />
      <Link
        to="/form/anesthesia/add"
        className="ui button primary right floated"
      >
        <Icon name="plus" />
        Add Anesthesia
      </Link>
      <button className="ui icon button right floated" onClick={refetch}>
        <Icon name="refresh" />
      </button>
      <Table celled fixed singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Patient</Table.HeaderCell>
            <Table.HeaderCell>Anesthesist</Table.HeaderCell>
            <Table.HeaderCell>Operation</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows?.map((item) => (
            <Table.Row key={item._id}>
              <Table.Cell>
                {item?.patient?.firstName} {item?.patient?.lastName}
              </Table.Cell>
              <Table.Cell>{item?.anesthesist?.name} </Table.Cell>
              <Table.Cell>{item.operationDetails} </Table.Cell>
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
                    to={"/form/anesthesia/view/" + item._id}
                    className="ui button basic positive"
                  >
                    <Icon name="eye" />
                  </Link>
                  <Link
                    to={"/form/anesthesia/edit/" + item._id}
                    className="ui button positive"
                  >
                    <Icon name="pencil" />
                  </Link>
                  <button className="ui button orange">
                    <Icon
                      name="trash alternate"
                      onClick={() => {
                        deleteAnesthesia({ id: item._id });
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

export default AllAnesthesia;
