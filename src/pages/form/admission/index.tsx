import {
  useGetAdmissionsQuery,
  useDeleteAdmissionMutation,
} from "@/services/admission";
import Layout from "@/layouts/admin";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Icon, Table, Input, Header, Pagination } from "semantic-ui-react";

export interface AdmissionProps {
  _id: string;
  hasFled: boolean;
  isImproved: boolean;
  isRecovered: boolean;
  isUnimproved: boolean;
  diedAfter48hr: boolean;
  diedBefore48hr: boolean;
  wasAutopsyRequested: boolean;
  finalDiagnosis: string;
  patient: { firstName: string; lastName: string };
  admissionDate: Date;
}

const AllAdmissions = () => {
  const limit: number = 10;
  const [page, setPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [rows, setRows] = useState<AdmissionProps[]>([]);
  const { data, error, refetch, isSuccess, isError } = useGetAdmissionsQuery({
    skip,
    limit,
  });
  const [deleteAdmission] = useDeleteAdmissionMutation();

  useEffect(() => {
    if (isSuccess) {
      setRows(data?.admissions);
      setTotal(Math.ceil(parseInt(data?.total) / limit));
    }
    if (isError) console.log(error);
  }, [page, data, isSuccess, isError]);

  return (
    <Layout>
      <Header disabled as="h1">
        All Admissions
      </Header>
      <Input icon="search" placeholder="Search..." />
      <Link
        to="/form/admission/add"
        className="ui button primary right floated"
      >
        <Icon name="plus" />
        Add Admission
      </Link>
      <button className="ui icon button right floated" onClick={refetch}>
        <Icon name="refresh" />
      </button>
      <Table celled fixed singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Patient</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Final Diagnosis</Table.HeaderCell>
            <Table.HeaderCell>Admission date</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows?.map((item) => (
            <Table.Row key={item._id}>
              <Table.Cell>
                {item.patient.firstName} {item.patient.lastName}
              </Table.Cell>
              <Table.Cell>
                {item?.hasFled != false && "fled"}
                {item?.isRecovered != false && "recovered"}
                {item?.isImproved != false && "improved health"}
                {item?.diedAfter48hr != false && "died after 48hr"}
                {item?.diedBefore48hr != false && "died before 48hr"}
                {item?.isUnimproved != false && "health not improving"}
                {item?.wasAutopsyRequested != false && "requested autopsy"}
              </Table.Cell>
              <Table.Cell>{item.finalDiagnosis}</Table.Cell>
              <Table.Cell>
                {new Date(item.admissionDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Table.Cell>
              <Table.Cell>
                <div className="ui icon tiny buttons">
                  <Link
                    to={"/form/admission/view/" + item._id}
                    className="ui button basic positive"
                  >
                    <Icon name="eye" />
                  </Link>
                  <Link
                    to={"/form/admission/edit/" + item._id}
                    className="ui button positive"
                  >
                    <Icon name="pencil" />
                  </Link>
                  <button className="ui button orange">
                    <Icon
                      name="trash alternate"
                      onClick={() => {
                        deleteAdmission({ id: item._id });
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

export default AllAdmissions;
