import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Img,
  Link,
  Tailwind,
  Preview,
  Heading,
  Hr,
} from "@react-email/components";

const OTPEmail = ({
  projectName,
  recipientName,
  action,
  otp,
  supportEmail,
  baseUrl,
}: {
  projectName: string;
  recipientName: string;
  action: string;
  otp: string;
  supportEmail: string;
  baseUrl: string;
}) => {
  return (
    <Html>
      <Head>
        <title>My email title</title>
      </Head>

      <Preview>{`Verify your identity with a secure OTP from ${projectName}. Protect your account and complete your action with this one-time code.`}</Preview>

      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/square-logo.png`}
                width="40"
                height="37"
                alt="logo"
                className="my-0 mx-auto"
              />
            </Section>

            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Your One-Time Password (OTP) from <strong>{projectName}</strong>
            </Heading>

            <Text className="text-black text-[14px] leading-[24px]">
              Hello <strong>{recipientName}</strong>,
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              We hope this email finds you well.
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              As part of our security protocol, you are required to enter a
              One-Time Password (OTP) to proceed with {action}.
            </Text>

            <Section>
              <Text className="text-black text-lg font-bold text-center">
                Your OTP is:
              </Text>

              <Text className="text-black text-2xl font-bold px-4 py-1 text-center -mt-5">
                {otp}
              </Text>
            </Section>

            <Section>
              <Text className="text-black text-[14px] leading-[24px]">
                This OTP is valid for 5 minutes, and can only be used once.
                Please make sure not to share this code with anyone. If you did
                not request an OTP, or you believe your account security may be
                compromised, please contact our support team immediately at{" "}
                <Link
                  href={`mailto:${supportEmail}`}
                  className="text-blue-600 no-underline"
                >
                  {supportEmail}
                </Link>
                .
              </Text>
            </Section>

            <Section>
              <Text className="text-black text-[14px] leading-[24px]">
                Thank you for choosing {projectName}. Your security is our top
                priority.
              </Text>

              <Text>Best regards,</Text>

              <Text>{projectName} Team</Text>
            </Section>

            <Hr />

            <Section>
              <Text className="text-black text-[14px] leading-[24px]">
                This email and its contents are confidential and intended solely
                for the individual or entity to whom it is addressed. If you
                have received this email in error, please notify the sender and
                delete the email from your system.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
export default OTPEmail;
