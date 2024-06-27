import OtpVerificationCom from "@/components/global/auth/OtpVerification";
import React from "react";

const OtpVerificationPage = () => {
  return (
    <OtpVerificationCom
      title="Unlock the door!"
      subTitle="We've sent a key to your phone (virtually, of course). Enter it here to open your account."
    />
  );
};

export default OtpVerificationPage;
