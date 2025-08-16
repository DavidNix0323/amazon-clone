// src/app/signin/page.tsx
"use client";

import Container from "@/components/Container";
import { signIn } from "next-auth/react";
import React from "react";

const SignInPage = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl font-bold mb-6">Sign in to your account</h1>
        <button
          onClick={() => signIn("google")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
        >
          Sign in with Google
        </button>
      </div>
    </Container>
  );
};

export default SignInPage;
