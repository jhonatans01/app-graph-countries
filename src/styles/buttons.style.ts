import styled from "styled-components";
import colors from "./colors.style";
import fonts from "./fonts.style";
import spacing from "./spacing.style";

const Button = styled.button`
  border: none;
  cursor: pointer;
  font-size: ${fonts.fontSizeRegular};
  padding: ${spacing.spacingExtraTight};
  transition: "all 300ms ease 0s";
`;

export const PrimaryButton = styled(Button)`
  color: ${colors.white};
  background: ${colors.green};

  &:hover {
    background: ${colors.lightGreen};
  }
`;

export const SecondaryButton = styled(Button)`
  background: transparent;
  color: ${colors.black};

  &:hover {
    color: ${colors.white};
    background: ${colors.lightGreen};
  }
`;
