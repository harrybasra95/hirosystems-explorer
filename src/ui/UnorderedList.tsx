'use client';

import {
  UnorderedList as CUIUnorderedList,
  ListProps as CUIListProps,
  forwardRef,
  useColorMode,
} from '@chakra-ui/react';

import { UIComponent } from './types';

export type UnorderedListProps = CUIListProps & UIComponent;
export const UnorderedList = forwardRef<UnorderedListProps, 'ul'>(
  ({ children, size, ...rest }, ref) => (
    <CUIUnorderedList
      ref={ref}
      width={size || rest.width}
      height={size || rest.height}
      minWidth={size || rest.minWidth}
      minHeight={size || rest.minHeight}
      borderColor={`border.${useColorMode().colorMode}`}
      {...rest}
    >
      {children}
    </CUIUnorderedList>
  )
);
