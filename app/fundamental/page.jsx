"use client";
import React from "react";
import FundamentalsCard from "../components/FundamentalsCard";
export default function FundamentalCard(params) {
  return <FundamentalsCard companyName={params.company} />;
}
