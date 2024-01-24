import {
  useGetAdmissionsQuery,
  useDeleteAdmissionMutation,
} from "@/services/admission";
import Layout from "@/layouts/admin";
import { Link } from "react-router-dom";
import { useState, useEffect, SetStateAction } from "react";
import {
  Icon,
  Form,
  Table,
  Header,
  Select,
  Pagination,
} from "semantic-ui-react";

interface SelectProps {
  [key: string]: string;
}

export interface AdmissionProps {
  _id: string;
  hasFled: boolean;
  isImproved: boolean;
  isRecovered: boolean;
  isUnimproved: boolean;
  diedAfter48hr: boolean;
  diedBefore48hr: boolean;
  wasAutopsyRequested: boolean;
  modeOfAdmission: string;
  transferredFrom: string;
  finalDiagnosis: string;
  otherDiagnosis: string;
  clinicalSummary: string;
  investigationSummary: string;
  referredTo: { name: string };
  patient: { firstName: string; lastName: string };
  admissionDate: Date;
  dischargeDate: Date;
}

export const AdmissionTable = () => {
  const limit: number = 10;
  const [stop, setStop] = useState<Date>();
  const [start, setStart] = useState<Date>();
  const [page, setPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [disease, setDisease] = useState<string>("all");
  const [rows, setRows] = useState<AdmissionProps[]>([]);
  const [deleteAdmission] = useDeleteAdmissionMutation();
  const [diseases, setDiseases] = useState<SelectProps[]>([]);
  const { data, error, refetch, isSuccess, isLoading, isError } =
    useGetAdmissionsQuery({ skip, stop, start, limit, disease });

  useEffect(() => {
    if (isSuccess) {
      setRows(data?.admissions);
      setTotal(Math.ceil(parseInt(data?.total) / limit));
      let temp: SelectProps[] = [
        { key: "a", value: "all", text: "- filter by disease -" },
      ];
      data?.diseases?.map((a: SelectProps, id: number) => {
        temp.push({ key: id.toString(), value: a?._id, text: a?._id });
      });
      setDiseases(temp);
    }
    if (isError) console.log(error);
  }, [page, data, isSuccess, isError]);

  return (
    <>
      <Form style={{ display: "inline-flex" }}>
        <Form.Field
          required
          type="date"
          value={start}
          control="input"
          label="Starting date"
          onChange={(e: {
            target: { value: SetStateAction<Date | undefined> };
          }) => setStart(e.target.value || new Date())}
        />
        <Form.Field
          required
          min={start}
          type="date"
          value={stop}
          control="input"
          label="Ending date"
          onChange={(e: {
            target: { value: SetStateAction<Date | undefined> };
          }) => setStop(e.target.value || new Date())}
        />
        <Form.Field
          required
          label="Disease"
          value={disease}
          control={Select}
          options={diseases}
          onChange={(_e: object, a: { value: string }) => setDisease(a.value)}
        />
      </Form>
      <Link
        to="/form/admission/add"
        className="ui button primary right floated"
      >
        <Icon name="plus" />
        Add Admission
      </Link>
      <button
        className="ui icon button right floated"
        disabled={isLoading}
        onClick={refetch}
      >
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
                {item?.hasFled && "fled"}
                {item?.isRecovered && "recovered"}
                {item?.isImproved && "improved health"}
                {item?.diedAfter48hr && "died after 48hr"}
                {item?.diedBefore48hr && "died before 48hr"}
                {item?.isUnimproved && "health not improving"}
                {item?.wasAutopsyRequested && "requested autopsy"}
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
    </>
  );
};

const AllAdmissions = () => {
  return (
    <Layout>
      <Header disabled as="h1">
        All Admissions
      </Header>
      <AdmissionTable />
    </Layout>
  );
};

export default AllAdmissions;
