import React from 'react';
import Button from "./Button";

interface Tab {
    label: string;
    onClick: () => void;
    isActive: boolean;
}

interface TabsProps {
    tabs: Tab[];
}

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
    return (
        <div className="flex mb-5">
            {tabs.map((tab, index) => (
                <Button
                    label={tab.label}
                    key={index}
                    onClick={tab.onClick}
                    className={`flex-1 text-md font-bold text-left py-2 px-4 whitespace-nowrap
                        ${tab.isActive
                        ? 'text-indigo-600 border-b-2 '
                        : 'text-black-500'
                    } `}
                 />
            ))}
        </div>
    );
};
