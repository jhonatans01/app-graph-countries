import styled from "styled-components";
import spacing from "./../styles/spacing.style";

const shadow = "0 4px 32px 0 #bdbdbd";

export const Cards = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
`;

export const Card = styled.div`
  width: 250px;
  -webkit-box-shadow: $shadow;
  -moz-box-shadow: $shadow;
  box-shadow: ${shadow};
  text-align: center;
  padding: ${spacing.spacingLoose};
`;

export const Flag = styled.p`
  font-size: 80px;
  margin: 0;
`;
