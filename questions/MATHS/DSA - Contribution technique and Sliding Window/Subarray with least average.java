public class Solution {
    public int solve(int[] A, int B) {
        int n = A.length;

        // Step 1: Compute sum of first window of size B
        int windowSum = 0;
        for (int i = 0; i < B; i++) {
            windowSum += A[i];
        }

        int minSum = windowSum;   // Minimum total sum for a window
        int minIndex = 0;          // Starting index of minimum average subarray

        // Step 2: Slide the window from index B to n-1
        for (int i = B; i < n; i++) {
            windowSum += A[i] - A[i - B];   // Add next element, remove previous element

            if (windowSum < minSum) {
                minSum = windowSum;
                minIndex = i - B + 1;
            }
        }

        // Step 3: Return starting index of minimum average subarray
        return minIndex;
    }
}
