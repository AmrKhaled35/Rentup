"use client";

import Container from "@/components/shared/Container";

export default function Error({ error, reset }) {
  return (
    <Container>
      <div className="flex flex-col justify-center items-center lg:h-[calc(100vh-531px)]">
        <h2 className="my-10">Something went wrong!</h2>
        <button
          onClick={() => reset()}
          className="px-5 py-3 rounded-md text-white bg-skyBlue font-medium"
        >
          Try again
        </button>
      </div>
    </Container>
  );
}
