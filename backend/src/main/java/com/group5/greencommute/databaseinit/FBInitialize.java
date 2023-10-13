package com.group5.greencommute.databaseinit;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.*;
import java.nio.charset.Charset;

@Service
public class FBInitialize {

    @PostConstruct
    public void initialize() {
        System.out.println(System.getProperty("user.dir"));
        try {
//         The code under is for gcp deployment
//         Also you should add "stream" to the GoogleCredentials.fromStream()
//            String string = "{\n" +
//                    "  \"type\": \"service_account\",\n" +
//                    "  \"project_id\": \"dbforgreen\",\n" +
//                    "  \"private_key_id\": \"688c50e2639e0037dfc4cb6143978f6dfee0b91d\",\n" +
//                    "  \"private_key\": \"-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDb9YXoqF8hNX4L\\nyZHH3NvOWbxr3T/TeDw8kipEeUy3g4qj2JliyKuR7yhAG3/wDehhB/w6AMIM2d8n\\nLAGxHlUhxE09nMNib1G0bcGx9+7cEpevhD6R4a5Uox3Gd8uL+iRxqjEdInEdLPhB\\nT7nKPLDxS/Jbr0D4cYYCeulJPu/J5CdFkfNCsedW7NiNIApobiiTie5fArQgiaoG\\nXKDaoOObf3cLbgFJJaYTFuNNR6jlcmFEOC3r0S6aA/A1mPdXNyR0C0WPJ0EQ9kQY\\n3HqQQ6bYqwX9PPJ8VoGs5Crt8kfZVvE1WlHbFVVfEaBZiOhGEl2CLGgqBSQy33pU\\nK8+DfirHAgMBAAECggEAGZFmqW648CFJr5EUswjHPCtOLbOgMbKuPdQ3uZHoCwTt\\nXrJU0hjFaMdGBH2t13emZXEKLqvb4qaIvALvh2khODWbTOgmBhEujCyd8VQCne5D\\nV5GlvEthelEjquhN7s164wOHhf107JFHoj/kNs/rOYE8gM/UW4zGqQ8kgvEf6nW1\\nkD81ySd6wS/zMe9o+9CEengZfQ+gGuUjg+0AC7vIaKqWtcWSDPkjme/34lM5vmVL\\n/zmA1kSxkQ0O3epNGJWNW4KnjTtCcB4V72uili+LzJv+yZ14uHRDFKDLH4Bsp7Ui\\nGBWnMwTepAXWOue2cqPMynk4AS7MwWGcFd4XvqrKUQKBgQD/zfBtWjJvXVrJJP4j\\nc6ZTFrCFAzu1Ww7rczbGk0jm647IDSUObEwqnkS6dF7WyrQaXoiTnbgH+tnwnwGk\\nu2wgkYNl0QAz2Jm7AZuEXoY9BGRXRx86wM2tipYHUxxBtfL05ACFrjBq/0hgLRsK\\nFnZJhNLtU5ZvZS03FkbuLUGxpQKBgQDcIJGpHRSKtC/aySmIfGz1Cvo2CfI9H8RT\\nI375GmLv+DlKXnOzIUu3+cZ4nWRZV5mRR8LSkR8jVknKhwbJ8ULrHb3f4Ytn+TwB\\nJKSQyBUfOMLFX75WJbEreeITMiOlN9RMhlH1SOsLAgNgz/OAatAMygBYJOfi+Fyn\\n8FQf4hSm+wKBgQDs3rf5qoH1WY7Nn3GtRlQHsIT4Rkwt3QntwJxCOPRS0GFAodtk\\nhafp9vBRb5y6bK1llZAGkQ9uZD0XcUXGUr8HUXdI+sWjPLjtz8lAQ38uVTjNENC8\\nSPir8B6I3c7WkjNNzSsmnmu7SHSuilX1e2NBJLtkg/hTYm8CCaDYwBOK+QKBgAjD\\nXykdWEEBVVpfYcDmOywyKK3YDYWzawxoQFjIXSHyfs1gHzkFXU9QqT8J/QG1hA6N\\njcr2LggpGjzuzS1i5mgXwgRUpUkZWfMts0N0Q6r/hnl3C0vAqmHxszdSaqrcIx58\\nxmx+X6ULinjjLm1xUyD/Na5ModKeUon4/lBanrnbAoGAe3gq4n6EsHCdEoqEBgWK\\nFTr/CljXpwrAxej9/uwhTENMwhqXazicT4XzdGELlpyprNYfRNFc29w4QCYZjb1p\\nYIoOV3ahhPGDoHvSi2DSx76ao8BBVCohPUi9V2w11cFyT8ajn4A4ScJ9H7VFV2j2\\njyayzt4ZJIeSXWWkD9u48qI=\\n-----END PRIVATE KEY-----\\n\",\n" +
//                    "  \"client_email\": \"firebase-adminsdk-47x5b@dbforgreen.iam.gserviceaccount.com\",\n" +
//                    "  \"client_id\": \"110522930200032538238\",\n" +
//                    "  \"auth_uri\": \"https://accounts.google.com/o/oauth2/auth\",\n" +
//                    "  \"token_uri\": \"https://oauth2.googleapis.com/token\",\n" +
//                    "  \"auth_provider_x509_cert_url\": \"https://www.googleapis.com/oauth2/v1/certs\",\n" +
//                    "  \"client_x509_cert_url\": \"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-47x5b%40dbforgreen.iam.gserviceaccount.com\",\n" +
//                    "  \"universe_domain\": \"googleapis.com\"\n" +
//                    "}";
//            InputStream stream = new ByteArrayInputStream(string.getBytes
//                    (Charset.forName("UTF-8")));
            FileInputStream serviceAccount =
                    new FileInputStream("src/main/resources/dbforgreen-firebase-adminsdk-47x5b-688c50e263.json");

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl("https://dbforgreen-default-rtdb.firebaseio.com/")
                    .build();

            FirebaseApp.initializeApp(options);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}