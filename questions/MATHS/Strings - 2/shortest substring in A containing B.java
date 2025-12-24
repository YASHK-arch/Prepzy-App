public class Solution {
    public String minWindow(String A, String B) {
        int[] need = new int[256];     //req.
        int[] have = new int[256];     

        for(char c: B.toCharArray()) need[c]++;    //fill req. freq from B
        int needed = B.length();                 //total characters to match from B
        int matched = 0;                         //matched values

        int left = 0;

        int bestLen = Integer.MAX_VALUE;        //lower answer length
        int bestStart = 0;                      //lowest starting indice of answer

        //first window
        for (int right = 0; right < A.length(); right++) {
            char rChar = A.charAt(right);
            have[rChar]++;          //intially 'have' array has 0 0 0 0, have[rChar] increase the freq. 
                                    //at the ASCII position by 1. 
            if (have[rChar] <= need[rChar]) {
                matched++;          //this character freq is either equal to or equal to the needed freq.
            }
        

        while (matched == needed) {
            int windowLen = right - left + 1;
            if (windowLen < bestLen) {
                bestLen = windowLen; //updated ans.
                bestStart = left;
            }

            //if all req. chars matched - tried shrinking from left
            char lChar = A.charAt(left);
            have[lChar]--;

            //if removing lChar breaks the match
            if (have[lChar] < need[lChar]) {
                matched--;
            }
            left ++;
        }
    }

     if (bestLen == Integer.MAX_VALUE) {
       return "";
      } 
     else {
       return A.substring(bestStart, bestStart + bestLen);
      }


    }
}