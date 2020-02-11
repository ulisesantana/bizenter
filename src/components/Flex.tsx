import React, {FC} from 'react';

function align(x?: string) {
  switch (x) {
    case 'left':
      return 'flex-start';
    case 'right':
      return 'flex-end';
    case 'between':
      return 'space-between';
    case 'center':
    default:
      return 'center';
  }
}

interface FlexProps {
  alignContent?: string
  column?: boolean
}

const style = {
  alignItems: "center",
  display: "flex",
  justifyContent: "center"
};

export const Flex: FC<FlexProps> =
  ({children, alignContent, column}) => (
    <div style={{
      ...style,
      justifyContent: align(alignContent),
      flexDirection: column ? "column" : "row"
    }}>
      {children}
    </div>
  );
