public class Sum_of_all_submatrices_C{
    public long solve(int[][] A) {
        int N = A.length;
        long totalSum = 0;

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {

             
                long topLeftChoices = (long)(i + 1) * (j + 1);
                long bottomRightChoices = (long)(N - i) * (N - j);

                long totalSubmatrices = topLeftChoices * bottomRightChoices;

                totalSum += (long)A[i][j] * totalSubmatrices;
            }
        }

        return totalSum;
    }
}
