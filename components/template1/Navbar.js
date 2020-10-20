import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
const StyledNav = styled.div`
  width: 100%;
  background-color: "#FFFFFF";
  display: flex;
  z-index: 100;
  padding: 2em;
  Button:last-of-type {
    background-color: ${(props) => props.theme.cta};
    position: absolute;
    right: 2em;
  }
`;

const MyButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  text-align: center;
  &&:hover {
    background-color: ${(props) => props.theme.secondary};
  }
  /* margin-right: 2em; */
  min-width: 150px;
  max-width: 150px;
  /* overflow-x: hidden; */
  line-break: none;
  margin-left: 10px;
  margin-right: 10px;
`;

const Navbar = (props) => {
  const router = useRouter();
  return (
    <StyledNav>
      <h3 style={{ color: "white" }}>
        {!props.info.client
          ? props.info.EventJobName
          : props.info.client.ClientName}
      </h3>
      <MyButton
        key={`exhibit-link--${props.info.id}`}
        onClick={() => router.push(`${router.pathname}/exhibitors`)}
      >
        Exhibitors
      </MyButton>
      <MyButton>Third</MyButton>
    </StyledNav>
  );
};

export default Navbar;
