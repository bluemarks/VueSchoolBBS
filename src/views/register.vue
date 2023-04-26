<template>
	<div id="register">
		<div class="container">
			<div class="banner">注册账号</div>
			<div class="main">
				<div class="phone">
					<div class="sjh">
						<el-form
							:model="registerInfo"
							status-icon
							:rules="rules"
							ref="ruleForm"
							label-width="70px"
							class="demo-ruleForm"
						>
							<el-form-item label="手机号" prop="phoneNumber">
								<el-input
									v-model="registerInfo.phoneNumber"
									autocomplete="off"
									placeholder="请输入手机号"
								></el-input>
							</el-form-item>
							<el-form-item label="验证码" prop="checkPass">
								<el-input
									v-model="registerInfo.checkPass"
									autocomplete="off"
									placeholder="请输入验证码"
								></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="passWord" label-width="50px">
								<el-input
									type="password"
									v-model="registerInfo.passWord"
									autocomplete="off"
									placeholder="8位密码，字母、数字加英文符号（不包含空格）"
								></el-input>
							</el-form-item>
							<el-form-item>
								<el-button
									type="primary"
									@click="submitForm('ruleForm')"
									class="reg"
									>注册</el-button
								>
							</el-form-item>
							<el-button type="primary" class="btn" @click="getCheckPass()"
								>获取验证码</el-button
							>
						</el-form>
					</div>
					<!-- <p class="txt">首次登录将自动注册为平台用户</p> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { reactive, toRefs, ref } from "vue";
import {
	apiRegisteSubmitForm,
	apiRegisteGetCheckPass,
} from "@/request/userAccount";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
export default {
	name: "registerAccount",
	components: {},
	setup() {
		const ruleForm = ref();
		const router = useRouter();
		const data = reactive({
			registerInfo: {
				phoneNumber: "",
				passWord: "",
				checkPass: "",
			},
			rules: {
				phoneNumber: [
					{ required: true, message: "请输入手机号", trigger: "blur" },
					{
						validator: function (rule, value, callback) {
							var MobileRegex = /^1[3|4|5|7|8][0-9]{9}$/;
							if (!MobileRegex.test(value)) {
								callback(new Error("请输入正确的手机号码！"));
							} else {
								callback();
							}
						},
						trigger: "blur",
					},
				],
				checkPass: [
					{ required: true, message: "请输入验证码", trigger: "blur" },
					{
						validator: function (rule, value, callback) {
							if (!/^[0-9]{6}$/.test(value)) {
								callback(new Error("验证码必须是六位数字"));
							} else {
								callback();
							}
						},
						trigger: "blur",
					},
				],
				Password: [
					{ required: true, message: "请输入密码", trigger: "blur" },
					{
						validator: function (rule, value, callback) {
							var res = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
							if (!res.test(value)) {
								callback(new Error("请输入正确的密码格式~"));
							} else {
								callback();
							}
						},
						trigger: "blur",
					},
				],
			},
		});

		const methods = {
			getCheckPass() {
				var userId = data.registerInfo.phoneNumber;
				if(userId !==null){
					
				
				apiRegisteSubmitForm(userId)
					.then((response) => {
						if (response.status == 200) {
							if (response.data.code == 0) {
								ElMessage({
									message: "验证码已发送到您的手机，请您注意查收~",
									type: "success",
								});
							}
						}
					})
					.catch((err) => {
						console.log(err);
					});
				}
				else{
					ElMessage({
						message: "请输入手机号",
						type: "error",
					});
					return false;
				}

			},
			submitForm() {
				const userId = data.registerInfo.phoneNumber;
				const password = data.registerInfo.passWord;
				const code = data.registerInfo.checkPass;
				ruleForm.value.validate((valid) => {
					if (valid) {
						console.log(userId, password, code);
						apiRegisteGetCheckPass(userId, password, code).then((res) => {
							console.log(res);
							if (res.status == 200) {
								if (res.data.code == 0) {
									ElMessage({
										message: "注册成功！",
										type: "success",
									});
									setTimeout(() => {
										router.push({ name: "login" });
									}, 500);
								} else if (res.data.code == 100000) {
									ElMessage({
										message: res.data.msg,
										type: "error",
									});
								} else if (res.data.code == 100001) {
									ElMessage({
										message: res.data.msg,
										type: "success",
									});
								}
							}
						});
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},
			resetForm(formName) {
				formName.value.resetFields();
				// this.$refs[formName].resetFields();
			},
		};
		return {
			...toRefs(data),
			ruleForm,
			...methods,
		};
	},
};
</script>

<style lang="scss" scoped>
#register {
	padding: 0;
	margin: 0;
	width: 100vw;
	height: 100vh;
	box-sizing: border-box;
	.container {
		width: 1000px;
		height: 700px;
		background: #fff;
		margin: 0 auto;
		box-shadow: 0 15px 20px rgba(0, 0, 0, 0.11);
		.banner {
			width: 1000px;
			height: 100px;
			background: #409eff;
			line-height: 100px;
			font-size: 20px;
			color: #fff;
		}
		.main {
			width: 1000px;
			height: 600px;
			.phone {
				width: 50%;
				height: 250px;
				// border: 1px #eee solid;
				margin: 150px auto;
				position: relative;
				.txt {
					font-size: 12px;
					color: rgb(148, 144, 144);
				}
			}
		}
	}
}
.btn {
	position: absolute;
	right: 0;
	top: 90px;
}
.reg {
	width: 100%;
}
.el-form-item {
	margin-bottom: 32px;
}
</style>>

