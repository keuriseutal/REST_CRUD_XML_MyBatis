/**
* Date Created: Mar 5, 2019 10:37:56 AM
* Created by: Crystal Joy Tolentino
*/
package school;

import org.junit.Test;
import static org.junit.Assert.assertEquals;

public class TestJunit {
   @Test
	
   public void testAdd() {
      String str = "Junit is working fine";
      assertEquals("Junit is working fine",str);
   }
}
