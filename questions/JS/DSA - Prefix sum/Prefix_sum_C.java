public class Prefix_sum_C {
    public int[] solve(int[] A) {
        int n = A.length;                 // Length of the input array

        int[] prefix = new int[n];        // Array to store prefix sums

        prefix[0] = A[0];                 // First prefix value is same as the first element

        // Build prefix sum for every index i
        for (int i = 1; i < n; i++) {
            // prefix[i] = sum of all elements from A[0] to A[i]
            prefix[i] = prefix[i - 1] + A[i];
            // We add current element A[i] to the previous prefix sum
        }

        return prefix;                    // Return the entire prefix sum array
    }
}
