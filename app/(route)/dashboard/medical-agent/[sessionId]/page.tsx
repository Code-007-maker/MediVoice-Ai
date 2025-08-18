"use client"
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { doctorAgent } from '../../_components/DoctorAgentCard';
import { Circle, Loader, PhoneCall, PhoneOff } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Vapi from '@vapi-ai/web';
import Provider from '@/app/provider';
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
export type SessionDetail = {
  id: number,
  notes: string,
  sessionId: string,
  report: JSON,
  SelectedDoctor: doctorAgent,
  createdOn: string
}

type Message = { role: string; text: string };

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetail, setsessionDetail] = useState<SessionDetail>();
  
  const [callStarted, setcallStarted] = useState(false);
  const [vapiInstance , setvapiInstance] = useState<any>();
  const [CurrentRole , setCurrentRole] = useState<string | null>();
  const [LiveTranscript , setLiveTranscript] = useState<string>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading , setloading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    sessionId && GetSessionDetails();
  }, [sessionId])

  const GetSessionDetails = async () => {
    const result = await axios.get('/api/session-chart?sessionId=' + sessionId);
    console.log(result.data);
    setsessionDetail(result.data);
  }
const endCall = async () => {
  setloading(true);
  if (!vapiInstance) return;

  try {
    await vapiInstance.stop(); // ✅ stop() instead of end()
  } catch (e) {
    console.error("Error ending call:", e);
  }

  vapiInstance.off('call-start');
  vapiInstance.off('call-end');
  vapiInstance.off('message');

  setcallStarted(false);
  setvapiInstance(null);

  toast.success("Your Report is generated!");
  router.replace('/dashboard');
  setloading(false);
};

  const StartCall = () => {
  setloading(true)
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
  setvapiInstance(vapi) // keep for later usage (endCall, etc.)

  const VapiAgentConfig = {
    name : 'AI Medical Doctor Voice Agent',
    firstMessage : "Hi there! I am your AI medical assistant. I'm here to help you with any health questions or concerns you might have today. How are you feeling?",
    transcriber:{
      provider: 'assembly-ai',
      language : 'en'
    },
    voice:{
      provider:'11labs',
      voiceId: 'Will'
    },
    model:{
      provider : 'openai',
      model : 'gpt-4',
      messages : [
        {
          role : 'system',
          content : sessionDetail?.SelectedDoctor?.agentPrompt
        }
      ]
    }
  }

  //@ts-ignore
  vapi.start(VapiAgentConfig);

  // use vapi (NOT vapiInstance) here
  vapi.on('call-start', () => {
    console.log('Call started')
    setcallStarted(true);
  });
  vapi.on('call-end', () => {
    setcallStarted(false)
    console.log('Call ended')
  });
  vapi.on('message', (message) => {
    if (message.type === 'transcript') {
      const { role, transcriptType, transcript } = message
      console.log(`${message.role}: ${message.transcript}`);
      if (transcriptType == 'partial') {
        setLiveTranscript(transcript);
        setCurrentRole(role);
      }
      else if (transcriptType === 'final') {
        setMessages(prev => [...prev, { role, text: transcript }]);
        setLiveTranscript("")
        setCurrentRole(null)
      }      
    }
    setloading(false);
  });

  vapi.on('speech-start', () => {
    console.log('Assistant started speaking');
    setCurrentRole('assistant')
  });
  vapi.on('speech-end', () => {
    console.log('Assistant stopped speaking');
    setCurrentRole('user')
  });
}


  const GenerateReport = async()=>{
    setloading(true)
      const result = await axios.post('/api/medical-report',{
        messages:messages,
        sessionDetail : sessionDetail,
        sessionId : sessionId
      })
      console.log(result.data)
      setloading(false)
      return result.data
  }
  return (
    <div className='p-5 border rounded-3xl bg-secondary'>
      <div className='flex justify-between items-center'>
        <h2 className='p-1 px-2 border rounded-md flex gap-2 items-center '> <Circle className={`h-4 w-4 rounded-full ${callStarted ? 'bg-green-500' : 'bg-red-500'}`} /> {callStarted ? 'Connected...' : 'Not connected'}</h2>
        <h2 className='font-bold text-xl text-gray-400'>00:00</h2>
      </div>
      {sessionDetail && <div className='flex items-center flex-col mt-10'>
        <Image src={sessionDetail?.SelectedDoctor?.image} alt={sessionDetail?.SelectedDoctor?.specialist}
          width={80}
          height={80}
          className='h-[100px] w-[100px] object-cover rounded-full'
        />
        <h2 className='mt-2 text-lg'>{sessionDetail?.SelectedDoctor?.specialist}</h2>
        <p className='text-sm text-gray-400'>Ai Medical Voice Agent</p>

        <div className='mt-12 overflow-y-auto flrx flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72'>
          {
            messages?.slice(-2).map((msg : Message,index)=>(
                  <h2 className='text-gray-400 p-2' key = {index}>{msg.role} : {msg.text}</h2>
              
            ))
          }
          {LiveTranscript && LiveTranscript?.length >0 && <h2 className='text-lg'>{CurrentRole} : {LiveTranscript}</h2>}
        </div>
        { !callStarted ? <Button className='mt-20' onClick={StartCall} disabled = {loading}>
          {loading ? <Loader className='animate-spin'/>: <PhoneCall /> }Start Call</Button>
        :
        <Button variant={'destructive'} onClick={endCall} disabled = {loading}>  {loading ? <Loader className='animate-spin'/>: <PhoneOff /> } Disconnect</Button>
        }
      </div>}
    </div>
  )
}

export default MedicalVoiceAgent
