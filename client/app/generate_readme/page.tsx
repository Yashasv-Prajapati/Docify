
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Avatar from '@/app/dashboard/_components/avatar';
import Nav from '@/app/dashboard/_components/nav';
import GenerateReadmeForm from "./_components/GenerateReadmeForm";
export default function GenerateReadme() {
  const AvatarComponent = <Avatar />;
  return (
    <div key='1' className='flex h-screen flex-col'>
    <Nav AvatarComponent={AvatarComponent} />
    <GenerateReadmeForm/>
  </div>
  )
}
