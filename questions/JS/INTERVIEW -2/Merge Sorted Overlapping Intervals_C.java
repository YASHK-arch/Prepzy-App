public class MergeSortedOverlappingIntervals {

    public int[][] solve(int[][] A) {

        // ------------------------------
        // Step 1: Extract start[] and end[] arrays
        // ------------------------------
        // S[i] contains the start of interval i
        // E[i] contains the end of interval i
        int[] S = new int[A.length];
        int[] E = new int[A.length];

        for (int i = 0; i < A.length; i++) {
            S[i] = A[i][0];   // store start value
        }
        for (int i = 0; i < A.length; i++) {
            E[i] = A[i][1];   // store end value
        }

        // List to store merged intervals
        ArrayList<int[]> list = new ArrayList<>();

        // ------------------------------
        // Step 2: Initialize first interval
        // ------------------------------
        // The first interval becomes our current interval
        int start = S[0];
        int end = E[0];

        // ------------------------------
        // Step 3: Traverse the remaining intervals
        // ------------------------------
        for (int i = 1; i < A.length; i++) {

            // CASE 1: Current interval overlaps with previous merged interval
            // Overlap condition: if next interval's start <= current end
            if (S[i] <= end) {

                // Extend the current merged interval by updating the end
                // We take max because intervals may partially overlap
                end = Math.max(end, E[i]);
            }

            // CASE 2: No overlap found → we must close the previous interval
            else {

                // Add the completed interval to the list
                list.add(new int[]{start, end});

                // Start a new interval from current S[i] and E[i]
                start = S[i];
                end = E[i];
            }
        }

        // ------------------------------
        // Step 4: Add the final interval to the list
        // ------------------------------
        list.add(new int[]{start, end});

        // ------------------------------
        // Step 5: Convert ArrayList → 2D array for output
        // ------------------------------
        int[][] ans = new int[list.size()][2];

        for (int i = 0; i < list.size(); i++) {
            ans[i] = list.get(i); // copy each merged interval
        }

        return ans;
    }
}
