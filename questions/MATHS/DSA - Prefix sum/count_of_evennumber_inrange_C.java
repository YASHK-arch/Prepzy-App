public class count_of_evennumber_inrange_C {
    public int[] solve(int[] A, int[][] B) {
        int [] eCount = new int [A.length + 1];
        for(int i = 0; i < A.length; i++){
            if(A[i] % 2 == 0){
              eCount[i+1] = eCount[i] + 1;
            }
         else{
             eCount[i+1] = eCount[i];
         }
        }
        int s = 0;
        int e = 0;
        int [] COUNT = new int [B.length];
      for(int i = 0; i < B.length; i++){
          s = B[i][0];
          e = B[i][1];
          COUNT[i] = eCount[e+1] - eCount[s];
      }
     return COUNT;
    }
}
