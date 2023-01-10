import clsx from 'clsx';
import { tagBorder, tagColors, tagSize } from './Tag.constants';

/* eslint-disable-next-line */
export interface TagProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  border?: typeof tagBorder[number];
  color?: typeof tagColors[number];
  size?: typeof tagSize[number];
}

export function Tag({
  size = 'small',
  border = 'rounded',
  color = 'purple',
  className,
  ...props
}: TagProps) {
  return (
    <div
      className={clsx(
        'inline-flex items-center justify-center',
        {
          'bg-purple-10 text-purple-100': color === 'purple',
          'bg-green-10 text-green-100': color === 'green',
          'bg-yellow-10 text-yellow-100': color === 'yellow',
          'bg-red-10 text-red-100': color === 'red',
          'bg-grey-05 text-grey-100': color === 'grey',
        },
        {
          'rounded-full': border === 'rounded',
          rounded: border === 'square',
        },
        {
          'text-text-xs-medium h-6 px-2': size === 'small',
          'text-text-s-semibold-cta h-8 px-2': size === 'big',
        },
        className
      )}
      {...props}
    />
  );
}

export default Tag;
