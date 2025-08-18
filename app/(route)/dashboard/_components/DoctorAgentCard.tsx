"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@clerk/nextjs'
import axios from 'axios'
import { useRouter } from "next/navigation";
import { Loader2 } from 'lucide-react'
    export type doctorAgent={
        id:number,
        specialist: string,
        description: string,
        image: string,
        agentPrompt: string,
        voiceId?: string,
        subscriptionRequired: boolean
    }
    type props={
        doctorAgent:doctorAgent
    }
function DoctorAgentCard({doctorAgent} : props) {
const [Loading , SetLoading] = useState(false);
const router = useRouter()
  const {has} = useAuth();
  //@ts-ignore
  const paidUser = has && has({plan : 'premium' })

    const onStartConsultation = async()=>{
    SetLoading(true)
        const result = await axios.post('api/session-chart',{
          notes: 'New Query',
          SelectedDoctor:doctorAgent
        })
        console.log(result.data);
        if(result.data?.sessionId){
          console.log(result.data.sessionId)
          router.push('/dashboard/medical-agent/' + result.data.sessionId)
        }
      SetLoading(false)
  }
  return (
    <div className='relative'>
        {doctorAgent?.subscriptionRequired && <Badge className='absolute m-2 right-0'>
           Premium
        </Badge>}
        <Image src={doctorAgent.image} alt={doctorAgent.specialist} width={200} height={200}
        className='w-full h-[250px] object-cover rounded-xl'/>
        <h2 className='font-bold mt-1'>{doctorAgent.specialist}</h2>
        <p className='line-clamp-2 text-sm text-gray-500'>{doctorAgent.description}</p>
        <Button className='w-full mt-2' onClick={onStartConsultation} disabled = {!paidUser && doctorAgent?.subscriptionRequired}>Start Consultation { Loading ? < Loader2 className='animate-spin'/> : <IconArrowRight/>}</Button>
    </div>
  )
}

export default DoctorAgentCard
