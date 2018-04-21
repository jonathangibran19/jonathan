package gbconnected.test;

import com.xalyticsdigital.gbmonitoring.config.MvcAppConfiguration;
import io.ipfs.api.IPFS;
import io.ipfs.multiaddr.MultiAddress;
import java.io.IOException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {MvcAppConfiguration.class})
@WebAppConfiguration
public class Test {

    @Autowired
    HibernateTemplate hit;

    @org.junit.Test
    public void prueba() throws IOException {
        System.out.println("############################ TEST ##############################");
//        IPFS ipfs = new IPFS(new MultiAddress("/ip4/127.0.0.1/tcp/5001"));
//        ipfs.refs.local().forEach(System.out::println);
    }

}
