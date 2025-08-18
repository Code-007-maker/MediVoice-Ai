import React from 'react'
import { doctorAgent } from './DoctorAgentCard'
import Image from 'next/image'

type Props = {
  doctorAgent: doctorAgent,
  SetSelectedDoctor: (doc: doctorAgent) => void,
  SelectedDoctor: doctorAgent
}

function SuggestedDoctorCard({ doctorAgent, SetSelectedDoctor, SelectedDoctor }: Props) {
  return (
    <div
      className={`flex flex-col items-center border rounded-2xl shadow p-7 hover:border-blue-500 cursor-pointer 
        ${SelectedDoctor?.id === doctorAgent?.id ? 'border-blue-500' : ''}`}
      onClick={() => SetSelectedDoctor(doctorAgent)} // ✅ wrapped in function
    >
      <Image
        src={doctorAgent?.image}
        alt={doctorAgent?.specialist}
        width={70}
        height={70}
        className='w-[50px] h-[50px] object-cover rounded-4xl'
      />
      <h2 className='font-bold text-sm text-center'>{doctorAgent?.specialist}</h2>
      <p className='line-clamp-2 text-xs text-center'>{doctorAgent?.description}</p>
    </div>
  )
}

export default SuggestedDoctorCard
