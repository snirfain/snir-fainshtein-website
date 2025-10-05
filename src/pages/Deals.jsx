import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Deals() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to Shop page with deals view
    navigate(createPageUrl("Shop") + "?view=deals", { replace: true });
  }, [navigate]);
  
  return null;
}
