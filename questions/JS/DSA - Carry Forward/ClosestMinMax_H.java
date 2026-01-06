public class ClosestMinMax {
    public int solve(int[] A) {
        int n = A.length;
        int min_size = Integer.MAX_VALUE;

        int min_val = Integer.MAX_VALUE;
        int max_val = Integer.MIN_VALUE;
        for (int i = 0; i < n; i++) {
           min_val = Math.min(min_val, A[i]);
           max_val = Math.max(max_val, A[i]);
        }
       
        for (int start = 0; start < n; start++) {
               int foundMin = 0;
               int foundMax = 0;

            for (int end = start; end < n; end++) {
                if (A[end] == min_val) {
                    foundMin++;
                }
                if (A[end] == max_val) {
                    foundMax++;
                }
                if (foundMin > 0 && foundMax > 0) {
                   int size = end - start + 1;
                   min_size = Math.min(min_size, size);
                   
                }
            }
        }
        return min_size;

    }
}