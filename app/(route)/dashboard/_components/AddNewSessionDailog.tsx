"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea'
import { DialogClose } from '@radix-ui/react-dialog'
import { ArrowRight, Loader2 } from 'lucide-react'
import axios from 'axios'
import DoctorAgentCard, { doctorAgent } from './DoctorAgentCard'
import SuggestedDoctorCard from './SuggestedDoctorCard'
import { useRouter } from "next/navigation";
import { useAuth } from '@clerk/nextjs'
import { SessionDetail } from '../medical-agent/[sessionId]/page'
function AddNewSessionDailog() {
    const [note,setnote] = useState<string>();
    const [Loading , SetLoading] = useState(false);
    const [SuggestedDoctors,SetSuggestedDoctors] = useState<doctorAgent[]>();
    const [SelectedDoctor , SetSelectedDoctor] = useState<doctorAgent>()
    const router = useRouter();
      const {has} = useAuth();
      //@ts-ignore
      const paidUser = has && has({plan : 'premium' })
    const OnClickNext = async()=>{
      SetLoading(true);
        const result = await axios.post('api/suggest-doctors',{
          notes:note
        })
        SetSuggestedDoctors(result.data)
      SetLoading(false)  
    }

  const onStartConsultation = async()=>{
    SetLoading(true)
        const result = await axios.post('api/session-chart',{
          notes: note,
          SelectedDoctor:SelectedDoctor
        })
        console.log(result.data);
        if(result.data?.sessionId){
          console.log(result.data.sessionId)
          router.push('/dashboard/medical-agent/' + result.data.sessionId)
        }
      SetLoading(false)
  }
  
    const [historylist, sethistorylist] = useState<SessionDetail[]>([])
  
  useEffect(()=>{
    GetHistoryList()
  },[])

  const GetHistoryList = async()=>{
    const result = await axios.get('/api/session-chart?sessionId=all');
    console.log(result.data);
    sethistorylist(result.data)
  }
  return (
    <div>
      <Dialog>
  <DialogTrigger asChild>
  <Button className='mt-3' disabled = {!paidUser && historylist?.length >=1}>+ Start Consultation</Button>
</DialogTrigger>

  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Basic Deails</DialogTitle>
      <DialogDescription asChild>
        
          {!SuggestedDoctors ?
          <div>
            <h2>Add symptoms or Add any details</h2>
            <Textarea placeholder='Add Detail here ...' className='h-[200px] mt-1'
             onChange={(e)=>setnote(e.target.value)}
            />
        </div>
          :
          <div>
             <h2>Select the doctor</h2>
    {Array.isArray(SuggestedDoctors) && SuggestedDoctors.length > 0 && (
  <div className='grid grid-cols-3 gap-5'>
    {SuggestedDoctors.map((doctor, index) => (
      <SuggestedDoctorCard
        doctorAgent={doctor}
        key={index}
        SetSelectedDoctor={() => SetSelectedDoctor(doctor)}
        //@ts-ignore
        SelectedDoctor={SelectedDoctor}
      />
    ))}
  </div>
)}

          </div>
          }
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
    <DialogClose asChild>
  <Button variant="outline">Cancel</Button>
</DialogClose>

       {!SuggestedDoctors ?
       <Button disabled = {!note || Loading} onClick={()=>{OnClickNext()}}>Next { Loading ? < Loader2 className='animate-spin'/> : <ArrowRight/>} </Button>
         :
         <Button disabled = {Loading || !SelectedDoctor} onClick={()=>{onStartConsultation()}}>Start Consultation { Loading ? < Loader2 className='animate-spin'/> : <ArrowRight/>}</Button>   
       }
       </DialogFooter>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default AddNewSessionDailog
