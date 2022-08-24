// Drag & Drop Interfaces
namespace App {
    export interface Draggable {
        dragStartHandler(event: DragEvent): void;
        dragEndHandler(event: DragEvent): void;
    }
    
    export interface DragTarget {
        dragOverHandler(event: DragEvent): void; // signal browser/JS that the thing we're dragging over is a valid drag target - permit drop
        dropHandler(event: DragEvent): void; // React to drop handler - handle the drop and update data/UI
        dragLeaveHandler(event: DragEvent): void; // visual feedback when user drags over the box, or revert our visual update if cancelled
    }
}