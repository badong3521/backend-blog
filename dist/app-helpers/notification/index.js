"use strict";
// import { Types } from "mongoose";
// import userModel from "@app-repositories/models/user";
// import {
//   NotificationNavigate,
//   NOTIFICATION_SCREEN,
// } from "@app-repositories/models/notification";
// class NotificationBuilder {
//   title = "";
//   body = "";
//   link = "";
//   userId: Types.ObjectId = undefined;
//   firebaseToken = [];
//   data = {};
//   navigate?: NotificationNavigate;
//   iconLink = "https://www.w3schools.com/howto/img_avatar.png";
//   static async getTokenAsync(userId: string) {
//     const user = await userModel.findById(Types.ObjectId(userId));
//     if (!user) {
//       return [];
//     }
//     return user.deviceIdentifier.map((item) => item.firebaseToken);
//   }
//   setNavigation(data: NotificationNavigate) {
//     if (!data) {
//       return this;
//     }
//     this.navigate = data;
//     return this;
//   }
//   setIconLink(url?: string) {
//     if (!url) {
//       return this;
//     }
//     this.iconLink = url;
//     return this;
//   }
//   setNavigationToOrderDetail(
//     orderId: Types.ObjectId,
//     screen: NOTIFICATION_SCREEN = NOTIFICATION_SCREEN.MyOrderDetail
//   ) {
//     this.navigate = {
//       screen,
//       params: {
//         orderId,
//       },
//     };
//     return this;
//   }
//   setContent(title: string, body: string, userId: Types.ObjectId) {
//     this.title = title;
//     this.body = body;
//     this.userId = userId;
//     return this;
//   }
//   getMessage() {
//     return {
//       title: this.title,
//       body: this.body,
//       link: this.link,
//       userId: this.userId,
//       firebaseToken: this.firebaseToken,
//       data: this.data,
//       navigate: this.navigate,
//       iconLink: this.iconLink,
//     };
//   }
//   setLink(link: string) {
//     this.link = link;
//     return this;
//   }
//   setData(data: any) {
//     if (data?.screen && data?.params) {
//       this.data = {
//         screen: data.screen,
//         params: JSON.stringify(data?.params),
//       };
//       return this;
//     }
//     this.data = data;
//     return this;
//   }
//   setFirebaseToken(tokens: string[]) {
//     this.firebaseToken = tokens;
//     return this;
//   }
//   static build() {
//     return new NotificationBuilder();
//   }
// }
// export default NotificationBuilder;
