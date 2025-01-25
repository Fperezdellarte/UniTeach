import React from "react";
import { EmailForm } from "./formEmail/EmailForm";
import "./SendMail.css";

export const SendMail = () => {
  return (
    <div className="email-form-unique-container">
      <EmailForm />
    </div>
  );
};
