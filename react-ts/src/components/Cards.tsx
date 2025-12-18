import type { PropsWithChildren, ReactNode } from "react";

interface CardProps extends PropsWithChildren {
  title: string;
  footer: ReactNode;
}

const Cards = ({ title, children, footer }: CardProps) => {
  return (
    <div className="card">
      <h2 className="card-title">Our Products</h2>
      <h3 className="card-subtitle">{title}</h3>
      <div className="card-content">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Cards;
