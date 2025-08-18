import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { SessionDetail } from '../medical-agent/[sessionId]/page'
import moment from 'moment'

type props = {
    record: SessionDetail
}

function ViewReportDialog({record} : props) {
  const report = record?.report as any; // Assuming `report` is stored as JSON in DB

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="link" size="sm">View Report</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-bold">
            Medical AI Voice Agent Report
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="mt-6 space-y-4">
            <h2 className="font-bold text-blue-500 text-lg">Consultation Info</h2>
            <div className="grid grid-cols-2 gap-y-2">
              <p><span className="font-semibold">Doctor Specialization:</span> {record?.SelectedDoctor?.specialist}</p>
              <p><span className="font-semibold">Consult Date:</span> {moment(new Date(record.createdOn)).format('LLL')}</p>
              <p><span className="font-semibold">Session ID:</span> {report?.sessionId}</p>
              <p><span className="font-semibold">Patient:</span> {report?.user}</p>
            </div>

            <h2 className="font-bold text-blue-500 text-lg mt-4">Summary</h2>
            <p><span className="font-semibold">Chief Complaint:</span> {report?.chiefComplaint}</p>
            <p>{report?.summary}</p>

            <h2 className="font-bold text-blue-500 text-lg mt-4">Details</h2>
            <p><span className="font-semibold">Symptoms:</span> {report?.symptoms?.join(', ') || 'None listed'}</p>
            <p><span className="font-semibold">Duration:</span> {report?.duration}</p>
            <p><span className="font-semibold">Severity:</span> {report?.severity}</p>
            <p><span className="font-semibold">Medications Mentioned:</span> {report?.medicationsMentioned?.join(', ') || 'None'}</p>

            <h2 className="font-bold text-blue-500 text-lg mt-4">Recommendations</h2>
            <ul className="list-disc list-inside">
              {report?.recommendations?.map((rec: string, idx: number) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default ViewReportDialog
