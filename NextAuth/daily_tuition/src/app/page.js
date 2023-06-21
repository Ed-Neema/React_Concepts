"use client"
import Image from 'next/image'
import Link from 'next/link';
import {useState} from 'react'
export const metadata = {
  title: "Home",
};

export default function Home() {
  const [session, setSession] = useState(true);
  return session ? User() : Guest();
}

// create two views for Guest and Authorized user
function Guest(){
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Guest Homepage</h3>

      <div className="flex justify-center">
        <Link href={"/login"}>
          <p className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">
            Sign In
          </p>
        </Link>
      </div>
    </main>
  );
}

// Authorize User
function User(){
  return(
    <main className="container mx-auto text-center py-20">
          <h3 className='text-4xl font-bold'>Authorize User Homepage</h3>

          <div className='details'>
            <h5>Unknown</h5>
            <h5>Unknown</h5>
          </div>

          <div className="flex justify-center">
            <button className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50'>Sign Out</button>
          </div>

          <div className='flex justify-center'>
            <Link href={'/profile'}><p className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Profile Page</p></Link>
          </div>
      </main>
  )
}