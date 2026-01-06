public class Special_Index_C {
    public int solve(int[] A) {
        int n = A.length;

        int[] PE = new int[n + 1];   // PE[i] = sum of even-indexed elements from A[0] to A[i-1]
        int[] PO = new int[n + 1];   // PO[i] = sum of odd-indexed elements from A[0] to A[i-1]

        /* ------------------------------------------------------------
           BUILD PREFIX ARRAYS (Using example A = [2,1,6,4])
           
           i=0 → even index:
           PE[1]=2, PO[1]=0

           i=1 → odd index:
           PE[2]=2, PO[2]=1

           i=2 → even index:
           PE[3]=8, PO[3]=1

           i=3 → odd index:
           PE[4]=8, PO[4]=5

           Final:
           PE = [0, 2, 2, 8, 8]
           PO = [0, 0, 1, 1, 5]
        -------------------------------------------------------------- */

        for (int i = 0; i < n; i++) {
            if ((i % 2) == 0) {  
                // even index → add to PE
                PE[i + 1] = PE[i] + A[i];
                PO[i + 1] = PO[i];
            } 
            else {              
                // odd index → add to PO
                PO[i + 1] = PO[i] + A[i];
                PE[i + 1] = PE[i];
            }
        }

        // ------------------------- ALTERNATE SIR STYLE --------------------//
       /*  for(int i = 0; i < n; i++){
            if(i%2 == 0){
                PE[i+1] = PE[i] + A[i];
            }
            else{PE[i+1] = PE[i];}
        }
        for(int i = 0; i < n; i++){
            if(i%2 != 0){
                PO[i+1] = PO[i] + A[i];
            }
            else{PO[i+1] = PO[i];}
        } */


        int count = 0;

        /* --------------------------------------------------------------------
           Now check each index removal:

           Formulas:
           S_even = PE[i]     + (PO[n] - PO[i+1])
           S_odd  = PO[i]     + (PE[n] - PE[i+1])
           
           Explanation:
           - PE[i] and PO[i]   → before removal (no index shift)
           - (PO[n] - PO[i+1]) → odd elements after i become EVEN after shifting
           - (PE[n] - PE[i+1]) → even elements after i become ODD after shifting

           We evaluate this for each index using the example A = [2,1,6,4]
        ---------------------------------------------------------------------- */

        for (int i = 0; i < n; i++) {

            /* ---------------------------------------------------------------
               EXAMPLE CALCULATIONS:

               Case i = 0  (remove 2):
               S_even = 0 + (5 - 0) = 5
               S_odd  = 0 + (8 - 2) = 6  → not equal

               Case i = 1  (remove 1):
               S_even = 2 + (5 - 1) = 6
               S_odd  = 0 + (8 - 2) = 6  → equal → count++

               Case i = 2  (remove 6):
               S_even = 2 + (5 - 1) = 6
               S_odd  = 1 + (8 - 8) = 1  → not equal

               Case i = 3  (remove 4):
               S_even = 8 + (5 - 5) = 8
               S_odd  = 1 + (8 - 8) = 1  → not equal
            ---------------------------------------------------------------- */

            int S_even = PE[i] + (PO[n] - PO[i + 1]);
            int S_odd  = PO[i] + (PE[n] - PE[i + 1]);

            // If removing A[i] makes the array "fair", count it
            if (S_even == S_odd) {
                count++;
            }
        }

        // For the example A = [2,1,6,4], only index 1 works → answer = 1
        return count;
    }
}
