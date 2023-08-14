import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { Container } from "semantic-ui-react";

interface LayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
};

export default DefaultLayout;
