import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

type DropableProps = {
  listId: string;
  children: ReactNode;
}

const Dropable = ({ listId, children }: DropableProps) => {
  const { setNodeRef } = useDroppable({
    id: listId,
  });
  return (
    <div className="dropable" ref={setNodeRef}>
      {children}
    </div>
  )
}

export { Dropable };