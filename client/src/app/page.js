'use client'
import Navbar from "@/components/navbar/Navbar";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

export default function Home() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="">

      <section className="text-center">
        <Navbar />

        <div className="container">
          <img src="/vault-img.png" className="img-fluid col-8 col-lg-4"></img>
          <h1 className="fw-bold display-5">Your Identity, Secured.</h1>
          <p className="text-muted fs-5 mt-3">
            Store your essential profile details safely in one vault — always in your control.
          </p>

          <div className="mt-4">
            {(!isLoggedIn) && <a href="/signup" className=" btn btn-custom-primary btn-lg me-3">Create Vault</a>}
            <a href="/login" className=" btn btn-custom-outline-primary btn-lg">Open Vault</a>
          </div>

          <div className="mt-5">
            <span className="text-secondary small">
              🔒 100% Private · You control your data
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
