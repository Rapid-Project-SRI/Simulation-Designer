import React from "react";

interface SidebarNodeProps {
  color: "blue" | "green" | "yellow" | "orange" | "purple" | "gray";
  letter: string;
  label: string;
  nodeType: string;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, nodeType: string) => void;
}

const SidebarNode: React.FC<SidebarNodeProps> = ({
  color,
  letter,
  label,
  nodeType,
  onDragStart,
}) => {
  const bgClass = `bg-node-${color}-light`;
  const borderClass = `border-node-${color}-dark`;
  const textClass = `text-node-${color}-dark`;

  return (
    <div
      onDragStart={(event) => onDragStart(event, nodeType)}
      draggable
      className={`sidebar-node-container ${bgClass} ${borderClass} [&>h3]:text-[var(--color-node-${color}-dark)]`}
    >
      <h3 className={`node-letter ${textClass}`}>{letter}</h3>
      <h3 className={`node-label ${textClass}`}>{label}</h3>
    </div>
  );
};

export default SidebarNode;