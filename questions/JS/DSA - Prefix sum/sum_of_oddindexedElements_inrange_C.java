public class sum_of_oddindexedElements_inrange_C {
    public int[] sumOfOddIndexedElements(int[] A, int[][] B) {
        int oSum [] = new int [A.length + 1];
        for(int i = 0; i < A.length; i++){
            if(i%2 != 0){
                oSum[i+1] = oSum[i] + A[i];
            }
            else{
                oSum[i+1] = oSum[i];
            }
        }
        
        int s = 0;
        int e = 0;
        int [] sum = new int [B.length];
        for(int i = 0; i<B.length; i++){
            s = B[i][0];
            e = B[i][1];
           sum[i] = oSum[e+1] - oSum[s];
        }
        return sum;
    }
}
