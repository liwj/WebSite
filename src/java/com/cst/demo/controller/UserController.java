package com.cst.demo.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cst.demo.po.Menu;
import com.cst.demo.po.User;
import com.cst.demo.po.UserInfo;
import com.cst.demo.po.UserToRole;
import com.cst.demo.services.IDeptService;
import com.cst.demo.services.IMenuService;
import com.cst.demo.services.IRoleService;
import com.cst.demo.services.IUserBeanService;
import com.cst.demo.services.IUserInfoService;
import com.cst.demo.services.IUserToRoleService;
import com.cst.demo.services.IUsersService;
import com.cst.demo.util.Encryption;
import com.cst.demo.util.InitUtil;
import com.cst.demo.util.PageBean;
import com.cst.demo.util.UserInfoBean;

/**
 * @author Administrator
 * 
 */

@Controller
public class UserController {

	@Autowired
	IMenuService menuService;
	@Autowired
	IUsersService usersService;
	@Autowired
	IUserToRoleService userToRoleService;
	@Autowired
	IUserInfoService userInfoService;
	@Autowired
	IUserBeanService userBeanService;
	@Autowired
	IRoleService roleService;
	@Autowired
	IDeptService deptService;
	// 加密类
	Encryption encryption = new Encryption();

	/**
	 * 用户登录
	 * 
	 * @param request
	 *            请求
	 * @param name
	 *            用户名
	 * @param password
	 *            密码
	 * @return 登录是否成功
	 */
	@RequestMapping(value = ("/login.cst"), method = RequestMethod.POST)
	public @ResponseBody
	String login(HttpServletRequest request, String name, String password) {
		User user = usersService.find(new User(name, encryption
				.encryptionByMD5(password)));
		HttpSession session = request.getSession(true);
		if (user != null) {
			// 判断用户是否禁用
			if (user.getUser_disabled()==1) {
				return "prohibit";
			} else {
				usersService.updateUserIsonline(new User(user.getUser_id(),0));// 更新用户的状态(是否在线)
				session.setAttribute("loginUser",userBeanService.findUserBean(user.getUser_id()));
				return "ok";
			}
		} else
			return "no";
	}

	/**
	 * 加载数据
	 * @param model
	 * @param request
	 * @return 视图
	 */
	@RequestMapping(value = ("/welcome.cst"), method = RequestMethod.GET)
	public String toIndex(Model model, HttpServletRequest request) {
		UserInfoBean user = (UserInfoBean) request.getSession().getAttribute("loginUser");
		if (user == null)
			return "login";
		// 查询用户角色
		String roleId = userToRoleService.findUserRole(user.getUser_id());
		List<Menu> menus = InitUtil.menuList.get(roleId);
		model.addAttribute("menus", menus);
		return "index";
	}

	/**
	 * 显示所有用户
	 * 
	 * @return
	 */
	@RequestMapping(value = ("/userManage.cst"), method = RequestMethod.GET)
	public String userManager(int pageIndex,Model model) {
		PageBean pageBean = new PageBean();
		pageBean.setPageIndex(pageIndex);
		int count = userBeanService.findUserCount();//数据总的条数
		int sum = count/PageBean.pageSize;
		int pageNum = sum%PageBean.pageSize == 0?sum:sum+1;
		model.addAttribute("pageNum", pageNum);
		model.addAttribute("page", pageBean);//分页实体bean
		model.addAttribute("userInfo", userBeanService.findAllUserBean(pageBean));// 所有用户信息
		return "/users/userManage";
	}

	/**
	 * 添加用户
	 * @param info
	 * @param user
	 * @return
	 */
	@RequestMapping(value = ("/saveUser.cst"), method = RequestMethod.POST)
	public @ResponseBody String saveUser(UserInfo info, User user,UserToRole role, Model model) {
		String pwd = user.getUser_password();
		// 对密码进行MD5加密操作
		user.setUser_password(encryption.encryptionByMD5(pwd));
		if (info != null && user != null&& role!=null) {
			if (usersService.saveUser(user)
					&& userInfoService.saveUserInfo(info)&&userToRoleService.saveRole(role)) {
				return "ok";
 			}
		} 
		return "error";
	}

