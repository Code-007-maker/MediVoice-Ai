"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import AddNewSessionDailog from './AddNewSessionDailog'
import axios from 'axios'
import HistoryTable from './HistoryTable'
import { SessionDetail } from '../medical-agent/[sessionId]/page'

function Historylist() {
  const [historylist, sethistorylist] = useState<SessionDetail[]>([])
  
  useEffect(()=>{
    GetHistoryList()
  },[])

  const GetHistoryList = async()=>{
    const result = await axios.get('/api/session-chart?sessionId=all');
  
    sethistorylist(result.data)
  }

  return (
    <div className='mt-10'>
      {historylist.length === 0 ? (
        <div className='flex items-center flex-col justify-center p-7 border border-dashed rounded-2xl'>
          <Image src='/medical-assistance.png' alt='empty' width={150} height={150} />
          <h2 className='font-bold text-xl mt-5'>No Recent Consultations</h2>
          <p>It looks like you have not consulted with any doctor</p>
          <AddNewSessionDailog/>
        </div>
      ) : (
        <div>
          <HistoryTable historyList = {historylist}/>
        </div>
      )}
    </div>
  )
}

export default Historylist
