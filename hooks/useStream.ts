import { StreamContext } from "@/context/StreamProvider";
import { useContext } from "react";

export const useStream = () => {
  const context = useContext(StreamContext);
  if (!context) {
    throw new Error("useStream must be used within a StreamProvider");
  }
  return context;
};
