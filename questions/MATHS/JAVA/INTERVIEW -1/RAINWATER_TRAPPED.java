public class RAINWATER_TRAPPED {
        public int trap(final int[] A) {
            int n = A.length;
            int [] LM = new int[n+1];
            int [] RM = new int[n+1];
            for(int i = 0; i < n; i++){
                LM[i+1] = Math.max(LM[i], A[i]);
            }
            for(int i = n-1; i>=0; i--){
                RM[i] = Math.max(RM[i+1], A[i]);
            }
            int totalWater = 0;
            for(int i = 0; i < n; i++){
                int waterLevel = Math.min(LM[i], RM[i]);
                int trapped = waterLevel - A[i];
                if(trapped > 0){
                    totalWater += trapped;
                }
            }
            return totalWater;
    }
}
