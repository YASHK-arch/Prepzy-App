public class  Equilibrium_index_of_an_array {
    public int solve(int[] A) {
        int n = A.length;
        int [] prefix = new int [n+1];
        for(int i = 0; i<n; i++){
            prefix[i+1] = prefix[i] + A[i];
        }
        int [] suffix = new int [n+1];
        for(int i = n-1; i>=0; i--){
              suffix[i] = suffix[i+1] + A[i];
        }
        int min_index = Integer.MAX_VALUE;
        boolean exist = false;
        for(int i = 0; i<n; i++){
            if(prefix[i] == suffix[i+1]){    //prefix sum/suffix sum until before current 
                min_index = Math.min(min_index, i);
                exist = true;
            }
        }
        if(exist == false){
            return -1;
        }
         
            return min_index;
    }
}
