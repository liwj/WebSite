package com.cst.demo.po;

import java.io.Serializable;

/**
 * @author Administrator
 * 角色菜单关系
 */
public class RoMeBu implements Serializable {
	private static final long serialVersionUID = 1L;
	private String relation_id;
	private String role_id;
	private String menu_id;
	private String relation_button;
	public RoMeBu(String relation_id, String role_id, String menu_id,
			String relation_button) {
		super();
		this.relation_id = relation_id;
		this.role_id = role_id;
		this.menu_id = menu_id;
		this.relation_button = relation_button;
	}
	public RoMeBu() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getRelation_id() {
		return relation_id;
	}
	public void setRelation_id(String relation_id) {
		this.relation_id = relation_id;
	}
	public String getRole_id() {
		return role_id;
	}
	public void setRole_id(String role_id) {
		this.role_id = role_id;
	}
	public String getMenu_id() {
		return menu_id;
	}
	public void setMenu_id(String menu_id) {
		this.menu_id = menu_id;
	}
	public String getRelation_button() {
		return relation_button;
	}
	public void setRelation_button(String relation_button) {
		this.relation_button = relation_button;
	}
	
}
