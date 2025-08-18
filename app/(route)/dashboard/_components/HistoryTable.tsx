import React from 'react'
import moment from 'moment'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { SessionDetail } from '../medical-agent/[sessionId]/page'
import ViewReportDialog from './ViewReportDialog'

type Props = {
    historyList?: SessionDetail[] // make optional to handle undefined
}

function HistoryTable({ historyList = [] }: Props) {
    // If there's no history data
    if (!Array.isArray(historyList) || historyList.length === 0) {
        return (
            <div className="text-center p-4 text-gray-500">
                No previous consultation reports found.
            </div>
        )
    }

    return (
        <div>
            <Table>
                <TableCaption>Previous Consultation Report.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>AI Medical Specialist</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {historyList.map((record: SessionDetail, index: number) => (
                        <TableRow key={record?.id || index}>
                            <TableCell className="font-medium">
                                {record?.SelectedDoctor?.specialist || 'N/A'}
                            </TableCell>
                            <TableCell>
                                {record?.notes || 'No description available'}
                            </TableCell>
                            <TableCell>
                                {record?.createdOn
                                    ? moment(new Date(record.createdOn)).fromNow()
                                    : 'Unknown date'}
                            </TableCell>
                            <TableCell className="text-right">
                                <ViewReportDialog record={record} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default HistoryTable
