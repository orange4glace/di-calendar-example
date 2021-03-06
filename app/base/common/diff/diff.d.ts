export declare function stringDiff(original: string, modified: string, pretty: boolean): IDiffChange[];
export interface ISequence {
    getLength(): number;
    getElementAtIndex(index: number): number | string;
}
export interface IDiffChange {
    /**
     * The position of the first element in the original sequence which
     * this change affects.
     */
    originalStart: number;
    /**
     * The number of elements from the original sequence which were
     * affected.
     */
    originalLength: number;
    /**
     * The position of the first element in the modified sequence which
     * this change affects.
     */
    modifiedStart: number;
    /**
     * The number of elements from the modified sequence which were
     * affected (added).
     */
    modifiedLength: number;
}
export interface IContinueProcessingPredicate {
    (furthestOriginalIndex: number, originalSequence: ISequence, matchLengthOfLongest: number): boolean;
}
export declare class Debug {
    static Assert(condition: boolean, message: string): void;
}
export declare class MyArray {
    /**
     * Copies a range of elements from an Array starting at the specified source index and pastes
     * them to another Array starting at the specified destination index. The length and the indexes
     * are specified as 64-bit integers.
     * sourceArray:
     *		The Array that contains the data to copy.
     * sourceIndex:
     *		A 64-bit integer that represents the index in the sourceArray at which copying begins.
     * destinationArray:
     *		The Array that receives the data.
     * destinationIndex:
     *		A 64-bit integer that represents the index in the destinationArray at which storing begins.
     * length:
     *		A 64-bit integer that represents the number of elements to copy.
     */
    static Copy(sourceArray: any[], sourceIndex: number, destinationArray: any[], destinationIndex: number, length: number): void;
}
/**
 * An implementation of the difference algorithm described in
 * "An O(ND) Difference Algorithm and its variations" by Eugene W. Myers
 */
export declare class LcsDiff {
    private OriginalSequence;
    private ModifiedSequence;
    private ContinueProcessingPredicate;
    private m_forwardHistory;
    private m_reverseHistory;
    /**
     * Constructs the DiffFinder
     */
    constructor(originalSequence: ISequence, newSequence: ISequence, continueProcessingPredicate?: IContinueProcessingPredicate | null);
    private ElementsAreEqual;
    private OriginalElementsAreEqual;
    private ModifiedElementsAreEqual;
    ComputeDiff(pretty: boolean): IDiffChange[];
    /**
     * Computes the differences between the original and modified input
     * sequences on the bounded range.
     * @returns An array of the differences between the two input sequences.
     */
    private _ComputeDiff;
    /**
     * Private helper method which computes the differences on the bounded range
     * recursively.
     * @returns An array of the differences between the two input sequences.
     */
    private ComputeDiffRecursive;
    private WALKTRACE;
    /**
     * Given the range to compute the diff on, this method finds the point:
     * (midOriginal, midModified)
     * that exists in the middle of the LCS of the two sequences and
     * is the point at which the LCS problem may be broken down recursively.
     * This method will try to keep the LCS trace in memory. If the LCS recursion
     * point is calculated and the full trace is available in memory, then this method
     * will return the change list.
     * @param originalStart The start bound of the original sequence range
     * @param originalEnd The end bound of the original sequence range
     * @param modifiedStart The start bound of the modified sequence range
     * @param modifiedEnd The end bound of the modified sequence range
     * @param midOriginal The middle point of the original sequence range
     * @param midModified The middle point of the modified sequence range
     * @returns The diff changes, if available, otherwise null
     */
    private ComputeRecursionPoint;
    /**
     * Shifts the given changes to provide a more intuitive diff.
     * While the first element in a diff matches the first element after the diff,
     * we shift the diff down.
     *
     * @param changes The list of changes to shift
     * @returns The shifted changes
     */
    private PrettifyChanges;
    private _OriginalIsBoundary;
    private _OriginalRegionIsBoundary;
    private _ModifiedIsBoundary;
    private _ModifiedRegionIsBoundary;
    private _boundaryScore;
    /**
     * Concatenates the two input DiffChange lists and returns the resulting
     * list.
     * @param The left changes
     * @param The right changes
     * @returns The concatenated list
     */
    private ConcatenateChanges;
    /**
     * Returns true if the two changes overlap and can be merged into a single
     * change
     * @param left The left change
     * @param right The right change
     * @param mergedChange The merged change if the two overlap, null otherwise
     * @returns True if the two changes overlap
     */
    private ChangesOverlap;
    /**
     * Helper method used to clip a diagonal index to the range of valid
     * diagonals. This also decides whether or not the diagonal index,
     * if it exceeds the boundary, should be clipped to the boundary or clipped
     * one inside the boundary depending on the Even/Odd status of the boundary
     * and numDifferences.
     * @param diagonal The index of the diagonal to clip.
     * @param numDifferences The current number of differences being iterated upon.
     * @param diagonalBaseIndex The base reference diagonal.
     * @param numDiagonals The total number of diagonals.
     * @returns The clipped diagonal index.
     */
    private ClipDiagonalBound;
}
