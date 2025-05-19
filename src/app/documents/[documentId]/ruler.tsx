//import { useMutation, useStorage } from '@liveblocks/react/suspense';
import { useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';


const markers = Array.from({ length: 83}, (_, i) => i);

export const Ruler = () => {
  const rulerRef = useRef<HTMLDivElement>(null);

  // const leftMargin = useStorage((root) => root.leftMargin ?? editorMargin);
  // const setLeftMargin = useMutation(({ storage }, position: number) => storage.set('leftMargin', position), []);

  // const rightMargin = useStorage((root) => root.rightMargin ?? editorMargin);
  // const setRightMargin = useMutation(({ storage }, position: number) => storage.set('rightMargin', position), []);

  const [leftMargin, setLeftMargin] = useState(56);
  const [rightMargin, setRightMargin] = useState(56);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  };

  const handleRightMouseDown = () => {
    setIsDraggingRight(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector('#ruler-container');

      if (container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const rawPosition = Math.max(0, Math.min(816, relativeX));

        if (isDraggingLeft) {
          const maxLeftPosition = 816- rightMargin - 100;
          const newLeftPosition = Math.min(rawPosition, maxLeftPosition);

          setLeftMargin(newLeftPosition);
        } else if (isDraggingRight) {
          const maxRightPosition = 816 - (leftMargin + 100);
          const newRightPosition = Math.max(816- rawPosition, 0);
          const constrainedRightPosition = Math.min(newRightPosition, maxRightPosition);

          setRightMargin(constrainedRightPosition);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const handleLeftDoubleClick = () => {
    setLeftMargin(56);
  };

  const handleRightDoubleClick = () => {
    setRightMargin(56);
  };

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="mx-auto flex h-6 relative select-none items-end border-b border-gray-300 print:hidden"
      >
      <div id="ruler-container" className="max-w-[816px] mx-auto w-full h-full relative ">
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftDoubleClick}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight} 
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleRightDoubleClick}
        />

        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-full">
            {markers.map((marker) => {
              const position = (marker * 816) / 82;

              return (
                <div
                  key={marker}
                  className="absolute bottom-0"
                  style={{
                    left: `${position}px`,
                  }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 h-2 w-[1px] bg-neutral-500" />
                      <span className="absolute bottom-2 -translate-x-1/2 transform text-[10px] text-neutral-500">{marker / 10 + 1}</span>
                    </>
                  )}

                  {marker % 5 === 0 && marker % 10 !== 0 && <div className="absolute bottom-0 h-1.5 w-px bg-neutral-500" />}
                  {marker % 5 !== 0 && <div className="absolute bottom-0 h-1 w-px bg-neutral-500" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

const Marker = ({ position, isLeft, isDragging, onMouseDown,onDoubleClick}: MarkerProps) => {
  return (
    <div
      className="group absolute top-0 z-[5] -ml-2 h-full w-4 cursor-ew-resize"
      style={{ [isLeft ? 'left' : 'right']: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className="transform absolute left-1/2 top-0 h-full -translate-x-1/2 fill-blue-500" />

      <div
        className="absolute left-1/2 top-4 -translate-x-1/2 scale-x-50 transform"  
        style={{
          height: "100vh",
          width: "1px",
          transform: "scaleX(0.5)",
          backgroundColor: "#3b72f6",
          display: isDragging ? 'block' : 'none',
        }}
      />
    </div>
  );
};
