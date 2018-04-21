package com.xalyticsdigital.gbmonitoring.services.ipfs;

import com.xalyticsdigital.gbmonitoring.models.UserHash;
import com.xalyticsdigital.gbmonitoring.models.dao.UserHashDAO;
import io.ipfs.api.IPFS;
import io.ipfs.api.MerkleNode;
import io.ipfs.api.NamedStreamable;
import io.ipfs.multiaddr.MultiAddress;
import io.ipfs.multihash.Multihash;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.Principal;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class IpfsService {

    @Autowired
    @Qualifier("userHashDAO")
    UserHashDAO userHashDAO;

    public String uploadFileToIpfs(byte[] fileInBytes, String originalFileName) throws IOException {
        UserHash userHash = new UserHash();
        IPFS ipfs = new IPFS(new MultiAddress("/ip4/127.0.0.1/tcp/5001"));
        NamedStreamable.ByteArrayWrapper file = new NamedStreamable.ByteArrayWrapper(originalFileName, fileInBytes);
        MerkleNode addResult = ipfs.add(file).get(0);
        String hash = addResult.hash.toBase58();

        userHash.setEmail("jonathan@gmail.com");
        //userHash.setFechaDeIngreso(LocalDateTime.now());
        userHash.setNombreArchivo(originalFileName);
        userHash.setPassword("asdas##$$$sds!323asdasdjHGJYRFfik$$$");
        userHash.setHash(hash);

        userHashDAO.insert(userHash);

        System.out.println("hash: " + hash);
        return hash;
    }

    public String downloadFile(String hashFile) throws IOException {
        IPFS ipfs = new IPFS(new MultiAddress("/ip4/127.0.0.1/tcp/5001"));
        Multihash filePointer = Multihash.fromBase58(hashFile);
        byte[] fileContents = ipfs.cat(filePointer);

//        try (FileOutputStream fos = new FileOutputStream(new File("/home/jonathan/Desktop/genomas/" + hashFile))) {
//            fos.write(fileContents);
//        };
        String url = "https://gateway.ipfs.io/ipfs/" + hashFile;

        return url;
    }

    public String listLocalHostHashes() {
        return "";
    }

}