	/**
	 * 删除用户
	 * 
	 * @param uid
	 *            用户ID
	 * @return
	 */
	@RequestMapping(value = ("/deleteUser.cst"), method = RequestMethod.POST)
	public String deleteUser(int pageIndex,String uid, Model model) {
		String [] id = uid.split(":"); 
			usersService.deleteUser(id);
			userInfoService.deleteUserInfo(id);
			userToRoleService.deleteUserRole(id);
		// 所有用户信息
		this.userManager(pageIndex, model);
		return "/users/userManage";
	}

	/**
	 * 根据用户id获取用户信息
	 * 
	 * @param uid
	 *            用户ID
	 * @return
	 */
	@RequestMapping(value = ("/showUser.cst"), method = RequestMethod.GET)
	public String showUser(String uid, Model model) {
		model.addAttribute("info", userBeanService.findUserBean(uid));
		model.addAttribute("roles", roleService.findAllRole());
		model.addAttribute("depts",deptService.findDeptBySuper(0));
		return "/users/editUser";

	}

	/**
	 * 修改密码
	 * 
	 * @param password
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = ("/updatePwd.cst"), method = RequestMethod.POST)
	public @ResponseBody String updataPwd(String password, HttpServletRequest request) {
		UserInfoBean user = (UserInfoBean) request.getSession().getAttribute("loginUser");
		String uid = user.getUser_id();
		User u = new User();
		u.setUser_id(uid);
		u.setUser_password(encryption.encryptionByMD5(password));
		if (usersService.updatePwd(u)) 
			return "ok";
		return "error";
	}

	/**
	 * 验证密码
	 * 
	 * @param password
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = ("/checkPwd.cst"), method = RequestMethod.POST)
	public @ResponseBody
	String checkPwd(String password, HttpServletRequest request) {
		//从sssion获取用户密码
		UserInfoBean user = (UserInfoBean) request.getSession().getAttribute("loginUser");
		String upwd = user.getUser_password();
		String pwd = encryption.encryptionByMD5(password.trim());
		if (pwd.equals(upwd))
			return "ok";
		else
			return "no";
	}

	/**
	 * 修改用户
	 * @param password
	 * @param request
	 * @return
	 */
	@RequestMapping(value = ("/editUser.cst"), method = RequestMethod.POST)
	public @ResponseBody String editUser(UserInfo info, User user, UserToRole role, Model model) {
		info.setUpdatetime(new Date());
		if (info != null && user != null && role!=null) {
			if (usersService.updateUser(user)&&userToRoleService.updateRole(role)&&userInfoService.updateUserInfo(info)) 
				return "ok";
		}
		return "error";
	}

	/**
	 * 查询当前登录用户信息
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = ("/showData.cst"), method = RequestMethod.GET)
	public String myData(Model model, HttpServletRequest request) {
		UserInfoBean userInfoBean = (UserInfoBean) request.getSession().getAttribute("loginUser");
		model.addAttribute("info", userBeanService.findUserBean(userInfoBean.getUser_id()));
		return "/users/showData";
	}

	/**
	 * 重置用户密码
	 * @param id 用户的id
	 * @return view
	 */
	@RequestMapping(value = ("/resetPwd.cst"), method = RequestMethod.POST)
	public @ResponseBody String resetPwd(String uid) {
		String[] ids = uid.split(":");
		if(usersService.resetPassword(ids))
			return "ok";
		else
			return "error";
	}
	/**
	 * 验证用户名
	 * @param loginName 需验证的用户名
	 */
	@RequestMapping(value=("/checkLoginName.cst"),method=RequestMethod.POST)
	public @ResponseBody String checkLoginName(String loginName){
		if(!usersService.checkLoginName(loginName))
			return "ok";
		return "error";
	}
	
}