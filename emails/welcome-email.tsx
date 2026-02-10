import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
    email: string;
}

export const WelcomeEmail = ({
    email,
}: WelcomeEmailProps) => (
    <Html>
        <Head />
        <Preview>Welcome to the Creator Club!</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={logoBox}>
                    <Text style={logo}>🥪 X-VERIFIED</Text>
                </Section>
                <Heading style={heading}>WELCOME TO THE CLUB!</Heading>
                <Text style={paragraph}>
                    Hey there! You've just joined the <strong>Creator Club</strong>. 🚀
                </Text>
                <Text style={paragraph}>
                    We're here to help you master the X algorithm, understand your analytics, and maximize your verified payouts.
                </Text>
                <Section style={btnContainer}>
                    <Link
                        style={button}
                        href="https://x-verified-estimator.vercel.app"
                    >
                        Check Your Stats
                    </Link>
                </Section>
                <Text style={paragraph}>
                    Your registered email: <strong>{email}</strong>
                </Text>
                <Text style={footer}>
                    Stay authenticated, stay verified.
                    <br />
                    X-Verified Estimator &copy; 2026
                </Text>
            </Container>
        </Body>
    </Html>
);

export default WelcomeEmail;

const main = {
    backgroundColor: "#f7f3eb",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    maxWidth: "580px",
};

const logoBox = {
    padding: "20px",
    backgroundColor: "#000",
    borderRadius: "8px",
    textAlign: "center" as const,
};

const logo = {
    color: "#fde047",
    fontSize: "32px",
    fontWeight: "900",
    margin: "0",
};

const heading = {
    fontSize: "40px",
    fontWeight: "900",
    lineHeight: "1",
    color: "#000",
    textAlign: "center" as const,
    marginTop: "40px",
    textTransform: "uppercase" as const,
    fontStyle: "italic",
};

const paragraph = {
    fontSize: "18px",
    lineHeight: "26px",
    color: "#000",
    fontWeight: "500",
};

const btnContainer = {
    textAlign: "center" as const,
    marginTop: "32px",
    marginBottom: "32px",
};

const button = {
    backgroundColor: "#fde047",
    borderRadius: "0",
    border: "4px solid #000",
    color: "#000",
    fontSize: "20px",
    fontWeight: "900",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "inline-block",
    padding: "16px 32px",
    boxShadow: "6px 6px 0px 0px #000",
    textTransform: "uppercase" as const,
    fontStyle: "italic",
};

const footer = {
    color: "#666",
    fontSize: "12px",
    lineHeight: "24px",
    marginTop: "40px",
    textAlign: "center" as const,
    fontWeight: "700",
    textTransform: "uppercase" as const,
};
