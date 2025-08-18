import React from 'react'
import Historylist from './_components/Historylist'
import { Button } from '@/components/ui/button'
import DoctorAgentList from './_components/DoctorAgentList'
import AddNewSessionDailog from './_components/AddNewSessionDailog'
function dashboard() {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-2xl'>My Dashboard</h2>
        <AddNewSessionDailog/>
      </div>
      <Historylist/>
      <DoctorAgentList/>
    </div>
  )
}

export default dashboard
