import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { DoctorSession } from "../page";
import ViewDoctorReportDialog from "./ViewDoctorReportDialog";
import { Button } from "@/components/ui/button";

type Props = {
  historyList: DoctorSession[];
};

export default function DoctorHistoryTable({ historyList }: Props) {
  if (!historyList || historyList.length === 0) {
    return (
      <div className="border border-dashed rounded-xl p-8 text-center text-gray-500">
        No consultation reports found for this patient.
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>Patient Medical Reports</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>AI Specialist</TableHead>
          <TableHead>Symptoms / Notes</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {historyList.map((record) => (
          <TableRow key={record.id}>
            <TableCell className="font-medium">
              {record.SelectedDoctor?.specialist || "General Physician"}
            </TableCell>

            <TableCell className="max-w-xs truncate">
              {record.notes || "No notes"}
            </TableCell>

            <TableCell>
              {record.createdOn
                ? moment(new Date(record.createdOn)).fromNow()
                : "Unknown"}
            </TableCell>

            <TableCell className="text-right">
              <ViewDoctorReportDialog record={record} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
