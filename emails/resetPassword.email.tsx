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

const PasswordResetLinkEmail = ({
  projectName,
  recipientName,
  action,
  link,
  supportEmail,
  baseUrl,
}: {
  projectName: string;
  recipientName: string;
  action: string;
  link: string;
  supportEmail: string;
  baseUrl: string;
}) => {
  return (
    <Html>
      <Head>
        <title>My email title</title>
      </Head>

      <Preview>Reset your password for {projectName} using the secure link inside. If you didn't request this, contact support immediately.</Preview>

      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/square-logo.png`}
                width="40"
                height="37"
                alt="Vercel"
                className="my-0 mx-auto"
              />
            </Section>

            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Your Password Reset Link from <strong>{projectName}</strong>
            </Heading>

            <Text className="text-black text-[14px] leading-[24px]">
              Hello <strong>{recipientName}</strong>,
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              We hope this email finds you well.
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              You recently requested to reset your password for your account at
               {projectName}. To proceed with resetting your password, please
              click the link below:
            </Text>

            <Section>
              <Link
                href={link}
                className="text-white text-base font-medium bg-[#E9570C] px-4 py-2 text-center rounded-md"
              >
                Click to Reset Password
              </Link>
            </Section>

            <Section>
              <Text className="text-black text-[14px] leading-[24px]">
              For security reasons, this link will expire in 5 minutes. If you did not request a password reset, or you believe your account security may be compromised, please contact our support team immediately at{" "}
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
export default PasswordResetLinkEmail;
