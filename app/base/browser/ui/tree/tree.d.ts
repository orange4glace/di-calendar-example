import { Event } from 'base/common/event';
import { Iterator } from 'base/common/iterator';
import { IListRenderer, IListDragOverReaction, IListDragAndDrop } from 'base/browser/ui/list/list';
import { IDragAndDropData } from 'base/browser/dnd';
export declare enum TreeVisibility {
    /**
     * The tree node should be hidden.
     */
    Hidden = 0,
    /**
     * The tree node should be visible.
     */
    Visible = 1,
    /**
     * The tree node should be visible if any of its descendants is visible.
     */
    Recurse = 2
}
/**
 * A composed filter result containing the visibility result as well as
 * metadata.
 */
export interface ITreeFilterDataResult<TFilterData> {
    /**
     * Whether the node should be visible.
     */
    visibility: boolean | TreeVisibility;
    /**
     * Metadata about the element's visibility which gets forwarded to the
     * renderer once the element gets rendered.
     */
    data: TFilterData;
}
/**
 * The result of a filter call can be a boolean value indicating whether
 * the element should be visible or not, a value of type `TreeVisibility` or
 * an object composed of the visibility result as well as additional metadata
 * which gets forwarded to the renderer once the element gets rendered.
 */
export declare type TreeFilterResult<TFilterData> = boolean | TreeVisibility | ITreeFilterDataResult<TFilterData>;
/**
 * A tree filter is responsible for controlling the visibility of
 * elements in a tree.
 */
export interface ITreeFilter<T, TFilterData = void> {
    /**
     * Returns whether this elements should be visible and, if affirmative,
     * additional metadata which gets forwarded to the renderer once the element
     * gets rendered.
     *
     * @param element The tree element.
     */
    filter(element: T, parentVisibility: TreeVisibility): TreeFilterResult<TFilterData>;
}
export interface ITreeSorter<T> {
    compare(element: T, otherElement: T): number;
}
export interface ITreeElement<T> {
    readonly element: T;
    readonly children?: Iterator<ITreeElement<T>> | ITreeElement<T>[];
    readonly collapsible?: boolean;
    readonly collapsed?: boolean;
}
export interface ITreeNode<T, TFilterData = void> {
    readonly element: T;
    readonly parent: ITreeNode<T, TFilterData> | undefined;
    readonly children: ITreeNode<T, TFilterData>[];
    readonly depth: number;
    readonly visibleChildrenCount: number;
    readonly visibleChildIndex: number;
    readonly collapsible: boolean;
    readonly collapsed: boolean;
    readonly visible: boolean;
    readonly filterData: TFilterData | undefined;
}
export interface ICollapseStateChangeEvent<T, TFilterData> {
    node: ITreeNode<T, TFilterData>;
    deep: boolean;
}
export interface ITreeModelSpliceEvent<T, TFilterData> {
    insertedNodes: ITreeNode<T, TFilterData>[];
    deletedNodes: ITreeNode<T, TFilterData>[];
}
export interface ITreeModel<T, TFilterData, TRef> {
    readonly rootRef: TRef;
    readonly onDidSplice: Event<ITreeModelSpliceEvent<T, TFilterData>>;
    readonly onDidChangeCollapseState: Event<ICollapseStateChangeEvent<T, TFilterData>>;
    readonly onDidChangeRenderNodeCount: Event<ITreeNode<T, TFilterData>>;
    getListIndex(location: TRef): number;
    getListRenderCount(location: TRef): number;
    getNode(location?: TRef): ITreeNode<T, any>;
    getNodeLocation(node: ITreeNode<T, any>): TRef;
    getParentNodeLocation(location: TRef): TRef;
    getParentElement(location: TRef): T;
    getFirstElementChild(location: TRef): T | undefined;
    getLastElementAncestor(location?: TRef): T | undefined;
    isCollapsible(location: TRef): boolean;
    isCollapsed(location: TRef): boolean;
    setCollapsed(location: TRef, collapsed?: boolean, recursive?: boolean): boolean;
    expandTo(location: TRef): void;
    refilter(): void;
}
export interface ITreeRenderer<T, TFilterData = void, TTemplateData = void> extends IListRenderer<ITreeNode<T, TFilterData>, TTemplateData> {
    renderTwistie?(element: T, twistieElement: HTMLElement): void;
    onDidChangeTwistieState?: Event<T>;
}
export interface ITreeEvent<T> {
    elements: T[];
    browserEvent?: UIEvent;
}
export interface ITreeMouseEvent<T> {
    browserEvent: MouseEvent;
    element: T | null;
}
export interface ITreeContextMenuEvent<T> {
    browserEvent: UIEvent;
    element: T | null;
    anchor: HTMLElement | {
        x: number;
        y: number;
    };
}
export interface ITreeNavigator<T> {
    current(): T | null;
    previous(): T | null;
    parent(): T | null;
    first(): T | null;
    last(): T | null;
    next(): T | null;
}
export interface IDataSource<TInput, T> {
    getChildren(element: TInput | T): T[];
}
export interface IAsyncDataSource<TInput, T> {
    hasChildren(element: TInput | T): boolean;
    getChildren(element: TInput | T): T[] | Promise<T[]>;
}
export declare enum TreeDragOverBubble {
    Down = 0,
    Up = 1
}
export interface ITreeDragOverReaction extends IListDragOverReaction {
    bubble?: TreeDragOverBubble;
    autoExpand?: boolean;
}
export declare const TreeDragOverReactions: {
    acceptBubbleUp(): ITreeDragOverReaction;
    acceptBubbleDown(autoExpand?: boolean): ITreeDragOverReaction;
    acceptCopyBubbleUp(): ITreeDragOverReaction;
    acceptCopyBubbleDown(autoExpand?: boolean): ITreeDragOverReaction;
};
export interface ITreeDragAndDrop<T> extends IListDragAndDrop<T> {
    onDragOver(data: IDragAndDropData, targetElement: T | undefined, targetIndex: number | undefined, originalEvent: DragEvent): boolean | ITreeDragOverReaction;
}
