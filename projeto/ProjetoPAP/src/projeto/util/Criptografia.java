package projeto.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Criptografia {
 
    private static MessageDigest md = null;
 
    // cria a instancia do padrão de criptografia
    static {
        try {
            md = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException ex) {
            ex.printStackTrace();
        }
    }
    
    // recebe a String e criptografa no padrão.
    private static char[] hexCodes(byte[] text) {
        char[] hexOutput = new char[text.length * 2];
        String hexString;
 
        for (int i = 0; i < text.length; i++) {
            hexString = "00" + Integer.toHexString(text[i]);
            hexString.toUpperCase().getChars(hexString.length() - 2,
                                	hexString.length(), hexOutput, i * 2);
        }
        return hexOutput;
    }
 
    // função para ser chamada para criptografar uma string no padrão MD5
   public static String criptografar(String string) {
        if (md != null) {
            return new String(hexCodes(md.digest(string.getBytes())));
        }
        return null;
    }
}