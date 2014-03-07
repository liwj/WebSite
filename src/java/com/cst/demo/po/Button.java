package com.cst.demo.po;

import java.io.Serializable;

/**
 * @author Administrator
 * 按钮表
 */
public class Button implements Serializable{
	private static final long serialVersionUID = 1L;
	private String button_id;
	private Integer menu_id;
	private String button_name;
	private Integer button_num;
	
	public Button() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Button(String button_id, Integer menu_id, String button_name,
			Integer button_num) {
		super();
		this.button_id = button_id;
		this.menu_id = menu_id;
		this.button_name = button_name;
		this.button_num = button_num;
	}
	public String getButton_id() {
		return button_id;
	}
	public void setButton_id(String button_id) {
		this.button_id = button_id;
	}
	public Integer getMenu_id() {
		return menu_id;
	}
	public void setMenu_id(Integer menu_id) {
		this.menu_id = menu_id;
	}
	public String getButton_name() {
		return button_name;
	}
	public void setButton_name(String button_name) {
		this.button_name = button_name;
	}
	public Integer getButton_num() {
		return button_num;
	}
	public void setButton_num(Integer button_num) {
		this.button_num = button_num;
	}
}
