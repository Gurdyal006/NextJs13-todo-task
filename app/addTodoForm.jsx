"use client"
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import  {redirect, useRouter} from 'next/navigation'
import { Context } from '@/components/Clients'


const AddTodoForm = () => {

const [title, setTitle] = useState("")
const [description, setDescription] = useState("")
const {user} = useContext(Context)

const router = useRouter()



const submitHandler = async (e) => {
  e.preventDefault()

try {

  const res = await fetch("/api/newtask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title,
      description
    })
  })

  const data = await res.json()

  if(!data.success) return toast.error(data.message)


  toast.success(data.message)

  setTitle("")
  setDescription("")

  router.refresh()

  
} catch (error) {
  return toast.error(error)
}

}

if(!user._id) return redirect("/login")

  return <div className="login">
    <section>
        <form onSubmit={submitHandler}>

            <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
             type="text"
             placeholder="Title" />
            <input
               onChange={(e) => setDescription(e.target.value)}
               value={description}
             type="text"
              placeholder="Description" />
            
            <button type='submit'>Add Task</button>


        </form>
    </section>
  </div>
}

// export const metadata = {
//     title: 'Task App',
//     description: 'This is Task Todo App Next js',
//   }

export default AddTodoForm