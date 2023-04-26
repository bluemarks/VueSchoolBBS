<template>
	<div id="indexContent">
		<div class="content">
			<div class="list" v-for="(item, index) in listData" :key="index">
				<el-avatar
					:size="55"
					:src="item.avatar"
					style="
						display: inline-block;
						position: absolute;
						left: 0;
						top: 20px;
						cursor: pointer;
					"
				></el-avatar>
				<p class="tit" @click="goDetail(item)">{{ item.articleTitle }}</p>
				<p class="name" @click="goDetail(item)">{{ item.nickname }}</p>

				<p class="time">发布时间：{{ item.createdTime }}</p>
				<p class="huifu">回复 {{ item.articleCommentCount }}</p>
				<p style="position: absolute; right: 90px; top: 60px">|</p>
				<p style="position: absolute; right: 160px; top: 60px">|</p>
				<p class="zan">赞 {{ item.articleLikeCount }}</p>
				<p class="liulan">浏览量 {{ item.articleViewCount }}</p>
				<el-button
					style="
						position: absolute;
						left: 160px;
						top: 60px;
						border: 1px solid #87baf1;
					"
					type="primary"
					@click="noguanzhu(item.articleUserId)"
					v-if="followList.indexOf(String(item.articleUserId)) > -1"
					>已关注
				</el-button>
				<el-button
					style="position: absolute; left: 160px; top: 60px"
					type="primary"
					@click="guanzhu(item.articleUserId)"
					v-else
					>关注 <i class="el-icon-plus"></i>
				</el-button>
			</div>
			<!-- <div class="list"></div>
      <div class="list"></div> -->
		</div>
	</div>
</template>
<script>
import { reactive, toRefs, onMounted } from "vue";
import { useRouter} from "vue-router";
import { apigetJobData } from "@/request/content";
import { apiGuanzhuList, apiGuanzhu, apiNoGuanzhu } from "@/request/guanzhu";
export default {
	name: "indexContent",
	setup() {
		const router = useRouter();
		const data = reactive({
			circleUrl: require("@/assets/img1.webp"),
			id: "2",
			display: true,
			listData: [
				// {
				//   liIndex: "",
				//   imgSrc: "",
				//   tit: "",
				//   name: "",
				//   time: "",
				//   huifu: "",
				//   zan: "",
				//   liulan: "",
				// },
			],
			followList: [],
		});

		const methods = {
			guanzhuList() {
				apiGuanzhuList()
					.then((res) => {
						if (res.status == 200) {
							console.log("关注列表", res.data);
							let args = res.data.data;
							let list = [];
							args.forEach((item) => {
								list.push(item.userId);
							});
							data.followList = list;
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			guanzhu(userId) {
				//var categoryId = this.id;

				apiGuanzhu(userId)
					.then((res) => {
						console.log(res.data);
						if (res.status == 200) {
							if (res.data.code == 0) {
								//console.log(res.data.data.articleTitle);
								methods.guanzhuList();
								// let da = res.data.data;
								// _self.listData = da;
							}
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			noguanzhu(userId) {
				//var categoryId = this.id;
				apiNoGuanzhu(userId)
					.then((res) => {
						console.log(res.data);
						if (res.status == 200) {
							if (res.data.code == 0) {
								methods.guanzhuList();
								//console.log(res.data.data.articleTitle);
								// let da = res.data.data;
								// _self.listData = da;
							}
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			getData() {
				var categoryId = data.id;
				apigetJobData(categoryId)
					.then((res) => {
						// console.log(res.data);
						if (res.status == 200) {
							if (res.data.code == 0) {
								console.log(res.data.data.articleTitle);
								let da = res.data.data;
								data.listData = da;
							}
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			goDetail(num) {
				// localStorage.setItem("articleId", num.articleId);
				router.push({ name: "Detail", query: { url: num.articleId } });
			},
		};
		onMounted(() => {
			methods.getData();
			methods.guanzhuList();
		});

		return {
			...toRefs(data),
			...methods,
		};
	},
};
</script>
<style scoped lang="scss">
#indexContent {
	width: 100%;
	.content {
		width: 96%;
		height: 480px;
		margin: 20px auto 0;
		.list {
			width: 100%;
			height: 90px;
			margin-bottom: 5px;
			border-bottom: 2px solid #eee;

			position: relative;
			.tit {
				position: absolute;
				left: 65px;
				top: 25px;
				font-size: 15px;
				font-weight: 500;
				color: rgb(83, 82, 82);
				cursor: pointer;
			}
			.name {
				position: absolute;
				left: 65px;
				top: 60px;
				font-size: 14px;
				color: rgb(241, 45, 45);
				cursor: pointer;
			}
			.time {
				position: absolute;
				left: 250px;
				top: 60px;
				font-size: 14px;
				color: rgb(82, 80, 80);
			}
			.huifu {
				width: 80px;
				position: absolute;
				right: 170px;
				top: 60px;
				font-size: 14px;
				// border-right: 2px solid rgb(126, 125, 125);
				color: rgb(82, 80, 80);
			}
			.zan {
				width: 80px;
				// border-right: 2px solid rgb(126, 125, 125);
				position: absolute;
				right: 90px;
				top: 60px;
				font-size: 14px;
				color: rgb(82, 80, 80);
			}
			.liulan {
				position: absolute;
				right: 25px;
				top: 60px;
				font-size: 14px;
				color: rgb(82, 80, 80);
			}
		}
	}
}
:deep.el-button {
	display: inline-block;
	line-height: 1;
	white-space: nowrap;
	cursor: pointer;
	background: #fff;
	border: 1px solid #dcdfe6;
	color: #606266;
	text-align: center;
	box-sizing: border-box;
	outline: 0;
	margin: 0;
	transition: 0.1s;
	font-weight: 500;
	padding: 5px 8px;
	font-size: 14px;
	border-radius: 4px;
	color: #87baf1;
}
</style>