import { useRef, useState, type MouseEvent, type ReactNode } from 'react';

interface CommonProps {
  className?: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

interface LinkProps extends CommonProps {
  href: string;
  id?: string;
  target?: string;
  rel?: string;
  download?: string | boolean;
  'data-link'?: boolean | string;
}

interface ButtonProps extends CommonProps {
  href?: undefined;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
}

type ActionButtonProps = LinkProps | ButtonProps;

interface Ripple {
  id: string;
  size: number;
  left: number;
  top: number;
}

export default function ActionButton(props: ActionButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const setRef = (node: HTMLElement | null) => {
    ref.current = node;
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const id = `${Date.now()}-${Math.random()}`;
      setRipples((list) => [
        ...list,
        {
          id,
          size,
          left: event.clientX - rect.left - size / 2,
          top: event.clientY - rect.top - size / 2,
        },
      ]);
      setTimeout(() => {
        setRipples((list) => list.filter((ripple) => ripple.id !== id));
      }, 650);
    }
    props.onClick?.(event);
  };

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(hover: none)').matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  const content = (
    <>
      {props.children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple-circle"
          style={{
            width: ripple.size,
            height: ripple.size,
            left: ripple.left,
            top: ripple.top,
          }}
        />
      ))}
    </>
  );

  const className = `${props.className ?? ''} ripple magnetic`.trim();

  if (props.href !== undefined) {
    const { href, className: _className, children: _children, onClick: _onClick, ...rest } = props;
    return (
      <a
        ref={setRef}
        href={href}
        className={className}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        {content}
      </a>
    );
  }

  const { className: _className, children: _children, onClick: _onClick, ...rest } = props;
  return (
    <button
      ref={setRef}
      className={className}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {content}
    </button>
  );
}
