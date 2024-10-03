"use client";

import React from "react";
import { useGetUser } from "@/generated/default/default";

export default function Sample() {

  const { data, error, isLoading } = useGetUser();
  console.log(data, error, isLoading);
  return (
    <div>
        Hello
    </div>
  );
}
