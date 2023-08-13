import React, { ReactNode } from 'react';

interface CardWithHeaderProps {
    headerText: string;
    children: ReactNode;
}

export const CardWithHeader: React.FC<CardWithHeaderProps> = ({
    headerText,
    children,
}) => (
    <div className="card mx-16 my-16 max-w-lg space-y-4">
        <p className="card-header">{headerText}</p>
        {children}
    </div>
);
