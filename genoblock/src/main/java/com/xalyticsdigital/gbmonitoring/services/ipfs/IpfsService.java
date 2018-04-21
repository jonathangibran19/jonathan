package com.xalyticsdigital.gbmonitoring.services.ipfs;

import io.ipfs.api.IPFS;
import io.ipfs.api.MerkleNode;
import io.ipfs.api.NamedStreamable;
import io.ipfs.multiaddr.MultiAddress;
import io.ipfs.multihash.Multihash;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import org.springframework.stereotype.Service;

@Service
public class IpfsService {

    

    public String uploadFileToIpfs(byte[] fileInBytes, String originalFileName) throws IOException {
        IPFS ipfs = new IPFS(new MultiAddress("/ip4/127.0.0.1/tcp/5001"));
        NamedStreamable.ByteArrayWrapper file = new NamedStreamable.ByteArrayWrapper(originalFileName, fileInBytes);
        MerkleNode addResult = ipfs.add(file).get(0);
        String hash = addResult.hash.toBase58();
        System.out.println("hash: " + hash);
        return hash;
    }

    public String downloadFile(String hashFile) throws IOException {

        Multihash filePointer = Multihash.fromBase58(hashFile);
        byte[] fileContents = ipfs.cat(filePointer);

        try (FileOutputStream fos = new FileOutputStream(new File("/home/jonathan/Desktop/genomas/" + hashFile))) {
            fos.write(fileContents);
        };

        String url = "https://gateway.ipfs.io/ipfs/" + hashFile;

        return url;
    }

    public String listLocalHostHashes() {
        return "";
    }

}
