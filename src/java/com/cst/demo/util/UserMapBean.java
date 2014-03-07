package com.cst.demo.util;

import java.util.HashMap;
import java.util.Map;

import com.cst.demo.po.User;

/**
 * @author Administrator
 * 用于存储已登录的用户
 */
public class UserMapBean {
	
	/**
	 * key:sessionID
	 * value:userID
	 */
	private static final Map<String,String> SESSIONMAP = new HashMap<String, String>(0);
	
	/**
	 * key:userID
	 * value:sessionID 
	 */
	private static final Map<String,String> USERMAP = new HashMap<String, String>(0);
	
	/**
	 * 通过key获取值
	 * @param key 
	 * @param type 获取类型（通过sessionID还是userID），
	 * @return  值
	 */
	public static String selectUser(String key,Boolean type){
		String str = "";
		if (type) {
			//根据sessionID获取userID
			if ((str = SESSIONMAP.get(key)) != null)
				return str;
			return null;
		} else {
			if ((str = USERMAP.get(key)) != null)
				return str;
			return null;
		}
	}
}
