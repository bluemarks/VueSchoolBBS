<template>
	<div class="chat-box">
		<header>与{{ userId }}聊天</header>
		<div class="msg-box" ref="msg_box">
			<div v-for="(i, index) in list" :key="index" class="msg">
				<!-- <div class="user-head">
          <img :src="i.avatar" height="30" width="30" :title="i.username">
        </div> -->
				<div class="user-msg">
					<span
						:style="i.toId == userId ? ' float: right;' : ''"
						:class="i.toId == userId ? 'right' : 'left'"
						>{{ i.messageContent }}</span
					>
				</div>
			</div>
		</div>
		<div class="input-box">
			<input
				type="text"
				ref="sendMsg"
				v-model="contentText"
				@keyup.enter="sendText()"
			/>
			<div
				class="btn"
				:class="{ ['btn-active']: contentText }"
				@click="sendText()"
			>
				发送
			</div>
		</div>
	</div>
</template>

<script>
import { reactive, toRefs, ref, onMounted ,onUnmounted} from "vue";
//引入路由
import { useRoute } from "vue-router";
//websock有问题  ws.XXX()方法识别不了
export default {
	name: "chatView",
	setup() {
		const route = useRoute();
		const msg_box = ref();
		const sendMsg = ref();
		const data = reactive({
			ws: null,
			count: 0,
			// userId: this.$store.getters.id, // 当前用户ID
			// username: this.$store.getters.name, // 当前用户昵称
			// avatar: this.$store.getters.avatar, // 当前用户头像
			list: [], // 聊天记录的数组
			contentText: "", // input输入的值
			userId: 0,
			myUserId: 0,
		});
		const initWebSocket =(() => {
			// 判断页面有没有存在websocket连接
			if (window.WebSocket) {
				//var serverHot =  window.location.hostname;
				//let sip = '房间号'
				// 填写本地IP地址 此处的 :9101端口号 要与后端配置的一致！
				//var url = 'ws://' + serverHot + ':9101' + '/groupChat/' + sip + '/' + this.userId; // `ws://127.0.0.1/9101/groupChat/10086/聊天室`
				//this.websocket = new WebSocket(`ws://localhost:8081/${id}`);
				let url = `ws://localhost:8081/chat/` + data.userId;
				var ws = new WebSocket(url);
				data.ws = ws;
				ws.onopen = function (e) {
					console.log("服务器连接成功: " + url, e);
					//ws.send(_this.userId)
				};
				ws.onclose = function (e) {
					console.log("服务器连接关闭: " + url, e);
				};
				ws.onerror = function () {
					console.log("服务器连接出错: " + url);
				};
				ws.onmessage = function (e) {
					//接收服务器返回的数据
					let resData = JSON.parse(e.data);
					console.log("接收数据", resData);
					// _this.list = [
					//   ..._this.list,
					//   { userId: resData.userId, username: resData.username, avatar: resData.avatar, content: resData.msg }
					// ];
					data.list.push(resData);
					console.log("消息列表", data.list);
				};
			}
		});

		const methods = {
			// 发送聊天信息
			sendText() {
				sendMsg.value.focus();
				if (data.contentText) {
					return;
				}
				let params = {
					toId: data.userId,
					messageContent: data.contentText,
					fromId: data.myUserId,
				};
				data.ws.send(JSON.stringify(params)); //调用WebSocket send()发送信息的方法
				data.list.push(params);
				data.contentText = "";
				setTimeout(() => {
					methods.scrollBottm();
				}, 500);
			},
			// 进入页面创建websocket连接

			// 滚动条到底部
			scrollBottm() {
				let el = msg_box.value;
				el.scrollTop = el.scrollHeight;
			},
		};
    onMounted(() => {
			console.log("#route.params" + route.params.userId);
			(data.userId = route.params.userId), initWebSocket();
			data.myUserId = localStorage.getItem("user");
			console.log("@@data.myUserId" + data.myUserId);
      // console.log("@initWebSocket.ws.onclose:"+data.ws.onclose)
			
		});
    onUnmounted (()=> {
      // 离开页面时关闭websocket连接
      data.ws.onclose(undefined);
    });
		return {
			...toRefs(data),
      msg_box,
      sendMsg,
      initWebSocket,
			...methods,
			
		};

	},
};
</script>

<style lang="scss" scoped>
.chat-box {
	margin: 0 auto;
	background: #fafafa;
	position: absolute;
	height: 100%;
	width: 100%;
	max-width: 700px;
	header {
		position: fixed;
		width: 100%;
		height: 3rem;
		background: #409eff;
		max-width: 700px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: bold;
		color: white;
		font-size: 1rem;
	}
	.msg-box {
		position: absolute;
		height: calc(100% - 6.5rem);
		width: 100%;
		margin-top: 3rem;
		overflow-y: scroll;
		.msg {
			width: 95%;
			min-height: 2.5rem;
			margin: 1rem 0.5rem;
			position: relative;
			display: flex;
			justify-content: flex-start !important;
			.user-head {
				min-width: 2.5rem;
				width: 20%;
				width: 2.5rem;
				height: 2.5rem;
				border-radius: 50%;
				background: #f1f1f1;
				display: flex;
				justify-content: center;
				align-items: center;
				.head {
					width: 1.2rem;
					height: 1.2rem;
				}
				// position: absolute;
			}
			.user-msg {
				width: 80%;
				// position: absolute;
				word-break: break-all;
				position: relative;
				z-index: 5;
				span {
					display: inline-block;
					padding: 0.5rem 0.7rem;
					border-radius: 0.5rem;
					margin-top: 0.2rem;
					font-size: 0.88rem;
				}
				.left {
					background: white;
					animation: toLeft 0.5s ease both 1;
				}
				.right {
					background: #53a8ff;
					color: white;
					animation: toright 0.5s ease both 1;
				}
				@keyframes toLeft {
					0% {
						opacity: 0;
						transform: translateX(-10px);
					}
					100% {
						opacity: 1;
						transform: translateX(0px);
					}
				}
				@keyframes toright {
					0% {
						opacity: 0;
						transform: translateX(10px);
					}
					100% {
						opacity: 1;
						transform: translateX(0px);
					}
				}
			}
		}
	}
	.input-box {
		padding: 0 0.5rem;
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 3.5rem;
		background: #fafafa;
		box-shadow: 0 0 5px #ccc;
		display: flex;
		justify-content: space-between;
		align-items: center;
		input {
			height: 2.3rem;
			display: inline-block;
			width: 100%;
			padding: 0.5rem;
			border: none;
			border-radius: 0.2rem;
			font-size: 0.88rem;
		}
		.btn {
			height: 2.3rem;
			min-width: 4rem;
			background: #e0e0e0;
			padding: 0.5rem;
			font-size: 0.88rem;
			color: white;
			text-align: center;
			border-radius: 0.2rem;
			margin-left: 0.5rem;
			transition: 0.5s;
		}
		.btn-active {
			background: #409eff;
		}
	}
}
</style>
