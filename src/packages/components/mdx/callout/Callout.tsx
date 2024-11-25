import styled from "@emotion/styled";
import { Text } from "../../styled";
import {
  LuPencil,
  LuQuote,
  LuSubtitles,
  LuFileQuestion,
  LuXSquare,
  LuCheck,
} from "react-icons/lu";
import { IconType } from "react-icons";

interface CalloutProps {
  type: "note" | "quote" | "summary" | "question" | "success" | "failure";
  title: string;
  content: string;
}

const capitalize = <T extends string>(str: T): Capitalize<T> => {
  return (str.charAt(0).toUpperCase() +
    str.slice(1).toLowerCase()) as Capitalize<T>;
};

const calloutConfig: Record<
  CalloutProps["type"],
  { color: string; bgColor: string; icon: IconType }
> = {
  note: { color: "#518bd3", bgColor: "#e6f0fc", icon: LuPencil },
  quote: { color: "#cccccc", bgColor: "#f5f5f5", icon: LuQuote },
  summary: { color: "#3cb1ab", bgColor: "#e5f7f7", icon: LuSubtitles },
  question: { color: "#dcad87", bgColor: "#fdf1e5", icon: LuFileQuestion },
  success: { color: "#98c5ab", bgColor: "#e6f7ed", icon: LuCheck },
  failure: { color: "#da8a97", bgColor: "#fdeaec", icon: LuXSquare },
};

export const Callout = ({ type, title, content }: CalloutProps) => {
  const { color, bgColor, icon: CalloutTagIcon } = calloutConfig[type];

  return (
    <CallcoutContainer bgColor={bgColor}>
      <CalloutTagBox>
        <CalloutTagIcon color={color} strokeWidth={2} fontWeight={18} />
        <CalloutTagType size="title" fontWeight="bold" color={color}>
          {capitalize(type)}
        </CalloutTagType>
      </CalloutTagBox>
      <CalloutContent>
        <Text size="title" fontWeight="bold">
          {title}
        </Text>
        <Text size="body1">{content}</Text>
      </CalloutContent>
    </CallcoutContainer>
  );
};

const CallcoutContainer = styled.div<{ bgColor: string }>`
  display: flex;
  flex-direction: column;
  padding: var(--spacing7);
  margin-top: var(--spacing7);
  margin-bottom: var(--spacing7);
  border-radius: var(--radius2);
  gap: var(--spacing8);
  background-color: ${(props) => props.bgColor};
`;

const CalloutTagBox = styled.div`
  display: inline-flex;
  flex-direction: row;
  width: fit-content;
  padding: var(--spacing2) var(--spacing4);
  align-items: center;
  gap: var(--spacing4);
`;

const CalloutTagType = styled(Text)<{ color: string }>`
  color: ${(props) => props.color};
`;

const CalloutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing2);
`;