public class Min_swaps {

    public int solve(int[] A, int B) {
        int n = A.length;

        // =============================================
        // STEP 1: Count how many elements are <= B
        // These are the "good" elements.
        // We want ALL good elements to sit together.
        // The number of good elements = size of the window we need.
        // =============================================
        int goodCount = 0;
        for (int i = 0; i < n; i++) {
            if (A[i] <= B) {
                goodCount++;
            }
        }

        // If there are 0 or 1 good elements, 
        // then they are already together automatically.
        if (goodCount == 0 || goodCount == 1) return 0;


        // =============================================
        // STEP 2: Count "bad" elements in the FIRST window of size goodCount.
        // A bad element is > B.
        //
        // Why count bad elements?
        //   Because bad elements inside the window occupy spots 
        //   where good elements should be.
        //
        // Number of bad elements = number of swaps required.
        // =============================================
        int badCount = 0;
        for (int i = 0; i < goodCount; i++) {
            if (A[i] > B) {
                badCount++;   // count how many bad elements in the first window
            }
        }

        // This is our initial answer
        int minSwaps = badCount;


        // =============================================
        // STEP 3: SLIDE THE WINDOW (Sliding Window Technique)
        // Window size = goodCount
        //
        // Every time the window slides:
        //   - One element enters the window   (incoming)
        //   - One element leaves the window   (outgoing)
        //
        // If incoming is bad → badCount++
        // If outgoing is bad → badCount--
        //
        // Track the smallest value of badCount across all windows.
        // =============================================
        for (int i = goodCount; i < n; i++) {

            // Add the new incoming element
            if (A[i] > B) badCount++;

            // Remove the outgoing element
            if (A[i - goodCount] > B) badCount--;

            // Update the minimum bad elements seen so far
            minSwaps = Math.min(minSwaps, badCount);
        }

        // =============================================
        // Minimum bad elements across all windows = 
        // Minimum number of swaps required.
        // =============================================
        return minSwaps;
    }
}
