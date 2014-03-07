package com.cst.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cst.demo.po.Role;
import com.cst.demo.services.impl.RoleService;
import com.cst.demo.util.PageBean;

/**
 * @author Administrator 角色控制器
 */
@Controller
public class RoleController {
	
	@Autowired
	RoleService roleService;
//	/**
//	 * 角色管理
//	 */
//	@RequestMapping(value="/roleManage.cst",method = RequestMethod.GET)
//	public String roleManage(Model model){
//		model.addAttribute("roles", roleService.findAllRole());
//		return "/users/roleManage";
//	}
	/**
	 * 添加角色
	 */
	@RequestMapping(value="/addRole.cst",method = RequestMethod.POST)
	public @ResponseBody String addRole(Role role){
		if(roleService.addRole(role)){
			return "ok";
		}
		return "error";
	}
	
	
	@RequestMapping(value="/roleManage.cst",method = RequestMethod.GET)
	public String userManage(int pageIndex,Model model){
		PageBean pageBean = new PageBean();
		pageBean.setPageIndex(pageIndex);
		int count = roleService.findRoleCount();//数据总的条数
		int sum = count/PageBean.pageSize;
		int pageNum = sum%PageBean.pageSize == 0?sum:sum+1;
		model.addAttribute("pageNum", pageNum);
		model.addAttribute("page", pageBean);//分页实体bean
		model.addAttribute("roles", roleService.findRole(pageBean));//角色集合
		
		return "/users/roleManage";
	}
}
