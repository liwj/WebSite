package com.cst.demo.util;

import java.security.*;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

/**
 * @author Administrator 
 * 	对字符串进行加密处理
 */
public class Encryption {
	/**
	 * 使用MD5对字符串进行加密处理
	 * 
	 * @param str
	 *            需要加密的字符串
	 * @return 加密后的字符串
	 */
	public String encryptionByMD5(String str) {
		byte[] result = null;
		try {
			// 信息摘要是安全的单向哈希函数，它接收任意大小的数据，并输出固定长度的哈希值。
			MessageDigest messageDigest = MessageDigest.getInstance("MD5");// 获取信息摘要
			messageDigest.update(str.getBytes());// 添加要计算的摘要信息
			result = messageDigest.digest();// 得到摘要
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return byteToHex(result);
	}

	/**
	 * 使用SHA对字符串进行加密处理
	 * 
	 * @param str
	 *            需要加密的字符串
	 * @return 加密后的字符串
	 */
	public String encryptionBySHA(String str) {
		String result = null;
		try {
			// 信息摘要是安全的单向哈希函数，它接收任意大小的数据，并输出固定长度的哈希值。
			MessageDigest messageDigest = MessageDigest.getInstance("SHA");// 获取信息摘要
			messageDigest.update(str.getBytes());// 添加要计算的摘要信息
			result = messageDigest.digest().toString();// 得到摘要
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return hexToByte(result).toString();
	}

	/**
	 * 创建密钥
	 * 
	 * @param algorithm
	 *            加密的算法
	 * @return 密钥
	 */
	public SecretKey createSecretKey(String algorithm) {
		SecretKey key = null;
		try {
			// KeyGenerator类为密钥生成器
			KeyGenerator generator = KeyGenerator.getInstance(algorithm);// 初始化KeyGenerator对象
			key = generator.generateKey();//生成密钥
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return key;
	}

	/**
	 * 根据密钥进行DES加密
	 * 
	 * @param str
	 *            要加密的字符串
	 * @param key
	 *            密钥
	 * @return 加密后的字符
	 */
	public String encryptionByDES(String str, SecretKey key) {
		byte[] result = null;
		try {
			Cipher cipher = Cipher.getInstance("DES");// 获取一个加密器
			// 用指定的密钥和模式初始化Cipher对象
			// 模式:(ENCRYPT_MODE, DECRYPT_MODE, WRAP_MODE,UNWRAP_MODE)
			// ENCRYPT_MODE代表加密模式
			cipher.init(Cipher.ENCRYPT_MODE, key);
			// 对内容进行加密处理
			result = cipher.doFinal(str.getBytes());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result.toString();
	}

	/**
	 * 根据密钥进行DES解密
	 * 
	 * @param str
	 *            需解密的字符串
	 * @param key
	 *            密钥
	 * @return 解密后的字符串
	 */
	public String decryptionByDES(String str, SecretKey key) {
		byte[] result = null;
		try {
			Cipher cipher = Cipher.getInstance("DES");// 获取解密器
			cipher.init(Cipher.DECRYPT_MODE, key);
			result = cipher.doFinal();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result.toString();
	}

	/**
	 * 二进制转化为十六进制
	 * 
	 * @param bytes
	 *            字节数组
	 * @return 十六进制数
	 */
	private String byteToHex(byte[] bytes) {
		String hex = "";
		String temp = "";
		for (byte b : bytes) {
			temp = Integer.toHexString(b & 0XFF);// 按位与运算（有0为0，否则为1）
			if (temp.length() == 0)
				hex = hex + "0" + temp;
			else
				hex += temp;
		}
		return hex.toUpperCase();
	}

	/**
	 * 将十六进制转为二进制
	 * 
	 * @param hex
	 *            十六进制数
	 * @return 二进制数
	 */
	private byte[] hexToByte(String hex) {
		byte[] bs = new byte[8];// byte占一个字节（8位二进制数）
		byte[] temp = hex.getBytes();
		for (int i = 0; i < 8; i++) {
			bs[i] = toByte(temp[i * 2], temp[i * 2 + 1]);
		}
		return bs;
	}

	private byte toByte(byte byte1, byte byte2) {
		// 将 String 解码为 Byte,并返回次Byte的值,0x代表
		byte b1 = Byte.decode("0x" + new String(new byte[] { byte1 }))
				.byteValue();
		b1 = (byte) (b1 << 4);
		byte b2 = Byte.decode("0x" + new String(new byte[] { byte2 }))
				.byteValue();
		byte ret = (byte) (b1 ^ b2);
		return ret;
	}
	public static void main(String[] args) {
		System.out.println(new Encryption().encryptionByMD5("1"));
	}
}
