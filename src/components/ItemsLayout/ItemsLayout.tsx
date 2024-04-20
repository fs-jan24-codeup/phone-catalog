import React, { ReactNode } from 'react';
import './ItemsLayout.scss';

type Props = {
    children: ReactNode;
};

export const ItemsLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="items">{children}</div>
    );
};
