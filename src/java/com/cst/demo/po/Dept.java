package com.cst.demo.po;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * @author Administrator
 * 部门表
 */
public class Dept implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer dept_id;
	private String dept_name;
	private Integer super_dept;
	private String superName;//当前部门的父级名
	private String region;
	private String dept_appr;
	private String linkman;
	private String mobile;
	private String tel;
	private String email;
	private String updateuserid;
	private String updateName;//更新人
	private Date updatetime;
	private List<Dept> deptList;
	public Integer getDept_id() {
		return dept_id;
	}
	public void setDept_id(Integer dept_id) {
		this.dept_id = dept_id;
	}
	public String getDept_name() {
		return dept_name;
	}
	public void setDept_name(String dept_name) {
		this.dept_name = dept_name;
	}
	public Integer getSuper_dept() {
		return super_dept;
	}
	public void setSuper_dept(Integer super_dept) {
		this.super_dept = super_dept;
	}
	public String getRegion() {
		return region;
	}
	public void setRegion(String region) {
		this.region = region;
	}
	public String getDept_appr() {
		return dept_appr;
	}
	public void setDept_appr(String dept_appr) {
		this.dept_appr = dept_appr;
	}
	public String getLinkman() {
		return linkman;
	}
	public void setLinkman(String linkman) {
		this.linkman = linkman;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUpdateuserid() {
		return updateuserid;
	}
	public void setUpdateuserid(String updateuserid) {
		this.updateuserid = updateuserid;
	}
	public Date getUpdatetime() {
		return updatetime;
	}
	public void setUpdatetime(Date updatetime) {
		this.updatetime = updatetime;
	}
	public Dept(Integer dept_id, String dept_name, Integer super_dept,
			String region, String dept_appr, String linkman, String mobile,
			String tel, String email, String updateuserid, Date updatetime) {
		super();
		this.dept_id = dept_id;
		this.dept_name = dept_name;
		this.super_dept = super_dept;
		this.region = region;
		this.dept_appr = dept_appr;
		this.linkman = linkman;
		this.mobile = mobile;
		this.tel = tel;
		this.email = email;
		this.updateuserid = updateuserid;
		this.updatetime = updatetime;
	}
	public Dept(Integer dept_id) {
		this.dept_id = dept_id;
	}
	public Dept() {
	}
	public String getSuperName() {
		return superName;
	}
	public void setSuperName(String superName) {
		this.superName = superName;
	}
	public String getUpdateName() {
		return updateName;
	}
	public void setUpdateName(String updateName) {
		this.updateName = updateName;
	}
	public List<Dept> getDeptList() {
		return deptList;
	}
	public void setDeptList(List<Dept> deptList) {
		this.deptList = deptList;
	}
	
}
