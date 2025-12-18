import type { PropsWithChildren, ReactNode } from "react";

interface CardProps extends PropsWithChildren {
  title: string;
  footer: ReactNode;
}

const Cards = ({ title, children, footer }: CardProps) => {
  return (
    <div className="container">
      <h2 className="title">Our Products</h2>
      <h3 >{title}</h3>
      <div>{children}</div>
      {footer ?? <footer>{footer}</footer>}
    </div>
  );
};

export default Cards;
