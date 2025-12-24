public class mi_swaps_toSort {

    /*
     * Minimum swaps to sort a permutation of [0..n-1].
     *
     * Key idea (cycle decomposition):
     * - The array A is a permutation of 0..n-1, so each element belongs to exactly one cycle
     *   when you follow the mapping: index -> A[index] -> A[A[index]] -> ...
     * - A cycle of length k can be fixed (sorted) with exactly (k - 1) swaps.
     *   Reason: each swap can place one element into its final position; to place k elements
     *   correctly you need k-1 moves.
     *
     * Algorithm:
     * - Keep a visited[] array so we don't process the same index twice.
     * - For each index i that is unvisited and not already in correct position (A[i] != i),
     *   follow the cycle starting at i, count its length, and add (cycleSize - 1) to swaps.
     *
     * Time: O(n) (each index visited once)
     * Space: O(n) for visited array
     */
    public int solve(int[] A) {
        int n = A.length;

        // visited[i] == true means index i has already been processed (belongs to a processed cycle)
        boolean[] visited = new boolean[n];

        // total swaps needed
        int swaps = 0;

        // iterate every index
        for (int i = 0; i < n; i++) {

            // If this index is already visited, its cycle was counted before -> skip.
            // Also if A[i] == i, the element is already in its correct position (cycle length 1),
            // so no swaps required -> skip.
            if (visited[i] || A[i] == i) continue;

            // If we reach here, we found the start of an unprocessed cycle.
            int cycleSize = 0;   // will count how many nodes are in this cycle
            int j = i;           // current position while walking the cycle

            // Walk the cycle until we revisit a visited index
            while (!visited[j]) {
                visited[j] = true; // mark current index as visited so we don't repeat it later
                j = A[j];          // move to the index where current value should go (permutation mapping)
                cycleSize++;       // increment cycle length
            }

            // For a cycle of length k, we need k - 1 swaps to put all members in correct place.
            // Example k=3: (a->b->c->a) -> swap a with correct element, then another swap => 2 swaps.
            if (cycleSize > 0) {
                swaps += (cycleSize - 1);
            }
        }

        return swaps;
    }
}
