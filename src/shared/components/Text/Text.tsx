import React, { type PropsWithChildren, type FC } from 'react';

type Variant =
  | ''
  | 'typography'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'subtitle'
  | 'main-body'
  | 'comment-body'
  | 'description';

type TextComponentTag =
  | 'span'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label'
  | 'code';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  component?: TextComponentTag;
  variant?: Variant;
  className?: string;
}

const Text: FC<PropsWithChildren<TextProps>> = ({
  component = 'span',
  variant = '',
  className = '',
  children,
  ...props
}) => {
  const TextComponent = component;
  return (
    <TextComponent
      {...props}
      className={`custom_text ${className} ${variant}`}
    >
      {children}
    </TextComponent>
  );
};

export default Text;
