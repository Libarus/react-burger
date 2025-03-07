import { type TIngredient } from '@shared/types/tingredient';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { type Identifier, XYCoord } from 'dnd-core';
import { useRef } from 'react';
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from 'react-dnd';

interface DragItem {
    item: TIngredient;
    index: number;
}

type Props = {
    item: TIngredient;
    index: number;
    klass: string;
    onMove: (dragIndex: number, hoverIndex: number) => void;
    onKill: (id: string) => void;
};

export function DraggableElement({ item, index, klass, onMove, onKill }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'boxm',
        item: () => {
            return { item, index } as DragItem;
        },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
        accept: 'boxm',
        hover(item: DragItem, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index + 1;
            const hoverIndex = index + 1;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            onMove(dragIndex, hoverIndex);

            item.index = hoverIndex - 1;
        },
    });

    drag(drop(ref));
    const opacity = isDragging ? 0 : 1;

    return (
        <div key={item.id} className={`${klass} pb-4 pr-1`} style={{ opacity }} ref={ref}>
            <DragIcon type='primary' className='mr-2' />
            <ConstructorElement
                isLocked={false}
                text={`${item.name}`}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => onKill(item.uuid)}
            />
        </div>
    );
}
