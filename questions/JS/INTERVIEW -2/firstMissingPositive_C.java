public class firstMissingPositive_C {                           ////sorting method
    public int firstMissingPositive(int[] A) {
      Arrays.sort(A);

        int want = 1;

        for (int i = 0; i < A.length; i++) {
            if (A[i] == want) {
                want++;
            }
        }

        return want;
    }
}

public class OPTIMISED_SOLUTION {                             ///HashMap Method
    public int firstMissingPositive(int[] A) {
        int N = A.length;

        // STEP 1: Sanitize the array
        // Replace all numbers <=0 or >N with a dummy (N+1)
        for (int i = 0; i < N; i++) {
            if (A[i] <= 0 || A[i] > N) {
                A[i] = N + 1;
            }
        }

        // STEP 2: Mark presence using indexes
        for (int i = 0; i < N; i++) {
            int x = Math.abs(A[i]);
            if (x <= N && A[x - 1] > 0) {
                A[x - 1] = -A[x - 1];
            }
        }

        // STEP 3: First positive index is the answer
        for (int i = 0; i < N; i++) {
            if (A[i] > 0) return i + 1;
        }

        // STEP 4: All 1..N are present
        return N + 1;
    }
}

