"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from "react";
import styles from '../form.module.css'
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
export const metadata = {
  title: "Login",
};
const Login = () => {
  const [show, setShow] = useState(false);
  return (
    <section className="w-3/4 mx-auto flex flex-col gap-10">
      <div className="title">
        <h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
        <p className="w-3/4 mx-auto text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
          officia?
        </p>
      </div>

      {/* form */}
      <form className="flex flex-col gap-5">
        <div className={styles.input_group}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.input_text}
          />
          <span className="icon flex items-center px-4">
            <HiAtSymbol size={25} />
          </span>
        </div>
        <div className={styles.input_group}>
          <input
            type={ show ? "text": "password"}
            name="password"
            placeholder="password"
            className={styles.input_text}
          />
          <span
            className="icon flex items-center px-4"
            onClick={() => setShow(!show)}
          >
            <HiFingerPrint size={25} />
          </span>
        </div>

        {/* login buttons */}
        <div className="input-button">
          <button type="submit" className={styles.button}>
            Login
          </button>
        </div>
        <div className="input-button">
          <button type="button" className={styles.button_custom}>
            Sign In with Google{" "}
            <Image src={"/assets/google.svg"} width="20" height={20}></Image>
          </button>
        </div>
        <div className="input-button">
          <button type="button" className={styles.button_custom}>
            Sign In with Github{" "}
            <Image src={"/assets/github.svg"} width={25} height={25}></Image>
          </button>
        </div>
      </form>

      {/* bottom */}
      <p className="text-center text-gray-400 ">
        dont have an account yet?{" "}
        <Link href={"/register"}>
          <p className="text-blue-700">Sign Up</p>
        </Link>
      </p>
    </section>
  );
}

export default Login