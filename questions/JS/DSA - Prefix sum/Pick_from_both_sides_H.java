public class  Pick_from_both_sides_H {

    /* ============================================================
       METHOD 1: PREFIX SUM USING YOUR SIR'S STYLE  (size = n)
       prefix[0] = A[0]
       prefix[i] = prefix[i-1] + A[i]
       AND solve the problem using this prefix style
       ============================================================ */

    public int solveUsingSirPrefix(int[] A, int B) {
        int n = A.length;

        // Sir-style prefix sum: size n
        int[] prefix = new int[n];
        prefix[0] = A[0];
        for (int i = 1; i < n; i++) {
            prefix[i] = prefix[i - 1] + A[i];
        }

        // Reverse-prefix/suffix: also size n
        int[] suffix = new int[n];
        suffix[0] = A[n - 1];      // last element
        for (int i = 1; i < n; i++) {
            suffix[i] = suffix[i - 1] + A[n - 1 - i];
        }

        int maxSum = Integer.MIN_VALUE;

        // Try all possibilities: x from front, B - x from back
        for (int x = 0; x <= B; x++) {
            int frontTake = x;
            int backTake = B - x;

            int sumFront = 0;
            int sumBack = 0;

            // Taking from front using prefix
            if (frontTake > 0) {
                sumFront = prefix[frontTake - 1];
            }

            // Taking from back using reverse prefix (suffix)
            if (backTake > 0) {
                sumBack = suffix[backTake - 1];
            }

            maxSum = Math.max(maxSum, sumFront + sumBack);
        }

        return maxSum;
    }

    /* ============================================================
       METHOD 2: PREFIX SUM USING RECOMMENDED STYLE  (size = n+1)
       prefix[0] = 0
       prefix[i+1] = prefix[i] + A[i]
       Easiest & safest (no out-of-bounds)
       ============================================================ */

    public int solveUsingRecommendedPrefix(int[] A, int B) {
        int n = A.length;

        // Safer prefix sum: size n+1
        int[] prefix = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + A[i];
        }

        // Reverse prefix (suffix) also size n+1
        int[] suffix = new int[n + 1];
        for (int i = n - 1; i >= 0; i--) {
            suffix[n - i] = suffix[n - i - 1] + A[i];
        }

        int maxSum = Integer.MIN_VALUE;

        for (int x = 0; x <= B; x++) {       //took <=B becuase this tyle of prefix sum is 1- based
            int sumFront = prefix[x];
            int sumBack = suffix[B - x];

            maxSum = Math.max(maxSum, sumFront + sumBack);
        }

        return maxSum;
    }

}
