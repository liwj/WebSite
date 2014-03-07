package com.cst.demo.po;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


/**
 * @author Administrator
 * 
 * */
public class Menu implements Serializable {
	private static final long serialVersionUID = 1L;
	private String menu_id;
	private String menu_super_id;
	private String menu_name;
	private String menu_url;
	private String menu_img;
	private Integer menu_index;
	private Integer menu_report;
	private Integer menu_disable;
	
	/**
	 * 菜单集合 
	 */
	private List<Menu> menus = new ArrayList<Menu>(0);
	
	
	public String getMenu_id() {
		return menu_id;
	}
	public void setMenu_id(String menu_id) {
		this.menu_id = menu_id;
	}
	public String getMenu_super_id() {
		return menu_super_id;
	}
	public void setMenu_super_id(String menu_super_id) {
		this.menu_super_id = menu_super_id;
	}
	public String getMenu_name() {
		return menu_name;
	}
	public void setMenu_name(String menu_name) {
		this.menu_name = menu_name;
	}
	public String getMenu_url() {
		return menu_url;
	}
	public void setMenu_url(String menu_url) {
		this.menu_url = menu_url;
	}
	public String getMenu_img() {
		return menu_img;
	}
	public void setMenu_img(String menu_img) {
		this.menu_img = menu_img;
	}
	public Integer getMenu_index() {
		return menu_index;
	}
	public void setMenu_index(Integer menu_index) {
		this.menu_index = menu_index;
	}
	public Integer getMenu_report() {
		return menu_report;
	}
	public void setMenu_report(Integer menu_report) {
		this.menu_report = menu_report;
	}
	public Integer getMenu_disable() {
		return menu_disable;
	}
	public void setMenu_disable(Integer menu_disable) {
		this.menu_disable = menu_disable;
	}
	public Menu(String menu_id, String menu_super_id, String menu_name,
			String menu_url, String menu_img, Integer menu_index,
			Integer menu_report, Integer menu_disable) {
		super();
		this.menu_id = menu_id;
		this.menu_super_id = menu_super_id;
		this.menu_name = menu_name;
		this.menu_url = menu_url;
		this.menu_img = menu_img;
		this.menu_index = menu_index;
		this.menu_report = menu_report;
		this.menu_disable = menu_disable;
	}
	public Menu() {
		super();
	}
	public List<Menu> getMenus() {
		return menus;
	}
	public void setMenus(List<Menu> menus) {
		this.menus = menus;
	}
	
}
