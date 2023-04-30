"use client";
import { Analytics } from "@vercel/analytics/react";
import { Home } from "./components/home";
import { getServerSideConfig } from "./config/server";
import { useSession, signIn, signOut } from "next-auth/react";
import { Component } from "react";
import { useAccessStore } from "./store";

const serverConfig = getServerSideConfig();

class LoginPage extends Component {
  componentDidMount() {
    signIn();
  }

  render() {
    return null;
  }
}

export default function App() {
  const { data: session, status } = useSession() as {
    data: any;
    status: string;
  };
  const accessStore = useAccessStore();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "unauthenticated") {
    return <LoginPage />;
  }

  return (
    <>
      <Home />
      {serverConfig?.isVercel && <Analytics />}
    </>
  );
}
