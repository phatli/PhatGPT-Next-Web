"use client";
import { signIn } from "next-auth/react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useAccessStore } from "../../store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.css";
import BotIcon from "../../icons/bot.svg";

interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const LoginPage = async () => {
  const userName = useRef("");
  const pass = useRef("");
  const router = useRouter();
  const accessStore = useAccessStore();

  const onSubmit = async () => {
    const response = await signIn("credentials", {
      redirect: Boolean(false),
      username: userName.current,
      password: pass.current,
      callbackUrl: "/",
    });

    console.log("response", response);

    if (response?.error) {
      toast.error("Incorrect username/password.");
      return;
    }

    if (response?.ok) {
      accessStore.updateCode(pass.current);
      router.push(response.url!);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`no-dark`}>
        <BotIcon />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          className={styles.input}
          onChange={(e) => (userName.current = e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className={styles.input}
          onChange={(e) => (pass.current = e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <button className={styles.button} onClick={onSubmit}>
          Sign in
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default LoginPage;
